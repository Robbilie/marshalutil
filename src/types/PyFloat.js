"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyFloat extends PyObject {

    decode (marshal, opcode) {
        if (opcode === ProtocolType.FloatEmpty)
            return 0;
        return marshal.getBytes(8).readDoubleLE(0);
    }

}

module.exports = PyFloat;