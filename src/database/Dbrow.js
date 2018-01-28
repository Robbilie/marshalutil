"use strict";

const { Column, IntValue, FieldTypeHelper } = require(".");
const { StreamBuffer, DbFieldType } = require("..");
const { PyObjectEx } = require("../types");

class Dbrow {

    static parse (marshal, header, data) {

        if (!(header instanceof PyObjectEx))
            throw new Error("WrongInstance");

        const tup = header.header;
        if (!Object.isFrozen(tup) || tup.length < 2)
            throw new Error(JSON.stringify(tup));

        let columns = tup[1];
        if (!Object.isFrozen(columns))
            throw new Error(JSON.stringify(tup));

        columns = columns[0];
        if (!Object.isFrozen(columns))
            throw new Error(JSON.stringify(tup));

        let newcolumns = [];
        for (let obj of columns) {
            let fieldData = obj;
            if (!Object.isFrozen(fieldData) || fieldData.length < 2)
                continue;

            let name = fieldData[0];
            if (typeof(name) !== "string")
                continue;

            newcolumns.push(new Column(name, IntValue.get(fieldData[1])));
        }

        let groups = [];
        newcolumns.forEach(column => {
            let bits = FieldTypeHelper.getTypeBits(column.type);
            if (!groups[bits])
                groups[bits] = [];
            groups[bits].push(column);
        });

        let sizeList = [];
        groups.reverse().forEach(group => sizeList = sizeList.concat(group));

        let sizeSum = newcolumns.reduce((sum, obj) => sum + FieldTypeHelper.getTypeBits(obj.type), 0);

        sizeSum = (sizeSum + 7) >> 3;

        let rawStream = Buffer.alloc(data.length + (sizeSum - data.length), 0);
        data.copy(rawStream, 0);

        const reader = new StreamBuffer(rawStream);

        let bitOffset = 0;
        for (let column of sizeList) {
            switch (column.type) {
                case DbFieldType.I8:
                case DbFieldType.UI8:
                case DbFieldType.CY:
                case DbFieldType.FileTime:
                    column.value = reader.readUIntLE(8);
                    break;
                case DbFieldType.I4:
                case DbFieldType.UI4:
                    column.value = reader.readUIntLE(4);
                    break;
                case DbFieldType.I2:
                case DbFieldType.UI2:
                    column.value = reader.readUIntLE(2);
                    break;
                case DbFieldType.I1:
                case DbFieldType.UI1:
                    column.value = reader.readUIntLE(1);
                    break;
                case DbFieldType.R8:
                    column.value = reader.readDoubleLE();
                    break;
                case DbFieldType.R4:
                    column.value = reader.readFloatLE();
                    break;
                case DbFieldType.Bytes:
                case DbFieldType.Str:
                case DbFieldType.WStr:
                    column.value = marshal.process();
                    break;
                case DbFieldType.Bool: {
                    if (7 < bitOffset) {
                        bitOffset = 0;
                        reader.read(1);
                    }

                    let b = reader.readUIntLE(1);
                    reader.seek(-1);
                    column.value = ((b >> bitOffset++) & 0x01);
                    break;
                }
                default:
                    throw new Error(`InvalidOperationException: Unable to parse ${column.type}`);
            }

        }

        return new Map(sizeList.map(column => [column.name, column.value]));

    }

}

module.exports = Dbrow;