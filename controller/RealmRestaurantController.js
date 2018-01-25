'use_strict'

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');
const RealmAddressController = require('./RealmAddressController');

class RealmRestaurantController extends ParentRealmController {
	constructor(callback) {
		super(callback);
		this.className = 'Restaurant';
		this.addressController = new RealmAddressController();
	}
	getRestaurant(id) {
		let restaurant = this.objectWithId(this.className, id);
		return restaurant;
	};
	getRestaurants(accountId) {
		let filterString = `account.id == '${accountId}'`;
		let restaurants = this.objectsWithFilter(this.className, filterString);
		return restaurants;
	};
	createRestaurant(accountId, restaurantJSON) {
		let ownerAccount = this.objectWithId('Account', accountId);
		if(ownerAccount) {
			restaurantJSON.id = uuidv4();
			restaurantJSON.created = new Date();
			let restaurant = this.createObject(this.className, restaurantJSON);
			return restaurant;
		} else {
			return;
		}
	};
	updateRestaurant(id, newData) {
		let restaurant = this.updateObject(this.className, id, newData, ['name', 'address', 'drinkMenus']);
		return restaurant;
	};
}
module.exports = RealmRestaurantController;