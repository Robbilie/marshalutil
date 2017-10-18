const { PyObjectType, PyObject } = require("./");
const { ProtocolType, MarshalStream } = require("./../")

class PyMark extends PyObject {

	constructor () {
		super(PyObjectType.Mark);
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Mark)
			this.ThrowParseException();
	}

}

module.exports = PyMark;