"use strict";

const { ProtocolConstants, Zlib } = require("./");

class Marshal {

    static validateBuffer (buffer) {
        if (!(buffer instanceof Buffer))
            throw new Error("InvalidTypeException: Not a Buffer");
        if (buffer === null || buffer.length === 0)
            throw new Error("ArgumentNullException");
        return buffer;
    }
    static handleCompression (buffer) {
        if (buffer[0] === ProtocolConstants.ZlibMarker)
            return Zlib.decompress(buffer);
        return buffer;
    }

    static validate (buffer) {
        let data = this.validateBuffer(buffer);
        data = this.handleCompression(data);
        if (data[0] !== ProtocolConstants.ProtocolId)
            throw new Error("ArgumentException: Invalid stream header");
        return data;
    }

}

module.exports = Marshal;