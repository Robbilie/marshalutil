const ProtocolConstants = {};

ProtocolConstants.ProtocolId = 0x7e;
ProtocolConstants.SharedFlag = 0x40;
ProtocolConstants.ZlibMarker = 0x78;
ProtocolConstants.PacketHeader = Buffer.from([ ProtocolConstants.ProtocolId, 0x00, 0x00, 0x00, 0x00 ]);
ProtocolConstants.StringTable = [
	null,
	"*corpid",
	"*locationid",
	"age",
	"Asteroid",
	"authentication",
	"ballID",
	"beyonce",
	"bloodlineID",
	"capacity",
	"categoryID",
	"character",
	"characterID",
	"characterName",
	"characterType",
	"charID",
	"chatx",
	"clientID",
	"config",
	"contraband",
	"corporationDateTime",
	"corporationID",
	"createDateTime",
	"customInfo",
	"description",
	"divisionID",
	"DoDestinyUpdate",
	"dogmaIM",
	"EVE System",
	"flag",
	"foo.SlimItem",
	"gangID",
	"Gemini",
	"gender",
	"graphicID",
	"groupID",
	"header",
	"idName",
	"invbroker",
	"itemID",
	"items",
	"jumps",
	"line",
	"lines",
	"locationID",
	"locationName",
	"macho.CallReq",
	"macho.CallRsp",
	"macho.MachoAddress",
	"macho.Notification",
	"macho.SessionChangeNotification",
	"modules",
	"name",
	"objectCaching",
	"objectCaching.CachedObject",
	"OnChatJoin",
	"OnChatLeave",
	"OnChatSpeak",
	"OnGodmaShipEffect",
	"OnItemChange",
	"OnModuleAttributeChange",
	"OnMultiEvent",
	"orbitID",
	"ownerID",
	"ownerName",
	"quantity",
	"raceID",
	"RowClass",
	"securityStatus",
	"Sentry Gun",
	"sessionchange",
	"singleton",
	"skillEffect",
	"squadronID",
	"typeID",
	"used",
	"userID",
	"util.CachedObject",
	"util.IndexRowset",
	"util.Moniker",
	"util.Row",
	"util.Rowset",
	"*multicastID",
	"AddBalls",
	"AttackHit3",
	"AttackHit3R",
	"AttackHit4R",
	"DoDestinyUpdates",
	"GetLocationsEx",
	"InvalidateCachedObjects",
	"JoinChannel",
	"LSC",
	"LaunchMissile",
	"LeaveChannel",
	"OID+",
	"OID-",
	"OnAggressionChange",
	"OnCharGangChange",
	"OnCharNoLongerInStation",
	"OnCharNowInStation",
	"OnDamageMessage",
	"OnDamageStateChange",
	"OnEffectHit",
	"OnGangDamageStateChange",
	"OnLSC",
	"OnSpecialFX",
	"OnTarget",
	"RemoveBalls",
	"SendMessage",
	"SetMaxSpeed",
	"SetSpeedFraction",
	"TerminalExplosion",
	"address",
	"alert",
	"allianceID",
	"allianceid",
	"bid",
	"bookmark",
	"bounty",
	"channel",
	"charid",
	"constellationid",
	"corpID",
	"corpid",
	"corprole",
	"damage",
	"duration",
	"effects.Laser",
	"gangid",
	"gangrole",
	"hqID",
	"issued",
	"jit",
	"languageID",
	"locationid",
	"machoVersion",
	"marketProxy",
	"minVolume",
	"orderID",
	"price",
	"range",
	"regionID",
	"regionid",
	"role",
	"rolesAtAll",
	"rolesAtBase",
	"rolesAtHQ",
	"rolesAtOther",
	"shipid",
	"sn",
	"solarSystemID",
	"solarsystemid",
	"solarsystemid2",
	"source",
	"splash",
	"stationID",
	"stationid",
	"target",
	"userType",
	"userid",
	"volEntered",
	"volRemaining",
	"weapon",
	"agent.missionTemplatizedContent_BasicKillMission",
	"agent.missionTemplatizedContent_ResearchKillMission",
	"agent.missionTemplatizedContent_StorylineKillMission",
	"agent.missionTemplatizedContent_GenericStorylineKillMission",
	"agent.missionTemplatizedContent_BasicCourierMission",
	"agent.missionTemplatizedContent_ResearchCourierMission",
	"agent.missionTemplatizedContent_StorylineCourierMission",
	"agent.missionTemplatizedContent_GenericStorylineCourierMission",
	"agent.missionTemplatizedContent_BasicTradeMission",
	"agent.missionTemplatizedContent_ResearchTradeMission",
	"agent.missionTemplatizedContent_StorylineTradeMission",
	"agent.missionTemplatizedContent_GenericStorylineTradeMission",
	"agent.offerTemplatizedContent_BasicExchangeOffer",
	"agent.offerTemplatizedContent_BasicExchangeOffer_ContrabandDemand",
	"agent.offerTemplatizedContent_BasicExchangeOffer_Crafting",
	"agent.LoyaltyPoints",
	"agent.ResearchPoints",
	"agent.Credits",
	"agent.Item",
	"agent.Entity",
	"agent.Objective",
	"agent.FetchObjective",
	"agent.EncounterObjective",
	"agent.DungeonObjective",
	"agent.TransportObjective",
	"agent.Reward",
	"agent.TimeBonusReward",
	"agent.MissionReferral",
	"agent.Location",
	"agent.StandardMissionDetails",
	"agent.OfferDetails",
	"agent.ResearchMissionDetails",
	"agent.StorylineMissionDetails",
	"#196",
	"#197",
	"#198",
	"#199",
	"#200",
	"#201",
	"#202",
	"#203",
	"#204",
	"#205",
	"#206",
	"#207",
	"#208",
	"#209",
	"#210",
	"#211",
	"#212",
	"#213",
	"#214",
	"#215",
	"#216",
	"#217",
	"#218",
	"#219",
	"#220",
	"#221",
	"#222",
	"#223",
	"#224",
	"#225",
	"#226",
	"#227",
	"#228",
	"#229",
	"#230",
	"#231",
	"#232",
	"#233",
	"#234",
	"#235",
	"#236",
	"#237",
	"#238",
	"#239",
	"#240",
	"#241",
	"#242",
	"#243",
	"#244",
	"#245",
	"#246",
	"#247",
	"#248",
	"#249",
	"#250",
	"#251",
	"#252",
	"#253",
	"#254",
	"#255"
];

