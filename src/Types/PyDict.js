const { PyObjectType, PyObject } = require("./");
const { Marshal, ProtocolType } = require("./../");

class PyDict extends PyObject {

	constructor (dict = new Map()) {
		super(PyObjectType.Dictionary);
		this.Dict = new Map([...dict.entries()].map(([key, value]) => [this.From(key), this.From(value)]));
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Dict)
			this.ThrowParseException();

		let dictLength = context.GetLength();
		let dict = new Map();
		for (let i = 0; i < dictLength; i++) {
			let value = context.ProcessSnip();
			let key = context.ProcessSnip();
			dict.set(key.Value, value);
			//dict.set(key, value);
		}
		this.Dict = dict;
	}

	InternalToString (indentLevel = 0) {
		return `<\n${[...this.Dict.entries()].reduce((str, [key, value]) => str + this.Indent(indentLevel + 1) + "<" + key + ">" + " " + value.InternalToString(indentLevel + 1) + "\n", "")}${this.Indent(indentLevel)}>`;
		//return `<\n${[...this.Dict.entries()].reduce((str, [key, value]) => str + this.Indent(indentLevel + 1) + key.ToString() + " " + value.InternalToString(indentLevel + 1) + "\n", "")}${this.Indent(indentLevel)}>`;
	}

	InternalEncode () {
		let marshalled = Buffer
			.from([ ProtocolType.Dict ])
			.Add(this.Dict.size);
		this.Dict.forEach((value, key) => {
			marshalled = marshalled
				.AddRange(value.Encode())
				.AddRange(key.Encode());
		});
		return marshalled;
	}

}

module.exports = PyDict;