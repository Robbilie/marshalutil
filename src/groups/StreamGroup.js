"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyStream } = require("../types");

class StreamGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Stream;
    }

    static getProcessor () {
        return PyStream;
    }

}

module.exports = StreamGroup;