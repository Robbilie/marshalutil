require("./StringExtender");
const ProtocolConstants = require("./ProtocolConstants");
const ProtocolType = require("./ProtocolType");
const BitConverter = require("./BitConverter");
const Zlib = require("./Zlib");
const Types = require("./Types");

class MarshalStream {

	constructor (dat) {

		this.Index = 1;
		this.StorageMap = {};
		this.Storage = {};
		this._currentStorageIndex = 0;

		this._output = null;
		this._initialized = null;
		this._syncLock = null;

		if (dat === null || dat.length === 0)
			throw new Error("ArgumentNullException");
		if (dat[0] === ProtocolConstants.ZlibMarker)
			dat = Zlib.Decompress(dat);
		if (dat[0] !== ProtocolConstants.ProtocolId)
			throw new Error("ArgumentException: Invalid stream header");
		this.Raw = dat;
	}

	get Value () {
		if (this._initialized)
			return this._output;
		const sharedMapSize = this.GetInt(4);
		if (sharedMapSize > 0) {
			let sharedMapData = this.Raw.slice(this.Raw.length - sharedMapSize * 4);
			for (let i = 0; i < sharedMapSize; i++) {
				let copy = sharedMapData.slice(i * 4, i * 4 + 4);
				this.StorageMap[i] = BitConverter.ToInt32(copy.SwapEndianness(), 0);
			}
		}
		this._output = this.ProcessSnip();
		this._initialized = true;
		return this._output;
	}

	ProcessSnip () {
		let result = null;

		let type = this.GetInt(1);
		let shared = (type & ProtocolConstants.SharedFlag) === ProtocolConstants.SharedFlag;
		type &= ~ProtocolConstants.SharedFlag;

		switch (type) {
			case ProtocolType.None:
				result = this.CreateAndDecode(Types.PyNone, type);
				break;
			case ProtocolType.True:
			case ProtocolType.False:
				result = this.CreateAndDecode(Types.PyBool, type);
				break;
			case ProtocolType.FloatEmpty:
			case ProtocolType.Float:
				result = this.CreateAndDecode(Types.PyFloat, type);
				break;
			case ProtocolType.Zero:
			case ProtocolType.One:
			case ProtocolType.Minusone:
			case ProtocolType.Int8:
			case ProtocolType.Int16:
			case ProtocolType.Int32:
				result = this.CreateAndDecode(Types.PyInt, type);
				break;
			case ProtocolType.Int64:
			case ProtocolType.Long:
				result = this.CreateAndDecode(Types.PyLong, type);
				break;
			case ProtocolType.TupleEmpty:
			case ProtocolType.TupleOne:
			case ProtocolType.TupleTwo:
			case ProtocolType.Tuple:
				result = this.CreateAndDecode(Types.PyTuple, type);
				break;
			case ProtocolType.ListEmpty:
			case ProtocolType.ListOne:
			case ProtocolType.List:
				result = this.CreateAndDecode(Types.PyList, type);
				break;
			case ProtocolType.StringEmpty:
			case ProtocolType.UTF16Empty:
			case ProtocolType.StringOne:
			case ProtocolType.UTF16One:
			case ProtocolType.String:
			case ProtocolType.StringLong:
			case ProtocolType.Buffer:
			case ProtocolType.UTF16:
			case ProtocolType.Utf8:
				result = this.CreateAndDecode(Types.PyString, type);
				break;
			case ProtocolType.StringTable:
				result = this.CreateAndDecode(Types.PyString, type);
				break;
			case ProtocolType.Reduce:
				result = this.CreateAndDecode(Types.PyReduce, type);
				break;
			case ProtocolType.Newobj:
				result = this.CreateAndDecode(Types.PyNewObj, type);
				break;
			case ProtocolType.Mark:
				result = this.CreateAndDecode(Types.PyMark, type);
				break;
			case ProtocolType.Callback:
				result = this.CreateAndDecode(Types.PyCallback, type);
				break;
			case ProtocolType.Global:
				result = this.CreateAndDecode(Types.PyGlobal, type);
				break;
			case ProtocolType.Instance:
				result = this.CreateAndDecode(Types.PyInstance, type);
				break;
			case ProtocolType.Ref:
				result = this.Storage[this.StorageMap[this.GetByte() - 1] - 1];
				break;
			case ProtocolType.Dict:
				result = this.CreateAndDecode(Types.PyDict, type);
				break;
			case ProtocolType.Stream:
				result = this.CreateAndDecode(Types.PyStream, type);
				break;
			case ProtocolType.Checksum:
				result = this.CreateAndDecode(Types.PyChecksum, type);
				break;
			case ProtocolType.Dbrow:
				result = this.CreateAndDecode(Types.PyDbrow, type);
				break;
			// ReSharper disable RedundantCaseLabel
			case ProtocolType.Blue:
			case ProtocolType.Pickler:
			case ProtocolType.EOF:
			// ReSharper restore RedundantCaseLabel
			default:
				console.log("TYPE " + type + " OFF " + this.Index);
				break;
		}

		if (shared) {
			let sharedIndex = this.StorageMap[this._currentStorageIndex++];
			if (sharedIndex === 0)
				sharedIndex = 1;
			if (sharedIndex > 0)
				this.Storage[sharedIndex - 1] = result;
		}
		return result;
	}

	CreateAndDecode (T, type) {
		let obj = new T();
		obj.Decode(this, type);

		return obj;
	}

	GetBytes (bytesToRead) {
		if (this.Index >= this.Raw.length) {
			throw new Error("ArgumentOutOfRangeException: Index is higher than dat!");
		}

		let res = this.Raw.slice(this.Index, this.Index + bytesToRead);
		this.Index += bytesToRead;

		return res;
	}

	GetByte () {
		return this.GetBytes(1)[0];
	}

	GetLength () {
		let length = this.GetInt(1);
		if (length === 0xff)
			length = this.GetInt(4);

		return length;
	}

	GetInt (bytesToRead) {
		if (bytesToRead < 1 || bytesToRead > 4) {
			throw new Error("ArgumentOutOfRangeException: Argument must be between 1 and 4");
		}

		let bytes = Buffer.from([ 0, 0, 0, 0 ]);
		this.GetBytes(bytesToRead).SwapEndianness().copy(bytes, 4 - bytesToRead);

		return BitConverter.ToInt32(bytes.SwapEndianness(), 0);
	}

	GetInt64 () {
		return BitConverter.ToInt64(this.GetBytes(8).SwapEndianness(), 0);
	}

	GetLong () {
		let length = this.GetLength();
		let bytes = this.GetBytes(length);

		if (length > 8)
			throw new Error(`InvalidOperationException: Cannot parse long with length ${length}`);

		let copy = Buffer.alloc(8);
		bytes.copy(copy, 0);
		return BitConverter.ToInt64(copy, 0);
	}

	GetFloat () {
		return BitConverter.ToDouble(this.GetBytes(8), 0);
	}

}

module.exports = MarshalStream;