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

}

module.exports = PyList;