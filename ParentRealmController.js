'use strict';
const Realm = require('realm');
const Order = require('./models/Order.js');
const OrderItem = require('./models/OrderItem.js');
const Account = require('./models/Account');
const Restaurant = require('./models/Restaurant.js');
const VoiceDevice = require('./models/VoiceDevice.js');

class ParentRealmController {
	constructor(createdCallback) {
		this.Order = Order;
		this.OrderItem = OrderItem;
		this.Account = Account;
		this.Restaurant = Restaurant;
		this.VoiceDevice = VoiceDevice;

		this.createdCallback = createdCallback;
		var that = this;
		this.realm = Realm.open({
			path: './DataRealm/default.realm',
			schema: [Order, OrderItem, Account, Restaurant, VoiceDevice],
		}).then(realm => {
			that.realm = realm;
			if(that.createdCallback) {
				that.createdCallback();
			}
		});
	};

	// Abstract methods
	objectWithId(className, id) {
		let object = this.realm.objects(className).filtered('id = $0', id);
		return object;
	};
	objectsWithFilter(className, filter) {
		let objects = this.realm.objects(className).filtered(filter);
		return objects;
	};
	createObject(className, objData) {
		let object;
		if(this.valid(className, objData)) {
			object = this.writeObject(this.className, objData, false);
		}
		return object;
	};
	updateObject(className, objectId, objData) {
		objData.id = objectId;
		let object;
		if(this.valid(className, objData)) {
			object = this.writeObject(className, objData, true);
		}
		return object;
	};

	// Validation
	valid(className, obj) {
		let realmSchema = this[className];
		var valid = true;
		for(var property in realmSchema.properties) {
			if (!obj.hasOwnProperty(property)) {
				valid = false;
				console.error("MISSING: " + property + " in " + className);
				break;
    		}
		}
		return valid;
	}

	// Realm methods
	writeObject(className, obj, update) {
		var created;
		try {
			this.realm.write(() => {
				created = this.realm.create(className, obj, update);
			});
		} catch (e) {
			console.log('Error on creation: ' + e);
			console.log(className + ' -> ' + JSON.stringify(obj));
		}
		return created;
	};
}
module.exports = ParentRealmController;
