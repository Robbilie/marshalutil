"use strict";

const { StreamBuffer } = require(".");

/*
 * MarshalStorage starts with index 1 !
 */
class MarshalStorage {

    constructor (size, data) {
        this._storage = {};
        this._index = 1;
        this._map = MarshalStorage.setup(size, data);
    }

    static setup (size, data) {
        const stream = new StreamBuffer(data);
        const map = {};
        for (let i = 1; i < size; i++) {
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
        return this._storage[index] || this._storage[this._map[index]];
    }

    getMap () {
        return this._map;
    }

    *[Symbol.iterator] () {
        for (let val of Object.values(this._storage))
            yield val;
    }

}

module.exports = MarshalStorage;