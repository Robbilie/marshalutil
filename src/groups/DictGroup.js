"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyDict } = require("../types");

class ListGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Dict;
    }

    static getDecoder () {
        return PyDict;
    }

}

module.exports = ListGroup;