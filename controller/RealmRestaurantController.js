'use_strict'

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');

class RealmRestaurantController extends ParentRealmController {
	constructor() {
		super();
		this.className = 'Restaurant';
	}
	getRestaurant(id) {
		let restaurant = this.objectWithId(this.className, id);
		return restaurant;
	};
	getRestaurants(accountId) {
		let filterString = `account.id = ${accountId}`;
		let restaurants = this.objectsWithFilter(this.className, filterString);
		return restaurants;
	};
	createRestaurant(accountId, restaurantJSON) {
		let ownerAccount = this.objectWithId('Account', accountId);
		if(ownerAccount) {
			restaurantJSON.id = uuidv4();
			restaurantJSON.created = new Date();
			restaurantJSON.account = ownerAccount;
			let restaurant = this.createObject(this.className, restaurantJSON);
			return restaurant;
		} else {
			return;
		}
	};
	updateRestaurant(id, newData) {
		let restaurant = this.updateObject(this.className, id, newData);
		return restaurant;
	};
}
module.exports = RealmRestaurantController;