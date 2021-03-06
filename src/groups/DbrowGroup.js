"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyDbrow } = require("../types");

class DbrowGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Dbrow;
    }

    static getProcessor () {
        return PyDbrow;
    }

}

module.exports = DbrowGroup;