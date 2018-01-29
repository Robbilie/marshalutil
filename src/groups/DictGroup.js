"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyDict } = require("../types");

class DictGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Dict;
    }

    static getProcessor () {
        return PyDict;
    }

}

module.exports = DictGroup;