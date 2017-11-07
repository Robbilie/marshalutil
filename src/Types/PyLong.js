const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");

class PyLong extends PyObject {

	constructor (val) {
		super(PyObjectType.Long);
		this.Value = val;
	}

	InternalDecode (context, type) {
		switch (type) {
			case ProtocolType.Int64:
				this.Value = context.GetInt64();
				break;
			case ProtocolType.Long:
				this.Value = context.GetLong();
				break;
			default:
				this.ThrowParseException();
				break;
		}
	}

	InternalToString (indentLevel = 0) {
		return `<${this.Value}>`;
	}

	InternalEncode () {
		let buf = Buffer.alloc(8);
		buf.writeIntLE(this.Value, 0, 8);
		return Buffer.from([ ProtocolType.Long, buf.length ]).AddRange(buf);
	}

}

module.exports = PyLong;