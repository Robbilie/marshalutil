"use strict";

const { PyObject } = require(".");
const { ProtocolType, MarshalHelper } = require("..");

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
        return tuple.freeze();
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
                const length = MarshalHelper.writeLength(input.length);
                header = Buffer.from([ ProtocolType.Tuple ]).concat(length);
            }
            const results = input.map(val => marshal.processType(val));
            return header.concat(...results);
        }
    }

}

module.exports = PyTuple;