"use strict";

class IntValue {

    static get (type) {
        if (type === null || type === false)
            return 0;
        if (type === true)
            return 1;
        return type;
    }

}

module.exports = IntValue;