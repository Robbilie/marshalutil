const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");
const Types = require("./");

class PyInstance extends PyObject {

	constructor (name, args = []) {
		super(PyObjectType.Instance);
		if (name !== undefined) {
			this.Name = this.From(name);
			this.Arguments = this.From(args);
			//this.Arguments = this.From(args instanceof Array ? args.map(this.From) : args);
		}
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Instance)
			this.ThrowParseException();

		let nameObj = context.ProcessSnip();
		if (!(nameObj instanceof Types.PyString)) {
			this.ThrowParseException("Expected PyString!");
		}

		this.Name = nameObj;
		this.Arguments = context.ProcessSnip();
	}

	InternalToString (indentLevel = 0) {
		return `<${this.Type}: ${this.Name.Value}(${this.Arguments.InternalToString(indentLevel)})>`;
	}

	InternalEncode () {
		return Buffer.from([ ProtocolType.Instance ]).AddRange(this.Name.Encode()).AddRange(this.Arguments.Encode());
	}

	set state (state) {
		throw "You cant set a PyInstance state";
	}

}

module.exports = PyInstance;