'use_strict'

const ParentRealmController = require('./ro-realm/ParentRealmController');

class OrderItemController extends ParentRealmController {
	constructor() {
		this.className = 'OrderItem';
	};
	createOrderItem(orderId, orderItemJSON) {
		orderItemJSON.id = uuidv4();
		orderItemJSON.orderId = orderId;
		let orderItem = this.createObject(this.className, orderItemJSON);
		return orderItem;
	};
	createItemsFromJSONArray(orderId, jsonArray) {
		var orderItems = [];
		jsonArray.forEach(function(orderItemJSON) {
			let orderItem = this.createOrderItem(orderId, orderItemJSON);
			if(orderItem) {
				orderItems.push(orderItem);
			}
		});
		return orderItems;
	};
}
module.exports = OrderItemController;
