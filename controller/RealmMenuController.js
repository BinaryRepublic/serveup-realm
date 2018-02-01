'use strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');
const RealmRestaurantController = require('./RealmRestaurantController');

class RealmDrinkController extends ParentRealmController {
    constructor (callback) {
        super(callback);
        this.className = 'Menu';

        this.restaurantController = new RealmRestaurantController();

        let MenuHelper = require('../library/MenuHelper');
        this.menuHelper = new MenuHelper();
    }
    // --- General
    validateMenu (newMenuObj) {
        let result = this.menuHelper.validateMenu(newMenuObj);
        if (result === true) {
            return true;
        } else {
            return {
                error: result
            };
        }
    }
    // --- Get menu
    getMenuById (menuId) {
        return this.objectWithId(this.className, menuId);
    }
    getMenuByRestaurantId (restaurantId) {
        if (this.restaurantController.getRestaurantById(restaurantId)) {
            return this.objectsWithFilter(this.className, 'restaurantId == "' + restaurantId + '"');
        }
    }
    // --- Create Menu
    createMenu (newMenu) {
        let validation = this.validateMenu(newMenu);
        if (!validation.error) {
            newMenu.id = uuidv4();
            newMenu.created = new Date();
            let preparedInsert = this.menuHelper.prepareInsert(newMenu);
            return this.writeObject(this.className, preparedInsert, false);
        } else {
            return validation;
        }
    }
    // --- Updating Menu
    updateMenu (menuId, newMenuObj) {
        // validate new menu
        let validation = this.validateMenu(newMenuObj);
        if (!validation.error) {
            // prepare drinks (insert id's etc)
            let currentMenu = this.getMenuById(menuId);
            newMenuObj.id = currentMenu.id;
            newMenuObj.created = new Date();
            let preparedInsert = this.menuHelper.prepareInsert(newMenuObj);
            return this.writeObject(this.className, preparedInsert, true);
        } else {
            return validation;
        }
    }
    deleteMenu (id) {
        return this.deleteObject(this.className, id);
    }
}
module.exports = RealmDrinkController;
