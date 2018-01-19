"use strict";
const Realm = require("realm");
const Order = require("./models/Order.js");
const OrderItem = require("./models/OrderItem.js");
const Table = require("./models/Table.js");
const Restaurant = require("./models/Restaurant.js");

class ParentRealmController {
	constructor(createdCallback) {
		var that = this;
		this.realm = Realm.open({
			path: "../DataRealm/default.realm",
			schema: [Order, OrderItem, Table, Restaurant],
		}).then(realm => {
			that.realm = realm;
			if(createdCallback) {
				createdCallback();
			}
		});
	}
}
module.exports = ParentRealmController;
