"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyBool extends PyObject {

    decode (marshal, opcode) {
        return opcode === ProtocolType.True;
    }

    encode (marshal, input) {
        return Buffer.from([ input === true ? ProtocolType.True : ProtocolType.False ]);
    }

}

module.exports = PyBool;