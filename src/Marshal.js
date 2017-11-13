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
		b.writeDoubleLE(input, 0);
		return Buffer.from([ ProtocolType.Float, ...b ]);
	}

	static AsInt32 (input) {
		const b = Buffer.alloc(4)
		b.writeInt32LE(input, 0);
		return Buffer.from([ ProtocolType.Int32, ...b ]);
	}

	static AsBool (input) {
		return Buffer.from([ input ? ProtocolType.True : ProtocolType.False ]);
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
				if (input % 1 === 0)
					return this.AsInt32(input);
				else
					return this.AsFloat(input);
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

	static ToPyObject (value) {
		if (value === undefined || value instanceof Types.PyObject)
			return value;
		if (value === null)
			return new Types.PyNone();
		switch (value.constructor.name) {
			case "Number":
				if (value % 1 == 0) {
					if (value > 4294967296)
						return new Types.PyLong(value);
					else
						return new Types.PyInt(value);
				} else {
					return new Types.PyFloat(value);
				}
			case "Boolean":
				return new Types.PyBool(value);
			case "String":
				return new Types.PyBuffer(value);
			case "Array":
				return new Types.PyTuple(value);
			case "Object":
				value = new Map(Object.entries(value));
			case "Map":
				return new Types.PyDict(value);
			default:
				console.log(value);
				throw Error(`Wat ${value.constructor.name}`);
		}
	}

	static ToNativeType (value) {
		if (value === null || value === undefined || !(value instanceof Types.PyObject))
			return value;
		if (value.Value !== undefined)
			return value.Value;
		if (value.Items)
			return value.Items.map(e => Marshal.ToNativeType(e));
		if (value.Dict)
			return [...this.Dict.entries()].reduce((obj, [key, value]) => { obj[key] = Marshal.ToNativeType(value); return obj; }, {});
	}

}

module.exports = Marshal;