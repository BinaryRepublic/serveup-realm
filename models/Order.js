const OrderSchema = {
	name: 'Order',
	primaryKey: 'id',
	properties: {
	  	id:  'string',
		timestamp: 'date',
		// items: 'OrderItem',
		// amount: 'double',
		// table: 'Table',
		status: {type: 'int', default: 0}
	}
}
module.exports = OrderSchema