"use strict";

const { PyObject } = require("./");
const { ProtocolType } = require("../");

class PyInt extends PyObject {

    decode (marshal, opcode) {
        if (opcode === ProtocolType.Zero)
            return 0;
        if (opcode === ProtocolType.One)
            return 1;
        if (opcode === ProtocolType.Minusone)
            return -1;
    }

}

module.exports = PyInt;