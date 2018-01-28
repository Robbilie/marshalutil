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

}

module.exports = PyTuple;