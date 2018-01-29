"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyTuple extends PyObject {

    decode (marshal, opcode) {
        let length = 0;
        if (opcode === ProtocolType.TupleOne) {
            length = 1;
        } else if (opcode === ProtocolType.TupleTwo) {
            length = 2;
        } else if (opcode === ProtocolType.Tuple) {
            length = marshal.getLength();
        }
        const tuple = new Array(length).fill(0).map(() => marshal.process());
        return Object.freeze(tuple);
    }

    encode (marshal, input) {
        if (input.length === 0) {
            return Buffer.from([ ProtocolType.TupleEmpty ]);
        } else {
            let header;
            if (input.length === 1) {
                header = Buffer.from([ ProtocolType.TupleOne ]);
            } else if (input.length === 2) {
                header = Buffer.from([ ProtocolType.TupleTwo]);
            } else {
                let length;
                if (input.length < 0xff) {
                    length = Buffer.from([ input.length ]);
                } else {
                    const buffer = Buffer.alloc(4);
                    buffer.writeUInt32LE(input.length);
                    length = Buffer.from([ 0xff ]).concat(buffer);
                }
                header = Buffer.from([ ProtocolType.Tuple ]).concat(length);
            }
            const results = input.map(val => marshal.processType(val));
            return header.concat(...results);
        }
    }

}

module.exports = PyTuple;