const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");

class PyFloat extends PyObject {

	constructor (val) {
		super(PyObjectType.Float);
		this.Value = val;
	}

	InternalDecode (context, type) {
		switch (type) {
			case ProtocolType.FloatEmpty:
				this.Value = 0;
				break;
			case ProtocolType.Float:
				this.Value = context.GetFloat();
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

module.exports = PyFloat;