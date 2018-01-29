"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyFloat extends PyObject {

    decode (marshal, opcode) {
        if (opcode === ProtocolType.FloatEmpty)
            return 0;
        return marshal.getBytes(8).readDoubleLE(0);
    }

    encode (marshal, input) {
        const buffer = Buffer.alloc(8);
        buffer.writeDoubleLE(input, 0);
        return Buffer.from([ ProtocolType.Float ]).concat(buffer);
    }

}

module.exports = PyFloat;