const { Marshal } = require("./");

class CustomClass {

	ToString () {
		return this.InternalToString();
	}

	InternalToString (indentLevel = 0) {
		return Marshal.ToPyObject(this).InternalToString(indentLevel);
	}

}

module.exports = CustomClass;