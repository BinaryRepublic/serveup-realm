'use_strict'

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');

class RealmOrderItemController extends ParentRealmController {
	constructor() {
		super();
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
module.exports = RealmOrderItemController;