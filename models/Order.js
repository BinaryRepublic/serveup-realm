const OrderSchema = {
	name: 'Order',
	primaryKey: 'id',
	properties: {
	  	id:  'string',
		timestamp: 'date',
		items: 'OrderItem',
		amount: 'double',
		voiceDevice: 'VoiceDevice',
		restaurant: 'Restaurant',
		status: {type: 'int', default: 0}
	}
}
module.exports = OrderSchema