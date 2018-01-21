const { PyObjectType, PyObject } = require("./");
const { ProtocolType, MarshalStream, ProtocolConstants } = require("./../")

class PyStream extends PyObject {

	constructor (data) {
		super(PyObjectType.Stream);
		if (data) {
			data = this.From(data);
			this.Stream = new MarshalStream(ProtocolConstants.PacketHeader.AddRange(data instanceof Buffer ? data : data.Encode()));
		}
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
		return `<Stream: ${this.Content.InternalToString(indentLevel)}>`;
	}

	InternalEncode () {
		let length;
		if (this.Stream.Raw.length < 0xff) {
			length = Buffer.from([this.Stream.Raw.length]);
		} else {
			let buf = Buffer.from([ 0, 0, 0, 0 ]);
			buf.writeUInt32LE(this.Stream.Raw.length, 0);
			length = Buffer.from([ 0xff ]).AddRange(buf);
		}

		return Buffer
			.from([ ProtocolType.Stream ])
			.AddRange(length)
			.AddRange(this.Stream.Raw);

		let marshalled = this.Data instanceof Buffer ? this.Data : this.Data.Encode();
		return Buffer
			.from([ ProtocolType.Stream, ProtocolConstants.PacketHeader.length + marshalled.length ])
			.AddRange(ProtocolConstants.PacketHeader)
			.AddRange(marshalled);
	}

}

module.exports = PyStream;