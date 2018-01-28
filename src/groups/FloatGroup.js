"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyFloat } = require("../types");

class FloatGroup extends Group {

    static isDecoder (opcode) {
        if ([
                ProtocolType.Float,
                ProtocolType.FloatEmpty,
            ].includes(opcode))
            return true;
    }

    static getDecoder () {
        return PyFloat;
    }

}

module.exports = FloatGroup;