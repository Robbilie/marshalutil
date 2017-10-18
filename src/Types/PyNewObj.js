const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../")

class PyNewObj extends PyObject {

	constructor () {
		super(PyObjectType.NewObj);
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Newobj)
			this.ThrowParseException();

		super.InternalDecode(context, type);
	}

}

module.exports = PyNewObj;