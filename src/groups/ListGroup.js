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

    static isEncoder (input) {
        return input !== undefined && input !== null && input.constructor.name === "Array" && !Object.isFrozen(input);
    }

}

module.exports = ListGroup;