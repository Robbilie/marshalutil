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

}

module.exports = PyCallback;