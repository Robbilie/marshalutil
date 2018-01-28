"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyNone } = require("../types");

class NoneGroup extends Group {

    static isDecoder (opcode) {
        if (opcode === ProtocolType.None)
            return true;
    }

    static getDecoder () {
        return PyNone;
    }

}

module.exports = NoneGroup;