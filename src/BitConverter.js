require("./StringExtender");
const Decimal = require("decimal.js");

class BitConverter {

	static GetBytes (size) {
		let buf = Buffer.alloc(4);
		buf.writeInt32LE(size);
		return buf;
	}

	static ToString (value) {
		return value.toString("hex");
		return value.reduce((str, obj) => str + obj + " ", " ");
	}

	static ToDouble (value, startIndex) {
		return value.readDoubleLE(startIndex);
	}

	static ToInt32 (value, startIndex) {
		return value.readUInt32LE(startIndex);
	}

	static ToInt64 (value, startIndex) {
		return value.readUIntLE(startIndex, 8);
		//if (value.slice(-2).equals(Buffer.from([0,0])))
		//	return this.ToDouble(value, startIndex);
		//else
			return new Decimal(`0x${value.SwapEndianness().toString("hex")}`);
	}

}

module.exports = BitConverter;