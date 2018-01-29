"use strict";

const { PyObject } = require(".");
const { ProtocolType, MarshalHelper } = require("..");

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
                const length = MarshalHelper.writeLength(input.length);
                header = Buffer.from([ ProtocolType.List ]).concat(length);
            }
            const results = input.map(val => marshal.processType(val));
            return header.concat(...results);
        }
    }

}

module.exports = PyList;