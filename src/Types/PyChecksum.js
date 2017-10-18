const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../")

class PyChecksum extends PyObject {

	constructor () {
		super(PyObjectType.Checksum);
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Checksum)
			this.ThrowParseException();

		this.Checksum = context.GetInt(4);
		this.Value = context.ProcessSnip();
	}

}

module.exports = PyChecksum;