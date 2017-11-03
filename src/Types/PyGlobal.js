const { PyObjectType, PyObject } = require("./");
const { ProtocolType, MarshalStream } = require("./../")

class PyReduce extends PyObject {

	constructor (data, enc = null) {
		super(PyObjectType.Global);
		this.Update(data, enc);
	}

	Update (val, enc) {
		if (val === undefined)
			return;

		if (enc === null)
			enc = "ascii";

		this.Raw = val instanceof Buffer ? val : Buffer.from(val, enc);
		this.Value = val instanceof Buffer ? val.toString(enc) : val;
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Global)
			this.ThrowParseException();

		this.Raw = context.GetBytes(context.GetLength());
		this.Value = this.Raw.toString("ascii");
	}

	InternalToString () {
		return `<${this.Type}: ${this.Value}>`;
	}

	InternalEncode () {
		return Buffer.from([ ProtocolType.Global, this.Raw.length ]).AddRange(this.Raw);
	}

}

module.exports = PyReduce;