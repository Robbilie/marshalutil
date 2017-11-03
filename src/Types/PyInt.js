const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");

class PyInt extends PyObject {

	constructor (val) {
		super(PyObjectType.Int);
		this.Value = val;
	}

	InternalDecode (context, type) {
		switch (type) {
			case ProtocolType.Zero:
				this.Value = 0;
				break;
			case ProtocolType.One:
				this.Value = 1;
				break;
			case ProtocolType.Minusone:
				this.Value = -1;
				break;
			case ProtocolType.Int8:
				this.Value = context.GetInt(1);
				break;
			case ProtocolType.Int16:
				this.Value = context.GetInt(2);
				break;
			case ProtocolType.Int32:
				this.Value = context.GetInt(4);
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
		if (this.Value == 0)
			return Buffer.from([ ProtocolType.Zero ]);
		else if (this.Value == 1)
			return Buffer.from([ ProtocolType.One ]);
		else if (this.Value == -1)
			return Buffer.from([ ProtocolType.Minusone ]);
		else if (this.Value < 127)
			return Buffer.from([ ProtocolType.Int8 ]).Add(this.Value);
		else if (this.Value < 32768) {
			let buf = Buffer.alloc(2);
			buf.writeInt16LE(this.Value, 0)
			return Buffer.from([ ProtocolType.Int16 ]).AddRange(buf);
		} else {
			let buf = Buffer.alloc(4);
			buf.writeInt32LE(this.Value, 0)
			return Buffer.from([ ProtocolType.Int32 ]).AddRange(buf);
		}
	}

}

module.exports = PyInt;