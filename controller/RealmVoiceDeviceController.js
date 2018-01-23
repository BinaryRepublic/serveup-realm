'use_strict'

const ParentRealmController = require('./ro-realm/ParentRealmController');

class RealmVoiceDeviceController extends ParentRealmController {
	constructor() {
		this.className = 'VoiceDevice';
	}
	getVoiceDevice(id) {
		let voiceDevice = this.objectWithId(this.className, id);
		return voiceDevice;
	};
	getVoiceDevices(restaurantId) {
		let filterString = `Restaurant.id = ${restaurantId}`;
		let voiceDevices = this.objectsWithFilter(this.className, filterString);
		return voiceDevices;
	};
	createVoiceDevice(restaurantId, voiceDeviceJSON) {
		let restaurant = this.objectWithId('Restaurant', restaurantId);
		if(restaurant) {
			voiceDeviceJSON.id = uuidv4();
			voiceDeviceJSON.created = new Date();
			voiceDeviceJSON.restaurant = restaurant;
			let voiceDevice = this.createObject(this.className, voiceDeviceJSON);
			return voiceDevice;
		} else {
			return;
		}
	};
	updateVoiceDevice(id, newData) {
		let voiceDevice = this.updateObject(this.className, id, newData);
		return voiceDevice;
	};
}
module.exports = RealmVoiceDeviceController;
