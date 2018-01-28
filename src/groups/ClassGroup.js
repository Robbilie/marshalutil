"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyDbrow } = require("../types");

class ClassGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Dbrow;
    }

    static getDecoder () {
        return PyDbrow;
    }

}

module.exports = ClassGroup;