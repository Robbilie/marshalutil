const { PyObjectType, PyObject } = require("./");
const { ProtocolType, DbFieldType } = require("./../");
const Types = require("./");
const { Column, ZeroCompressOpcode, FieldTypeHelper } = require("../Database/");

class PyDbrow extends PyObject {

	constructor () {
		super(PyObjectType.Dbrow);
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Dbrow)
			this.ThrowParseException();

		context.NeedObjectEx = true;
		this.Header = context.ProcessSnip();
		context.NeedObjectEx = false;

		this.Raw = this.LoadZeroCompressed(context);

		console.log(this.Raw.toString("hex"))

		if (!this.ParseRowData(context))
			this.ThrowParseException("Could not fully unpack Dbrow, stream integrity is broken");
	}

	InternalToString (indentLevel = 0) {
		return `<Dbrow: ${this.Header.InternalToString(indentLevel)}[\n${this.Columns.reduce((str, obj) => str + this.Indent(indentLevel + 1) + obj.InternalToString(indentLevel + 1) + "\n", "")}${this.Indent(indentLevel)}]>`;
	}

	ParseRowData (context) {
		let objex = this.Header;
		if (!(objex instanceof Types.PyObjectEx))
			return false;

		let header = objex.Header;
		if (!(header instanceof Types.PyTuple) || header.Items.length < 2)
			return false;

		let columns = header.Items[1];
		if (!(columns instanceof Types.PyTuple))
			return false;

		columns = columns.Items[0];
		if (!(columns instanceof Types.PyTuple))
			return false;

		let newcolumns = [];

		for (let obj of columns.Items) {
			let fieldData = obj;
			if (!(fieldData instanceof Types.PyTuple) || fieldData.Items.length < 2)
				continue;

			let name = fieldData.Items[0];
			if (!(name instanceof Types.PyString))
				continue;

			newcolumns.push(new Column(name.Value, fieldData.Items[1].IntValue));
		}

		let groups = [];
		newcolumns.forEach(column => {
			let bits = FieldTypeHelper.GetTypeBits(column.Type);
			if (!groups[bits])
				groups[bits] = [];
			groups[bits].push(column);
		});

		let sizeList = [];
		groups.reverse().forEach(group => sizeList = sizeList.concat(group));

		let sizeSum = newcolumns.reduce((sum, obj) => sum + FieldTypeHelper.GetTypeBits(obj.Type), 0);

		this.Columns = sizeList;

		console.log(sizeList)

		sizeSum = (sizeSum + 7) >> 3;

		let rawStream = Buffer.alloc(this.Raw.length + (sizeSum - this.Raw.length), 0);
		this.Raw.copy(rawStream, 0);

		const reader = {
			index: 0,
			BaseStream: rawStream,
			ReadInt64 () {
				let val = this.BaseStream.readUIntLE(this.index, 8);
				this.index += 8;
				return val;
			},
			ReadInt32 () {
				let val = this.BaseStream.readUInt32LE(this.index);
				this.index += 4;
				return val;
			},
			ReadInt16 () {
				let val = this.BaseStream.readUInt32LE(this.index);
				this.index += 2;
				return val;
			},
			ReadByte () {
				let val = this.BaseStream[this.index];
				this.index += 1;
				return val;
			},
			ReadDouble () {
				let val = this.BaseStream.readDoubleLE(this.index);
				this.index += 8;
				return val;
			},
			ReadSingle () {
				let val = this.BaseStream.readInt32LE(this.index);
				this.index += 4;
				return val;
			},
		}

		let bitOffset = 0;
		for (let column of sizeList) {
			switch (column.Type) {
				case DbFieldType.I8:
				case DbFieldType.UI8:
				case DbFieldType.CY:
				case DbFieldType.FileTime:
					column.Value = new Types.PyLong(reader.ReadInt64());
					break;
				case DbFieldType.I4:
				case DbFieldType.UI4:
					column.Value = new Types.PyInt(reader.ReadInt32());
					break;
				case DbFieldType.I2:
				case DbFieldType.UI2:
					column.Value = new Types.PyInt(reader.ReadInt16());
					break;
				case DbFieldType.I1:
				case DbFieldType.UI1:
					column.Value = new Types.PyInt(reader.ReadByte());
					break;
				case DbFieldType.R8:
					column.Value = new Types.PyFloat(reader.ReadDouble());
					break;
				case DbFieldType.R4:
					column.Value = new Types.PyFloat(reader.ReadSingle());
					break;
				case DbFieldType.Bytes:
				case DbFieldType.Str:
				case DbFieldType.WStr:
					column.Value = context.ProcessSnip();
					break;
				case DbFieldType.Bool: {
					if (7 < bitOffset) {
						bitOffset = 0;
						reader.ReadByte();
					}

					let b = reader.ReadByte();
					reader.index--;//BaseStream.Seek(-1, SeekOrigin.Current);
					column.Value = new Types.PyInt((b >> bitOffset++) & 0x01);
					break;
				}
				default:
					throw new Error(`InvalidOperationException: Unable to parse ${column.Type}`);
			}

		}

		return true;
	}

	LoadZeroCompressed (context) {
		let ret = [];
		let packedLen = context.GetLength();

		let bytes = context.GetBytes(packedLen);

		let Position = 0;

		while (Position < packedLen) {
			let opcode = new ZeroCompressOpcode(bytes[Position]); Position++;

			if (opcode.FirstIsZero) {
				for (let n = 0; n < opcode.FirstLength + 1; n++)
					ret.push(0x00);
			} else {
				let btr = Math.min(8 - opcode.FirstLength, packedLen - Position);
				for (let n = 0; n < btr; n++) {
					ret.push(bytes[Position]); Position++;
				}
			}

			if (opcode.SecondIsZero) {
				for (let n = 0; n < opcode.SecondLength + 1; n++)
					ret.push(0x00);
			} else {
				let btr = Math.min(8 - opcode.SecondLength, packedLen - Position);
				for (let n = 0; n < btr; n++) {
					ret.push(bytes[Position]); Position++;
				}
			}
		}
		return Buffer.from(ret);
	}

}

module.exports = PyDbrow;