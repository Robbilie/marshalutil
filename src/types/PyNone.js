"use strict";

const { PyObject } = require(".");
const { ProtocolType } = require("..");

class PyNone extends PyObject {

    decode () {
        return null;
    }

    encode () {
        return Buffer.from([ ProtocolType.None ]);
    }

}

module.exports = PyNone;