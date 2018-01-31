"use strict";

const nameToClass = new Map();

class InstanceHelper {

    static has (name) {
        return nameToClass.has(name);
    }

    static get (name) {
        return nameToClass.get(name);
    }

    static add (name, T) {
        if (T === undefined)
            return nameToClass.set(name.prototype.__guid__, name);
        else
            return nameToClass.set(name, T);
    }

    static all () {
        return nameToClass;
    }

}

module.exports = InstanceHelper;