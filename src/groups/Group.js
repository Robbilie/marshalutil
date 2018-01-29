"use strict";

class Group {

    static isDecoder () {
        return false;
    }

    static getProcessor () {
        throw new Error("NotImplementedException");
    }

    static isEncoder () {
        return false;
    }

}

module.exports = Group;