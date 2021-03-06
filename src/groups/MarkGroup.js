"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyMark } = require("../types");

class MarkGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Mark;
    }

    static getProcessor () {
        return PyMark;
    }

}

module.exports = MarkGroup;