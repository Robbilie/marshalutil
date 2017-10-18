const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");

class PyInt extends PyObject {

	constructor (val) {
		super(PyObjectType.Int);
		this.Value = val;
	}

	InternalDecode (context, type) {
		switch (type) {
			case ProtocolType.Zero:
				this.Value = 0;
				break;
			case ProtocolType.One:
				this.Value = 1;
				break;
			case ProtocolType.Minusone:
				this.Value = -1;
				break;
			case ProtocolType.Int8:
				this.Value = context.GetInt(1);
				break;
			case ProtocolType.Int16:
				this.Value = context.GetInt(2);
				break;
			case ProtocolType.Int32:
				this.Value = context.GetInt(4);
				break;
			default:
				this.ThrowParseException();
				break;
		}
	}

	InternalToString (indentLevel = 0) {
		return `<${this.Value}>`;
	}

}

module.exports = PyInt;