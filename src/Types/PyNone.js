const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");

class PyNone extends PyObject {

	constructor (val) {
		super(PyObjectType.None);
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.None)
			this.ThrowParseException();
	}

	InternalEncode () {
		return Buffer.from([ ProtocolType.None ]);
	}

}

module.exports = PyNone;