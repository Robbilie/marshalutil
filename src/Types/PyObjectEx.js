const { PyObjectType, PyObject } = require("./");
const { ProtocolType, MarshalStream } = require("./../");
const Types = require("./");

class PyObjectEx extends PyObject {

	constructor (type) {
		super(type);
	}

	InternalDecode (context, type) {
		this.Dict = new Map();
		this.List = [];
		this.Header = context.ProcessSnip();

		while (true) {
			let obj = context.ProcessSnip();
			if (obj instanceof Types.PyMark)
				break;
			this.List.push(obj);
		}

		while (true) {
			let obj = context.ProcessSnip();
			if (obj instanceof Types.PyMark)
				break;
			this.Dict.set(context.ProcessSnip(), context.ProcessSnip());
		}

	}

}

module.exports = PyObjectEx;