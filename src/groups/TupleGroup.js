"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyTuple } = require("../types");

class TupleGroup extends Group {

    static isDecoder (opcode) {
        return [
            ProtocolType.TupleEmpty,
            ProtocolType.TupleOne,
            ProtocolType.TupleTwo,
            ProtocolType.Tuple,
        ].includes(opcode);
    }

    static getProcessor () {
        return PyTuple;
    }

}

module.exports = TupleGroup;