"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyList } = require("../types");

class ListGroup extends Group {

    static isDecoder (opcode) {
        if ([
                ProtocolType.ListEmpty,
                ProtocolType.ListOne,
                ProtocolType.List,
            ].includes(opcode))
            return true;
    }

    static getDecoder () {
        return PyList;
    }

}

module.exports = ListGroup;