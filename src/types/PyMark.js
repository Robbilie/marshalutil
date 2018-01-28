"use strict";

const { PyObject } = require(".");

class PyMark extends PyObject {

    decode () {
        return this;
    }

}

module.exports = PyMark;