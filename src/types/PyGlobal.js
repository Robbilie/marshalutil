"use strict";

const { ProtocolType } = require("..");
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

    encode (marshal, input) {
        return Buffer.from([ ProtocolType.Global, input.valueOf().length ]).concat(input.valueOf());
    }

}

module.exports = PyGlobal;