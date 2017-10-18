const { PyObjectType, PyObject } = require("./");
const { ProtocolType } = require("./../");

class PyList extends PyObject {

	constructor (items = []) {
		super(PyObjectType.List);
		this.Items = items;
	}

	InternalDecode (context, type) {
		let count = 0;

		switch (type) {
			case ProtocolType.ListEmpty:
				break;
			case ProtocolType.ListOne:
				count = 1;
				break;
			case ProtocolType.TupleTwo:
				count = 2;
				break;
			case ProtocolType.List:
				count = context.GetLength();
				break;
			default:
				this.ThrowParseException();
				break;
		}

		let items = [];

		if (count > 0) {
			for (let i = 0; i < count; i++) {
				items.push(context.ProcessSnip());
			}
		}

		this.Items = items;
	}

	InternalToString (indentLevel = 0) {
		return `<\n${this.Items.reduce((str, obj) => str + this.Indent(indentLevel + 1) + obj.InternalToString(indentLevel + 1) + "\n", "")}${this.Indent(indentLevel)}>`;
	}

}

module.exports = PyList;