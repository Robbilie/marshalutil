const { PyObjectType, PyObject } = require("./");
const { ProtocolType, MarshalStream, ProtocolConstants } = require("./../")

class PyStream extends PyObject {

	constructor (data) {
		super(PyObjectType.Stream);
		if (data)
		this.Stream = new MarshalStream(ProtocolConstants.PacketHeader.AddRange(data instanceof Buffer ? data : data.Encode()));
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
		return `<Stream: ${this.Content.ToString(indentLevel + 1)}>`;
	}

	InternalEncode () {
		return Buffer
			.from([ ProtocolType.Stream, this.Stream.Raw.length ])
			.AddRange(this.Stream.Raw);

		let marshalled = this.Data instanceof Buffer ? this.Data : this.Data.Encode();
		return Buffer
			.from([ ProtocolType.Stream, ProtocolConstants.PacketHeader.length + marshalled.length ])
			.AddRange(ProtocolConstants.PacketHeader)
			.AddRange(marshalled);
	}

}

module.exports = PyStream;