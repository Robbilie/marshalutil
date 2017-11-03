const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");

class PyBool extends PyObject {

	constructor (val) {
		super(PyObjectType.Bool);
		this.Value = val;
	}

	InternalDecode (context, type) {
		switch (type) {
			case ProtocolType.True:
				this.Value = true;
				break;
			case ProtocolType.False:
				this.Value = false;
				break;
			default:
				this.ThrowParseException();
				break;
		}
	}

	InternalToString (indentLevel = 0) {
		return `<${this.Value}>`;
	}

	InternalEncode () {
		return Buffer.from([ this.Value ? ProtocolType.True : ProtocolType.False ]);
	}

}

module.exports = PyBool;