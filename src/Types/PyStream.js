const { PyObjectType, PyObject } = require("./");
const { ProtocolType, MarshalStream } = require("./../")

class PyStream extends PyObject {

	constructor () {
		super(PyObjectType.Stream);
	}

	get Raw () {
		return this.Stream.Raw;
	}

	get Content () {
		return this.Stream.Value;
	}

	InternalDecode (context, type) {
		if (type !== ProtocolType.Stream)
			this.ThrowParseException();

		this.Stream = new MarshalStream(context.GetBytes(context.GetLength()));
	}

	InternalToString (indentLevel = 0) {
		return `<Stream: ${this.Content}>`;
	}

}

module.exports = PyStream;