"use strict";

const { PyObject, PyObjectEx } = require(".");

class PyRef extends PyObject {

    decode (marshal, opcode) {
        const index = marshal.getLength();
        const storage = marshal.getStorage();
        const result = storage.get(index);
        if (marshal._needObjectEx === false || result instanceof PyObjectEx)
            return result;
        for (let obj of storage) {
            if (obj instanceof PyObjectEx) {
                return obj;
            }
        }
    }

}

module.exports = PyRef;