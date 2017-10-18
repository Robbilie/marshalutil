const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");

class PyDict extends PyObject {

	constructor (dict = {}) {
		super(PyObjectType.Dict);
		this.Dict = dict;
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Dict)
			this.ThrowParseException();

		let dictLength = context.GetLength();
		let dict = {};
		for (let i = 0; i < dictLength; i++) {
			let value = context.ProcessSnip();
			let key = context.ProcessSnip();
			dict[key] = value;
		}
		this.Dict = dict;
	}

	InternalToString (indentLevel = 0) {
		return `<\n${Object.entries(this.Dict).reduce((str, [key, value]) => str + this.Indent(indentLevel + 1) + key + " " + value.InternalToString(indentLevel + 1) + "\n", "")}${this.Indent(indentLevel)}>`;
	}

}

module.exports = PyDict;