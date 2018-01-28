"use strict";

const { PyObject } = require(".");

class PyNone extends PyObject {

    decode () {
        return null;
    }

}

module.exports = PyNone;