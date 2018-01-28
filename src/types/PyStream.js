"use strict";

const { PyObject } = require(".");

// TODO: fix recrusive shit
const proxy = require("..");

class PyStream extends PyObject {

    decode (marshal, opcode) {
        const length = marshal.getLength();
        const buffer = marshal.getBytes(length);
        const stream = new proxy.MarshalStream(buffer);
        return stream.value;
    }

}

module.exports = PyStream;