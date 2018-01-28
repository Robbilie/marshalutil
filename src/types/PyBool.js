"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyBool extends PyObject {

    decode (marshal, opcode) {
        return opcode === ProtocolType.True;
    }

}

module.exports = PyBool;