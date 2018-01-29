"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyLong extends PyObject {

    decode (marshal, opcode) {
        let length = 8;
        if (opcode === ProtocolType.Long)
            length = marshal.getLength();
        return marshal.getBytes(length).readUIntLE(0, length);
    }

    encode (marshal, input) {
        let length;
        if (input <= 0xff) {
            length = 1;
        } else if (input <= 0xffff) {
            length = 2;
        } else if (input <= 0xffffffff) {
            length = 4;
        } else {
            length = 8;
        }
        const buffer = Buffer.alloc(length);
        buffer.writeUIntLE(input, 0, length);
        return Buffer.from([ ProtocolType.Long, length ]).concat(buffer);
    }

}

module.exports = PyLong;