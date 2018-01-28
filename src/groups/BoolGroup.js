"use strict";

const { Group } = require("./");
const { ProtocolType } = require("../");
const { PyBool } = require("../types/");

class BoolGroup extends Group {

    static isDecoder (opcode) {
        if ([ProtocolType.True, ProtocolType.False].includes(opcode))
            return true;
    }

    static getDecoder () {
        return PyBool;
    }

}

module.exports = BoolGroup;