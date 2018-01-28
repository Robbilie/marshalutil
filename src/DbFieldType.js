"use strict";

const DbFieldType = {
    Empty		 : 0x00,
    Null		 : 0x01,
    I2			 : 0x02,
    I4			 : 0x03,
    R4			 : 0x04,
    R8			 : 0x05,
    /// <summary>
    /// Currency
    /// </summary>
    CY			 : 0x06,
    Date		 : 0x07,
    BStr		 : 0x08,
    IDispatch	 : 0x09,
    Error		 : 0x0a,
    Bool		 : 0x0b,
    Variant		 : 0x0c,
    IUnknown	 : 0x0d,
    Decimal		 : 0x0e,
    I1			 : 0x10,
    UI1			 : 0x11,
    UI2			 : 0x12,
    UI4			 : 0x13,
    I8			 : 0x14,
    UI8			 : 0x15,
    /// <summary>
    /// Win32 FILETIME 64 bit timestamp
    /// </summary>
    FileTime	 : 0x40,
    Guid		 : 0x48,
    Bytes		 : 0x80,
    Str			 : 0x81,
    WStr		 : 0x82,
    Numeric		 : 0x83,
    UDT			 : 0x84,
    DbDate		 : 0x85,
    DbTime		 : 0x86,
    DbTimestamp  : 0x87,
    HChapter	 : 0x88,
    DbFileTime	 : 0x89,
    PropVariant  : 0x8a,
    VarNumeric	 : 0x8b,
    Vector		 : 0x1000,
    Array		 : 0x2000,
    ByRef		 : 0x4000,
    Reserved	 : 0x8000
};

module.exports = DbFieldType;