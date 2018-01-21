const ProtocolType = {
	EOF			 : 0x00, //	0: End of stream
	None		 : 0x01, //	1: None
	Global		 : 0x02, //	2: usually a type, function or class object, but just the name,
						 //	   so it has to exist for this to decode properly.
	Int64		 : 0x03, //	3: 8 byte signed int
	Int32		 : 0x04, //	4: 4 byte signed int
	Int16		 : 0x05, //	5: 2 byte signed int
	Int8		 : 0x06, //	6: 1 byte signed int
	Minusone	 : 0x07, //	7: the value of -1
	Zero		 : 0x08, //	8: the value of 0
	One			 : 0x09, //	9: the value of 1
	Float		 : 0x0a, // 10: 8 byte float
	FloatEmpty	 : 0x0b, // 11: the value of 0.0
	StringLong	 : 0x0d, // 13: string, longer than 255 characters using normal count*
	StringEmpty	 : 0x0e, // 14: string, empty
	StringOne	 : 0x0f, // 15: string, 1 character
	String		 : 0x10, // 16: string, next byte is 0x00 - 0xff being the count.
	StringTable	 : 0x11, // 17: string, reference to line in strings.txt (stringTable)
	UTF16		 : 0x12, // 18: unicode string, next byte is count*
	Buffer		 : 0x13, // 19: buffer object... hmmm
	Tuple		 : 0x14, // 20: tuple, next byte is count*
	List		 : 0x15, // 21: list, next byte is count*
	Dict		 : 0x16, // 22: dict, next byte is count*
	Instance	 : 0x17, // 23: class instance, name of the class follows (as string, probably)
	Blue		 : 0x18, // 24: blue object.
	Callback	 : 0x19, // 25: callback
	Ref			 : 0x1b, // 27: shared object reference
	Checksum	 : 0x1c, // 28: checksum of rest of stream
	True		 : 0x1f, // 31: True
	False		 : 0x20, // 32: False
	Pickler		 : 0x21, // 33: standard pickle of undetermined size
	Reduce		 : 0x22, // 34: reduce protocol
	NewObj		 : 0x23, // 35: new style class object
	TupleEmpty	 : 0x24, // 36: tuple, empty
	TupleOne	 : 0x25, // 37: tuple, single element
	ListEmpty	 : 0x26, // 38: list, empty
	ListOne		 : 0x27, // 39: list, single element
	UTF16Empty	 : 0x28, // 40: unicode string, empty
	UTF16One	 : 0x29, // 41: unicode string, 1 character,
	Dbrow		 : 0x2a, // 42: database row (quite hard, custom data format)
	Stream		 : 0x2b, // 43: embedded marshal stream
	TupleTwo	 : 0x2c, // 44: tuple, 2 elements
	Mark		 : 0x2d, // 45: marker (for the NEWOBJ/REDUCE iterators that follow them)
	Utf8		 : 0x2e, // 46: UTF8 unicode string, buffer size count follows*,
	Long		 : 0x2f	 // 47: big int, byte count follows.,
};

module.exports = ProtocolType;