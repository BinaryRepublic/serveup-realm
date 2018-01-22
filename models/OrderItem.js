const OrderItemSchema = {
	name: 'OrderItem',
	primaryKey: 'id',
	properties: {
		id:  'string',
		name: 'string',
		size: 'int',
		count: 'int'
	}
}
module.exports = OrderItemSchema