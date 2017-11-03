const { PyObjectType, PyObjectEx } = require("./");
const { ProtocolType } = require("./../")

class PyReduce extends PyObjectEx {

	constructor () {
		super(PyObjectType.Reduce);
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Reduce)
			this.ThrowParseException();

		super.InternalDecode(context, type);
	}

}

module.exports = PyReduce;