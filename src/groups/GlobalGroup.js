"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyGlobal } = require("../types");

class GlobalGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Global;
    }

    static getProcessor () {
        return PyGlobal;
    }

}

module.exports = GlobalGroup;