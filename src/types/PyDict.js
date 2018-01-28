"use strict";

const { PyObject } = require(".");

class PyDict extends PyObject {

    decode (marshal, opcode) {
        const length = marshal.getLength();
        return new Array(length).fill(0).reduce((p) => {
            const value = marshal.process();
            const key = marshal.process();
            p[key] = value;
            return p;
        }, {});
    }

}

module.exports = PyDict;