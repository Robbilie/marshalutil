"use strict";

class Group {

    static isDecoder () {
        return false;
    }

    static getDecoder () {
        throw new Error("NotImplementedException");
    }

}

module.exports = Group;