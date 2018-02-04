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

    static decode (name, args) {
        const T = this.get(name);
        if (T.prototype.hasStateSetter === true) {
            const t = new T();
            t.state = args;
            return t;
        } else {
            return new T(args);
        }
    }

}

module.exports = InstanceHelper;