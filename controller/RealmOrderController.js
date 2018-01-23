'use_strict'

const ParentRealmController = require('./ro-realm/ParentRealmController');
const RealmOrderItemController = require('./RealmOrderItemController');

class RealmOrderController extends ParentRealmController {
	constructor() {
		this.className = 'Order';
		this.orderItemController = new RealmOrderItemController();
	}
	getOrder(id) {
		let order = this.objectWithId(this.className, id);
		return order;
	};
	getOrders(restaurantId) {
		let filterString = `Restaurant.id = ${restaurantId}`;
		let orders = this.objectsWithFilter(this.className, filterString);
		return orders;
	};
	createOrder(voiceDeviceId, orderItemsArray) {
		let voiceDevice = this.objectWithId('VoiceDevice', voiceDeviceId);
		if(voiceDevice) {
			orderJSON.id = uuidv4();
			orderJSON.created = new Date();
			orderJSON.voiceDevice = voiceDevice;
			orderJSON.restaurant = voiceDevice.restaurant;
			orderJSON.items = this.orderItemController.createItemsFromJSONArray(orderJSON.id, orderItemsArray);
			let order = this.createObject(this.className, orderJSON);
			return order;
		} else {
			return;
		};
	};
	updateOrder(id, newData) {
		let order = this.updateObject(this.className, id, newData);
		return order;
	};
}
module.exports = RealmOrderController;
