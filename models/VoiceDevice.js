const VoiceDeviceSchema = {
	name: 'VoiceDevice',
	primaryKey: 'id',
	properties: {
	  	id:  'string',
		number: 'int',
		restaurant: 'Restaurant',
		created: 'date'
	}
}
module.exports = VoiceDeviceSchema