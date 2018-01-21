const OrderItemSchema = {
	name: "OrderItem",
	properties: {
		id:  "string",
		name: "string",
		size: "int",
		count: "int"
	}
}
module.exports = OrderItemSchema