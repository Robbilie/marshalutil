const { PyObjectType, PyString } = require("./");
const { BitConverter, ProtocolType, ProtocolConstants } = require("./../");

class PyUtf8 extends PyString {

	InternalEncode () {
		return Buffer.from([ ProtocolType.Utf8, this.Raw.length ]).AddRange(this.Raw);
	}

}

module.exports = PyUtf8;