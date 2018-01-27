"use strict";

const zlib = require("zlib");

class Zlib {

    decompress (bytes) {
        return zlib.inflateSync(bytes);
    }

    compress (bytes) {
        return zlib.deflateSync(bytes);
    }

}

module.exports = Zlib;