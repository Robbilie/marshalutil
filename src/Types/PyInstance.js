const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");
const Types = require("./");

class PyInstance extends PyObject {

	constructor (name, args) {
		super(PyObjectType.Instance);
		this.Name = name;
		this.Arguments = args;
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Instance)
			this.ThrowParseException();

		let nameObj = context.ProcessSnip();
		if (!(nameObj instanceof Types.PyString))
			this.ThrowParseException("Expected PyString!");

		this.Name = nameObj.Value;
		this.Arguments = context.ProcessSnip();
	}

	InternalToString (indentLevel = 0) {
		return `<${this.Type}: ${this.Name}(${this.Arguments.InternalToString(indentLevel)})>`;
	}

	InternalEncode () {
		return Buffer.from([ ProtocolType.Instance ]).AddRange(this.Name.Encode()).AddRange(this.Arguments.Encode());
	}

}

module.exports = PyInstance;