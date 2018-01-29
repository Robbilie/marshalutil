"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyList extends PyObject {

    decode (marshal, opcode) {
        let length = 0;
        if (opcode === ProtocolType.ListOne) {
            length = 1;
        } else if (opcode === ProtocolType.List) {
            length = marshal.getLength();
        }
        return new Array(length).fill(0).map(() => marshal.process());
    }

    encode (marshal, input) {
        if (input.length === 0) {
            return Buffer.from([ ProtocolType.ListEmpty ]);
        } else {
            let header;
            if (input.length === 1) {
                header = Buffer.from([ ProtocolType.ListOne ]);
            } else {
                let length;
                if (input.length < 0xff) {
                    length = Buffer.from([ input.length ]);
                } else {
                    const buffer = Buffer.alloc(4);
                    buffer.writeUInt32LE(input.length);
                    length = Buffer.from([ 0xff ]).concat(buffer);
                }
                header = Buffer.from([ ProtocolType.List ]).concat(length);
            }
            const results = input.map(val => marshal.processType(val));
            return header.concat(...results);
        }
    }

}

module.exports = PyList;