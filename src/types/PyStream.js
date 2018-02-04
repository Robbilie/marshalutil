"use strict";

const { PyObject } = require(".");

// TODO: fix recursive shit
const proxy = require("..");

class PyStream extends PyObject {

    decode (marshal, opcode) {
        const { MarshalStream } = proxy;
        const length = marshal.getLength();
        const buffer = marshal.getBytes(length);
        const stream = new MarshalStream(buffer);
        return stream.value;
    }

    encode (marshal, input) {
        const { MarshalEncoder, MarshalHelper, ProtocolType } = proxy;
        const encoder = new MarshalEncoder(input);
        const data = encoder.value;
        const length = MarshalHelper.writeLength(data.length);
        return Buffer.from([ ProtocolType.Stream ]).concat(length, data);
    }

}

module.exports = PyStream;