"use strict";

const { StreamBuffer } = require("./");

class MarshalStorage {

    constructor (size, data) {
        this._storage = {};
        this._index = 0;
        this._map = this.setup(size, data);
    }

    setup (size, data) {
        const stream = new StreamBuffer(data);
        const map = {};
        for (let i = 0; i < size; i++) {
            map[i] = stream.readUInt32LE();
        }
        return map;
    }

    store (obj) {
        let index = this.getMap()[this._index++];
        if (index === 0)
            index = 1;
        if (index > 0)
            this.set(index, obj);
    }

    set (index, obj) {
        this._storage[index] = obj;
    }

    get (index) {
        return this._storage[index - 1] || this._storage[this._map[index - 1] - 1];
    }

    getMap () {
        return this._map;
    }

    [Symbol.iterator] () {
        return Object.values(this._storage);
    }

}

module.exports = MarshalStorage;