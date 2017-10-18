const { PyObjectType, PyObject } = require("./");
const { ProtocolType, MarshalStream } = require("./../")

class PyReduce extends PyObject {

	constructor () {
		super(PyObjectType.Global);
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Global)
			this.ThrowParseException();

		this.Raw = context.GetBytes(context.GetLength());
		this.Value = this.Raw.toString("ascii");
	}

}

module.exports = PyReduce;