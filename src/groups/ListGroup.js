"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyList } = require("../types");

class ListGroup extends Group {

    static isDecoder (opcode) {
        return [
            ProtocolType.ListEmpty,
            ProtocolType.ListOne,
            ProtocolType.List,
        ].includes(opcode);
    }

    static getProcessor () {
        return PyList;
    }

}

module.exports = ListGroup;