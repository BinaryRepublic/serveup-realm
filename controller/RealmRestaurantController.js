'use strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');

class RealmRestaurantController extends ParentRealmController {
    constructor (callback) {
        super(callback);
        this.className = 'Restaurant';
    }
    getRestaurantById (id) {
        return this.objectWithId(this.className, id);
    };
    getRestaurantsByAccountId (accountId) {
        let filterString = `accountId == '${accountId}'`;
        return this.objectsWithFilter(this.className, filterString);
    };
    createRestaurant (restaurantJSON) {
        let ownerAccount = this.objectWithId('Account', restaurantJSON.accountId);
        if (ownerAccount) {
            restaurantJSON.id = uuidv4();
            restaurantJSON.created = new Date();
            return this.createObject(this.className, restaurantJSON);
        }
    };
    updateRestaurant (id, newData) {
        return this.updateObject(this.className, id, newData, ['name', 'address']);
    };
    deleteRestaurant (id) {
        return this.deleteObject(this.className, id);
    }
}
module.exports = RealmRestaurantController;
