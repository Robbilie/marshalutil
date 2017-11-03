const { PyObjectType, PyString } = require("./");
const { BitConverter, ProtocolType, ProtocolConstants } = require("./../");

class PyBuffer extends PyString {

	InternalEncode () {
		return Buffer.from([ ProtocolType.Buffer, this.Raw.length ]).AddRange(this.Raw);
	}

}

module.exports = PyBuffer;