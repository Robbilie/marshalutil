const { PyObjectType, PyObjectEx } = require("./");
const { ProtocolType } = require("./../");
const Types = require("./");

class PyNewObj extends PyObjectEx {

	constructor () {
		super(PyObjectType.NewObj);
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Newobj)
			this.ThrowParseException();

		super.InternalDecode(context, type);
	}

	InternalToString (indentLevel = 0) {
		return `<${this.Type}: ${this.Name.InternalToString(indentLevel)}(${this.Arguments.InternalToString(indentLevel)})>`;
	}

}

module.exports = PyNewObj;