"use strict";

const { PyObject } = require(".");
const { ZeroCompressOpcode } = require("../database");

class PyDbrow extends PyObject {

    decode (marshal, opcode) {
        marshal._needObjectEx = true;
        const header = marshal.process();
        marshal._needObjectEx = false;

        const raw = ZeroCompressOpcode.load(marshal);

        return this.parseRowData(header, raw);
    }

    parseRowData () {

    }

}

module.exports = PyDbrow;