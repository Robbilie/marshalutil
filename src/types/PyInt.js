"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyInt extends PyObject {

    decode (marshal, opcode) {
        if (opcode === ProtocolType.Zero)
            return 0;
        if (opcode === ProtocolType.One)
            return 1;
        if (opcode === ProtocolType.Minusone)
            return -1;

        let bytes = 0;
        if (opcode === ProtocolType.Int8) {
            bytes = 1;
        } else if (opcode === ProtocolType.Int16) {
            bytes = 2;
        } else if (opcode === ProtocolType.Int32) {
            bytes = 4;
        }
        return marshal.getInt(bytes);
    }

    encode (marshal, input) {
        if (input === 0)
            return Buffer.from([ ProtocolType.Zero ]);
        if (input === 1)
            return Buffer.from([ ProtocolType.One ]);
        if (input === -1)
            return Buffer.from([ ProtocolType.Minusone ]);
        let length;
        let type;
        if (input <= 0xff) {
            length = 1;
            type = ProtocolType.Int8;
        } else if (input <= 0xffff) {
            length = 2;
            type = ProtocolType.Int16;
        } else if (input <= 0xffffffff) {
            length = 4;
            type = ProtocolType.Int32;
        }
        const buffer = Buffer.alloc(length);
        buffer.writeUIntLE(input, 0, length);
        return Buffer.from([ type ]).concat(buffer);
    }

}

module.exports = PyInt;