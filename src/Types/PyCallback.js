const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../")

class PyCallback extends PyObject {

	constructor () {
		super(PyObjectType.Callback);
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Callback)
			this.ThrowParseException();

		this.Definition = context.ProcessSnip();
	}

	InternalToString (indentLevel = 0) {
		return `<${this.Type}: ${this.Definition.InternalToString(indentLevel)}>`;
	}

}

module.exports = PyCallback;