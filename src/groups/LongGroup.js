"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyLong } = require("../types");

class LongGroup extends Group {

    static isDecoder (opcode) {
        return [
            ProtocolType.Int64,
            ProtocolType.Long,
        ].includes(opcode);
    }

    static getProcessor () {
        return PyLong;
    }

}

module.exports = LongGroup;