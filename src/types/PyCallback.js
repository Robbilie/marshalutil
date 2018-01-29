"use strict";

const { PyObject } = require(".");

class PyCallback extends PyObject {

    decode (marshal, opcode) {
        return marshal.process();
    }

}

module.exports = PyCallback;