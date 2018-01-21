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

	InternalEncode () {
		let marshalled = Buffer.from([ ProtocolType[this.Type] ]).AddRange(this.Header.Encode());
		//if (this.List.length == 0) {
		//} else {
			this.List.forEach(item => {
				marshalled = marshalled.AddRange(item.Encode());
			});
			marshalled = marshalled.Add( ProtocolType.Mark );
			//throw new Error("wwwwwwwwwwaaaaaa");
		//}
		if (this.Dict.size == 0) {
			marshalled = marshalled.Add( ProtocolType.Mark );
		} else {
			throw new Error("wwwwwwwwwwaaaaaa");
		}
		return marshalled;
	}

}

module.exports = PyObjectEx;