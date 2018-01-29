"use strict";

class Group {

    static isDecoder () {
        return false;
    }

    static getProcessor () {
        throw new Error("NotImplementedException");
    }

}

module.exports = Group;