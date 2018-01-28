"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyLong extends PyObject {

    decode (marshal, opcode) {
        let length = 8;
        if (opcode === ProtocolType.Long)
            length = marshal.getLength();
        return marshal.getBytes(8).readUIntLE(0, length);
    }

}

module.exports = PyLong;