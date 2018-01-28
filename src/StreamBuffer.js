"use strict";

class StreamBuffer {

    constructor (buffer) {
        this._buffer = buffer;
        this._index = 0;
    }

    read (bytesToRead) {
        return this.getBuffer().slice(this._index, this._index += bytesToRead);
    }

    hasMore () {
        return this._index < this.length - 1;
    }

    rewind () {
        this._index = 0;
    }

    get length () {
        return this.getBuffer().length;
    }

    get index () {
        return this._index;
    }

    getBuffer () {
        return this._buffer;
    }

    slice (...args) {
        return this.getBuffer().slice(...args);
    }

    readUInt32LE () {
        return this.read(4).readUInt32LE(0);
    }

    readUIntLE (bytes) {
        return this.read(bytes).readUIntLE(0, bytes);
    }

    readDoubleLE () {
        return this.read(8).readDoubleLE(0);
    }

    readFloatLE () {
        return this.read(4).readFloatLE(0);
    }

    seek (i) {
        this._index += i;
    }

}

module.exports = StreamBuffer;