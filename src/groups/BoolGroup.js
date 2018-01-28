"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyBool } = require("../types");

class BoolGroup extends Group {

    static isDecoder (opcode) {
        return [
            ProtocolType.True,
            ProtocolType.False,
        ].includes(opcode);
    }

    static getDecoder () {
        return PyBool;
    }

}

module.exports = BoolGroup;