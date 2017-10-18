const { DbFieldType } = require("../");

class FieldTypeHelper {

	static GetTypeBits (type) {
		switch (type) {
			case DbFieldType.I8:
			case DbFieldType.UI8:
			case DbFieldType.R8:
			case DbFieldType.CY:
			case DbFieldType.FileTime:
				return 64;

			case DbFieldType.I4:
			case DbFieldType.UI4:
			case DbFieldType.R4:
				return 32;

			case DbFieldType.I2:
			case DbFieldType.UI2:
				return 16;

			case DbFieldType.I1:
			case DbFieldType.UI1:
				return 8;

			case DbFieldType.Bool:
				return 1;

			case DbFieldType.Bytes:
			case DbFieldType.Str:
			case DbFieldType.WStr:
				// Handled differently
				return 0;

			default:
				throw new Error(`NotImplementedException: Cannot parse ${type}!`);
		}
	}

}

module.exports = FieldTypeHelper;