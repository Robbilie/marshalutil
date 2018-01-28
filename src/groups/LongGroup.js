"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyLong } = require("../types");

class LongGroup extends Group {

    static isDecoder (opcode) {
        if ([
                ProtocolType.Int64,
                ProtocolType.Long,
            ].includes(opcode))
            return true;
    }

    static getDecoder () {
        return PyLong;
    }

}

module.exports = LongGroup;