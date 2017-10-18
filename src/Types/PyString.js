const { PyObjectType, PyObject } = require("./");
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

		this.Raw = val instanceof String ? Buffer.from(val, enc) : val;
		this.Value = val instanceof String ? val : val.toString(enc);
	}

	InternalDecode (context, type) {
		switch (type) {
			case ProtocolType.StringEmpty:
			case ProtocolType.UTF16Empty:
				this.Update(new Buffer(0));
				break;
			case ProtocolType.StringOne:
				this.Update(context.GetBytes(1));
				break;
			case ProtocolType.UTF16One:
				this.Update(context.GetBytes(2), "unicode")
				break;
			case ProtocolType.String:
			case ProtocolType.StringLong:
			case ProtocolType.Buffer:
				this.Update(context.GetBytes(context.GetLength()));
				break;
			case ProtocolType.UTF16:
				this.Update(context.GetBytes(context.GetLength()), "unicode");
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
		if (this.Value[0].IsLetterOrDigit())
			return `<${this.Value}>`;
		return `<${BitConverter.ToString(this.Raw)}>`;
	}

}

module.exports = PyString;