
class Group {

	static getDecoder () {
		throw new Error("NotImplementedException");
	}

}

class NoneGroup extends Group {

	static getDecoder (opcode) {
		if (opcode === ProtocolType.None)
			return TYPES.PyNone;
	}

}

class BooleanGroup extends Group {

	static getDecoder (opcode) {
		if ([ProtocolType.True, ProtocolType.False].includes(opcode))
			return TYPES.PyBool;
	}

}

class RefGroup extends Group {

	static getDecoder (opcode) {

	}

}

const GROUPS = [
	NoneGroup,
	BooleanGroup,
	FloatGroup,
	IntGroup,
	LongGroup,
	TupleGroup,
	ListGroup,
	StringGroup,
];

/////////////////////////////////////////////////////////////////////////////////////////////////////

class PyObject {

	decode () {
		throw new Error("NotImplementedException");
	}

}

class RefObject {

	decode (marshal) {
		const index = marshal.getLength();
		const storage = marshal.getStorage();
		const result = storage.get(index);
		if (marshal._needObjectEx === false || result instanceof TYPES.PyObjectEx)
			return result;
		marshal._needObjectEx = false;
		for (let obj of storage) {
			if (obj instanceof TYPES.PyObjectEx) {
				return obj;
			}
		}
	}

}

class PyNone extends PyObject {

	decode () {
		return null;
	}

}

class PyBool extends PyObject {

	decode (marshal, opcode) {
		if (opcode === ProtocolConstants.True)
			return true;
		else
			return false;
	}

}

const TYPES = {
	PyObject,
	PyNone,
	PyBool,
};
