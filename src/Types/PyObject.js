const { Marshal } = require("./../");
const Types = require("./");

class PyObject {

	constructor (type) {
		this.Type = type;
	}

	GetType () {
		return this.Type;
	}

	Decode (context, type) {
		return this.InternalDecode(context, type);
	}

	InternalDecode () {
		throw new Error("NotImplementedException: InternalDecode " + this.constructor.name);
	}

	Encode () {
		return this.InternalEncode();
	}

	InternalEncode () {
		throw new Error("NotImplementedException: InternalEncode " + this.constructor.name);
	}

	ThrowParseException (msg) {
		throw new Error(`InvalidOperationException: Unable to parse ${this.Type} as ${this.GetType()} ${msg}`);
	}

	ToString () {
		return this.InternalToString();
	}

	InternalToString (indentLevel = 0) {
		return `<${this.Type}>`;
	}

	Indent (indentLevel = 0, indentChar = '  ' || '\t') {
		return indentChar.repeat((indentLevel > 0 ? indentLevel : 0) * 1);
	}

	get IntValue () {
		if (this instanceof Types.PyNone)
			return 0;

		if (this instanceof Types.PyFloat)
			return this.Value;

		if (this instanceof Types.PyBool)
			return this.Value ? 1 : 0;

		if (this instanceof Types.PyInt)
			return this.Value;

		if (this instanceof Types.PyLong)
			return this.Value;

		throw new Error(`InvalidOperationException: Unable to parse ${this.GetType()} as integer`);
	}

	From (value) {
		return Marshal.ToPyObject(value);
	}

	ToNative () {
		return Marshal.ToNativeType(this);
	}

}

module.exports = PyObject;