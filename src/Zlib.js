"use strict";

const zlib = require("zlib");

class Zlib {

    static decompress (bytes) {
        return zlib.inflateSync(bytes);
    }

    static compress (bytes) {
        return zlib.deflateSync(bytes);
    }

}

module.exports = Zlib;