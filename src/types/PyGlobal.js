"use strict";

const { PyObject } = require(".");

class PyGlobal extends PyObject {

    decode (marshal, opcode) {
        const length = marshal.getLength();
        const buffer = marshal.getBytes(length);
        const str = buffer.toString();
        if (str.isASCII()) {
            return str;
        } else {
            return buffer;
        }
    }

}

module.exports = PyGlobal;