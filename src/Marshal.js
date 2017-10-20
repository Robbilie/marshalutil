const Types = require("./Types");
const { BitConverter, ProtocolType } = require("./");

class Marshal {

	static AsBuffer (input) {
		if (typeof input === "string") {
			return this.AsBuffer(Buffer.from(input, "utf8"));
		} else {
			return Buffer.from([ ProtocolType.Buffer, input.length, ...input ]);
		}
	}

	static AsFloat (input) {
		const b = Buffer.alloc(8)
		b.writeFloatLE(input, 0);
		return Buffer.from([ ProtocolType.Float, ...b ]);
	}

	static AsInt32 (input) {
		const b = Buffer.alloc(4)
		b.writeInt32LE(input, 0);
		return Buffer.from([ ProtocolType.Int32, ...b ]);
	}

	static AsBool (input) {
		return input ? ProtocolType.True : ProtocolType.False;
	}

	static AsAuto (input) {
		if (input === null)
			return Buffer.from([ ProtocolType.None ]);
		switch (input.constructor.name) {
			case "PyNone":
				return Buffer.from([ ProtocolType.None ]);
			case "String":
				return this.AsBuffer(input);
			case "PyString":
				return this.AsBuffer(input.Raw);
			case "Buffer":
				return this.AsBuffer(input);
			case "Number":
				console.log("can be a different number type");
				return this.AsInt32(input);
			case "PyInt":
				return this.AsInt32(input.Value);
			case "Boolean":
				return this.AsBool(input);
			case "PyBool":
				return this.AsBool(input.Value);
			case "PyFloat":
				return this.AsFloat(input.Value);
			default:
				throw Error(`NotImplementedException: Unable to marshal ${input.GetType()}`);
		}
	}

}

module.exports = Marshal;