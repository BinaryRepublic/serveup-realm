'use_strict'

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');

class RealmDrinkController extends ParentRealmController {
    constructor(callback) {
        super(callback);
        this.className = 'Drink';
    }
    getDrinksByRestaurantId (restaurantId) {
        let filterString = 'layer1 == true AND restaurantId == "' + restaurantId + '"';
        return this.objectsWithFilter(this.className, filterString);
    };
    getDefaultParentByRestaurantId (restaurantId) {
        let filterString = 'restaurantId == "' + restaurantId + '"';
        return this.objectsWithFilter(this.className, filterString);
    };
}
module.exports = RealmDrinkController;
