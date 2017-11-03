const zlib = require("zlib");

class Zlib {

	static Decompress (bytes) {
		return zlib.inflateSync(bytes);
	}

	static Compress (bytes) {
		return zlib.deflateSync(bytes);
	}

}

module.exports = Zlib;