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
		return `<${this.Type}: ${this.Header.InternalToString(indentLevel)}(\n${this.List.reduce((str, obj) => str + this.Indent(indentLevel + 1) + obj.InternalToString(indentLevel + 1) + "\n", "")}${this.Indent(indentLevel)})(${[...this.Dict.entries()].reduce((str, [key, value]) => str + this.Indent(indentLevel + 1) + "<" + key + ">" + " " + value.InternalToString(indentLevel + 1) + "\n", "")})>`;
	}

}

module.exports = PyNewObj;