require("./StringExtender");

class BitConverter {

	static GetBytes (size) {
		let buf = Buffer.alloc(4);
		buf.writeInt32LE(size);
		return buf;
	}

	static ToString (value) {
		return value.reduce((str, obj) => str + obj + " ", " ");
	}

	static ToDouble (value, startIndex) {
		return value.readDoubleLE(startIndex);
	}

	static ToInt32 (value, startIndex) {
		return value.readInt32LE(startIndex);
	}

	static ToInt64 (value, startIndex) {
		return this.ToDouble(value, startIndex);
	}

}

module.exports = BitConverter;