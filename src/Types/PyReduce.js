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

	InternalToString (indentLevel = 0) {
		return `<Reduce: ${this.Header.Type} (${this.Header.InternalToString(indentLevel)})>`;
	}

}

module.exports = PyReduce;