"use strict";

const { StreamBuffer } = require("..");

class ZeroCompressOpcode {

    constructor (source) {
        this.firstLength = (source & 0x07);
        this.firstIsZero = (source & 0x08) > 0;
        this.secondLength = ((source & 0x70) >> 4);
        this.secondIsZero = (source & 0x80) > 0;
    }

    static load (marshal) {
        const ret = [];
        const packedLen = marshal.getLength();

        const bytes = marshal.getBytes(packedLen);
        const stream = new StreamBuffer(bytes);

        while (stream.hasMore()) {
            const byte = stream.read(1)[0];
            const opcode = new ZeroCompressOpcode(byte);

            if (opcode.firstIsZero) {
                for (let n = 0; n < opcode.firstLength + 1; n++) {
                    ret.push(0x00);
                }
            } else {
                const btr = Math.min(8 - opcode.firstLength, packedLen - stream.index);
                for (let n = 0; n < btr; n++) {
                    ret.push(stream.read(1)[0]);
                }
            }

            if (opcode.secondIsZero) {
                for (let n = 0; n < opcode.secondLength + 1; n++) {
                    ret.push(0x00);
                }
            } else {
                const btr = Math.min(8 - opcode.secondLength, packedLen - stream.index);
                for (let n = 0; n < btr; n++) {
                    ret.push(stream.read(1)[0]);
                }
            }
        }

        return Buffer.from(ret);
    }

}

module.exports = ZeroCompressOpcode;