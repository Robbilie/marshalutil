"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyNone } = require("../types");

class NoneGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.None;
    }

    static getProcessor () {
        return PyNone;
    }

}

module.exports = NoneGroup;