"use strict";

class PyObject {

    constructor (value) {
        this._value = value;
    }

    decode () {
        throw new Error("NotImplementedException");
    }

    encode () {
        throw new Error("NotImplementedException");
    }

    valueOf () {
        return this._value;
    }

    toJSON () {
        return {
            type: this.constructor.name,
            data: this.valueOf(),
        };
    }

}

module.exports = PyObject;