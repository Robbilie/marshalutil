const { PyObjectType, PyObjectEx, PyGlobal, PyTuple, PyDict } = require("./");
const { ProtocolType } = require("./../")

class PyReduce extends PyObjectEx {

	constructor (className = null, args, kwargs, list = [], dict = {}) {
		super(PyObjectType.Reduce);
		if (className != null) {
			this.Header = this.From([
				new PyGlobal(className),
				...(kwargs ? [args, kwargs] : [args])
			]);
			this.List = new PyTuple(list).Items;
			this.Dict = new PyDict(dict).Dict;
		}
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Reduce)
			this.ThrowParseException();

		super.InternalDecode(context, type);
	}

	InternalToString (indentLevel = 0) {
		return `<Reduce: ${this.Header.Type} (${this.Header.InternalToString(indentLevel)})>`;
	}

}

module.exports = PyReduce;