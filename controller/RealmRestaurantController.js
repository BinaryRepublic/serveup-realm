'use strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');
const RealmAddressController = require('./RealmAddressController');

class RealmRestaurantController extends ParentRealmController {
    constructor (callback) {
        super(callback);
        this.className = 'Restaurant';
        this.addressController = new RealmAddressController();
    }
    getRestaurant (id) {
        return this.objectWithId(this.className, id);
    };
    getRestaurants (accountId) {
        let filterString = `account.id == '${accountId}'`;
        return this.objectsWithFilter(this.className, filterString);
    };
    createRestaurant (accountId, restaurantJSON) {
        let ownerAccount = this.objectWithId('Account', accountId);
        if (ownerAccount) {
            restaurantJSON.id = uuidv4();
            restaurantJSON.created = new Date();
            return this.createObject(this.className, restaurantJSON);
        } else {

        }
    };
    updateRestaurant (id, newData) {
        return this.updateObject(this.className, id, newData, ['name', 'address', 'drinkMenus']);
    };
}
module.exports = RealmRestaurantController;
