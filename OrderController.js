'use_strict'

const ParentRealmController = require('./ro-realm/ParentRealmController');

class OrderController extends ParentRealmController {
	constructor() {
		this.className = 'Order';
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
	createOrder(voiceDeviceId, orrderItemsArray) {
		let voiceDevice = this.objectWithId('VoiceDevice', voiceDeviceId);
		if(voiceDevice) {
			orderJSON.id = uuidv4();
			orderJSON.created = new Date();
			orderJSON.voiceDevice = voiceDevice;
			orderJSON.restaurant = voiceDevice.restaurant;
			orrderItemsArray.forEach(element => {
				// 
			});
			let order = this.createObject(this.className, orderJSON);
			return order;
		} else {
			return;
		}
	};
	updateOrder(id, newData) {
		let order = this.updateObject(this.className, id, newData);
		return order;
	};
}
module.exports = OrderController;
