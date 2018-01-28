"use strict";

const { Group } = require("./");
const { ProtocolType } = require("../");
const { PyNone } = require("../types/");

class NoneGroup extends Group {

    static getDecoder (opcode) {
        if (opcode === ProtocolType.None)
            return PyNone;
    }

}

module.exports = NoneGroup;