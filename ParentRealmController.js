'use strict';
const Realm = require('realm');
const Order = require('./models/Order.js');
const OrderItem = require('./models/OrderItem.js');
const Account = require('./models/Account');
const Restaurant = require('./models/Restaurant.js');
const VoiceDevice = require('./models/VoiceDevice.js');

class ParentRealmController {
	constructor(createdCallback) {
		this.createdCallback = createdCallback;
		var that = this;
		this.realm = Realm.open({
			path: './DataRealm/default.realm',
			schema: [Order, OrderItem, Account, Restaurant, Table],
		}).then(realm => {
			that.realm = realm;
			if(that.createdCallback) {
				that.createdCallback();
			}
		});
	}
}
module.exports = ParentRealmController;
