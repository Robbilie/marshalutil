const zlib = require("zlib");

class Zlib {

	static Decompress (bytes) {
		return zlib.inflateSync(bytes.slice(2, bytes.length - 2));
	}

}

module.exports = Zlib;