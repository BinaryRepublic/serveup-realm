'use_strict'

const ParentRealmController = require('./ro-realm/ParentRealmController');

class RealmRestaurantController extends ParentRealmController {
	constructor() {
		this.className = 'Restaurant';
	}
	getRestaurant(id) {
		let restaurant = this.objectWithId(this.className, id);
		return restaurant;
	};
	getRestaurants(accountId) {
		let filterString = `Account.id = ${accountId}`;
		let restaurants = this.objectsWithFilter(this.className, filterString);
		return restaurants;
	};
	createRestaurant(accountId, restaurantJSON) {
		let ownerAccount = this.objectWithId('Account', accountId);
		if(ownerAccount) {
			restaurantJSON.id = uuidv4();
			restaurantJSON.created = new Date();
			restaurantJSON.owner = ownerAccount;
			let restaurant = this.createObject(this.className, restaurantJSON);
			return restaurant;
		} else {
			return;
		}
	};
	updateAccount(id, newData) {
		let account = this.updateObject(this.className, id, newData);
		return account;
	};
}
module.exports = RealmRestaurantController;