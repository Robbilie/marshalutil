const { PyObjectType, PyObjectEx, PyGlobal, PyTuple, PyDict } = require("./");
const { ProtocolType } = require("./../");
const Types = require("./");

class PyNewObj extends PyObjectEx {

	constructor (className = null, kwargs, list = [], dict = {}) {
		super(PyObjectType.NewObj);
		if (className != null) {
			this.Header = this.From([
				[ new PyGlobal(className) ],
				new PyDict(kwargs),
			]);
			this.List = new PyTuple(list).Items;
			this.Dict = new PyDict(dict).Dict;
		}
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.NewObj)
			this.ThrowParseException();

		super.InternalDecode(context, type);
	}

	InternalToString (indentLevel = 0) {
		return `<${this.Type}: ${this.Header.InternalToString(indentLevel)}(\n${this.List.reduce((str, obj) => str + this.Indent(indentLevel + 1) + obj.InternalToString(indentLevel + 1) + "\n", "")}${this.Indent(indentLevel)})(${[...this.Dict.entries()].reduce((str, [key, value]) => str + this.Indent(indentLevel + 1) + "<" + key + ">" + " " + value.InternalToString(indentLevel + 1) + "\n", "")})>`;
	}

}

module.exports = PyNewObj;