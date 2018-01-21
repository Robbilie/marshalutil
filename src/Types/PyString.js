const { PyObjectType, PyObject, PyStream } = require("./");
const { BitConverter, ProtocolType, ProtocolConstants } = require("./../");

class PyString extends PyObject {

	constructor (data, enc = null) {
		super(PyObjectType.String);
		this.Update(data, enc);
	}

	Update (val, enc) {
		if (val === undefined)
			return;

		if (enc === null)
			enc = "ascii";

		this.Raw = val instanceof Buffer ? val : Buffer.from(val, enc);
		this.Value = val instanceof Buffer ? val.toString(enc) : val;


		if (!this.Value.IsASCII())
			this.Value = this.Raw;
	}

	InternalDecode (context, type) {
		switch (type) {
			case ProtocolType.StringEmpty:
			case ProtocolType.UTF16Empty:
				this.Update(Buffer.alloc(0));
				break;
			case ProtocolType.StringOne:
				this.Update(context.GetBytes(1));
				break;
			case ProtocolType.UTF16One:
				this.Update(context.GetBytes(2), "utf16le")
				break;
			case ProtocolType.String:
			case ProtocolType.StringLong:
			case ProtocolType.Buffer:
				this.Update(context.GetBytes(context.GetLength()));
				break;
			case ProtocolType.UTF16:
				this.Update(context.GetBytes(context.GetLength()), "utf16le");
				break;
			case ProtocolType.Utf8:
				this.Update(context.GetBytes(context.GetLength()), "utf8");
				break;
			case ProtocolType.StringTable:
				this.Update(ProtocolConstants.StringTable[context.GetByte()]);
				break;
			default:
				this.ThrowParseException();
				break;
		}
	}

	InternalToString (indentLevel = 0) {
		if (this.Value.length <= 0)
			return "<empty string>";
		if (typeof(this.Value) === "string")
			return `<${this.Value}>`;
		return `<${this.Value.toString("hex")}>`;
	}

	InternalEncode () {
		if (this.Raw.length === 0)
			return Buffer.from([ ProtocolType.StringEmpty ]);
		else if (this.Raw.length === 1)
			return Buffer.from([ ProtocolType.StringOne ]).AddRange(this.Raw);
		else if (ProtocolConstants.StringTable.indexOf(this.Value) >= 0)
			return Buffer.from([ ProtocolType.StringTable, ProtocolConstants.StringTable.indexOf(this.Value) ]);
		else
			return Buffer.from([ ProtocolType.String, this.Raw.length ]).AddRange(this.Raw);
	}

}

module.exports = PyString;