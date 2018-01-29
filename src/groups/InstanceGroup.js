"use strict";

const { Group } = require(".");
const { ProtocolType } = require("..");
const { PyInstance } = require("../types");

class InstanceGroup extends Group {

    static isDecoder (opcode) {
        return opcode === ProtocolType.Instance;
    }

    static getProcessor () {
        return PyInstance;
    }

}

module.exports = InstanceGroup;