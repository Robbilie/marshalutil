"use strict";

class StreamBuffer {

    constructor (buffer) {
        this._buffer = buffer;
        this._index = 0;
    }

    read (bytesToRead) {
        return this.getBuffer().slice(this._index, this._index += bytesToRead);
    }

    rewind () {
        this._index = 0;
    }

    get length () {
        return this.getBuffer().length;
    }

    getBuffer () {
        return this._buffer;
    }

    slice (start) {
        return this.getBuffer().slice(start);
    }

    readUInt32LE () {
        return this.read(4).readUInt32LE();
    }

}

module.exports = StreamBuffer;