const VoiceDeviceSchema = {
	name: 'VoiceDevice',
	primaryKey: 'id',
	properties: {
	  	id:  'string',
		number: 'int',
		restaurant: 'Restaurant'
	}
}
module.exports = VoiceDeviceSchema