/////////////////////////////////////////////////////////////////////////////////////////////////////

class StreamBuffer {

	constructor (buffer) {
		this._buffer = buffer;
		this._index = 0;
	}

	read (bytesToRead) {
		return this.getBuffer().slice(this._index, this._index += bytesToRead);
	}

	rewind () {
		this._index = 0;
	}

	get length () {
		return this.getBuffer().length;
	}

	getBuffer () {
		return this._buffer;
	}

	slice (start) {
		return this.getBuffer().slice(start);
	}

	readUInt32LE () {
		return this.read(4).readUInt32LE();
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////

class Storage {

	constructor (size, data) {
		this._storage = {};
		this._index = 0;
		this._map = this.setup(size, data);
	}

	setup (size, data) {
		const stream = new StreamBuffer(data);
		const map = {};
		for (let i = 0; i < size; i++) {
			map[i] = stream.readUInt32LE();
		}
		return map;
	}

	store (obj) {
		let index = this.getMap()[this._index++];
		if (index === 0)
			index = 1;
		if (index > 0)
			this.set(index, obj);
	}

	set (index, obj) {
		this._storage[index] = obj;
	}

	get (index) {
		return this._storage[index - 1] || this._storage[this._map[index - 1] - 1];
	}

	getMap () {
		return this._map;
	}

	[Symbol.iterator] () {
		return Object.values(this._storage);
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////

class MarshalStreamValidator {

	static validate (buffer) {
		let data = buffer;
		if (!(data instanceof Buffer))
			throw new Error("InvalidTypeException: Not a Buffer");
		if (data === null || data.length === 0)
			throw new Error("ArgumentNullException");
		if (data[0] === ProtocolConstants.ZlibMarker)
			data = Zlib.decompress(data);
		if (data[0] !== ProtocolConstants.ProtocolId)
			throw new Error("ArgumentException: Invalid stream header");
		return data;
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////

class MarshalStream {

	constructor (buffer) {
		this._initialized = false;
		this._output = null;
		this._needObjectEx = false;
		this._stream = this.createStream(buffer);
		this._storage = this.setupStorage();
	}

	createStream (buffer) {
		const data = MarshalStreamValidator.validate(buffer);
		return new StreamBuffer(data);
	}

	setupStorage () {
		const size = this.getInt(4);
		const data = this.getStream().slice(size);
		return new Storage(size, data);
	}

	get value () {
		if (this._initialized === false)
			this._output = this.process();
		return this._output;
	}

	process () {
		const { opcode, shared } = this.getTypeAndShared();
		const result = this.processType(opcode);
		if (shared === true)
			this.storeResult(result);
		return result;
	}

	processType (opcode) {
		const decoder = this.getDecoder(opcode);
		if (decoder === undefined)
			throw new Error(`MissingDecoderException: 0x${opcode.toString(16).padStart(2, "0")}`)
		return this.decode(decoder, opcode);
	}

	getDecoder (opcode) {
		return GROUPS.find(processor => processor.getDecoder(opcode));
	}

	decode (T, opcode) {
		const instance = new T();
		return instance.decode(this, opcode);
	}

	storeResult (result) {
		this.getStorage().store(result);
	}

	getTypeAndShared () {
		let opcode = this.getInt(1);
		let shared = (opcode & ProtocolConstants.SharedFlag) === ProtocolConstants.SharedFlag;
			opcode &= ~ProtocolConstants.SharedFlag;
		return { opcode, shared };
	}
	
	getInt (bytesToRead = 1) {
		const bytes = Buffer.alloc(4);
		this.getBytes(bytesToRead).copy(bytes);
		return bytes.readUInt32LE();
	}

	getBytes (bytesToRead) {
		return this.getStream().read(bytesToRead);
	}


	getLength () {
		let length = this.getInt(1);
		if (length === 0xff)
			length = this.getInt(4);
		return length;
	}

	getStream () {
		return this._stream;
	}

	getStorage () {
		return this._storage;
	}

}

/////////////////////////////////////////////////////////////////////////////////////////////////////

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
