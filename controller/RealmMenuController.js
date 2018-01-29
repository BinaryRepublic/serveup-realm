'use strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');

class RealmDrinkController extends ParentRealmController {
    constructor (callback) {
        super(callback);
        this.className = 'Menu';

        let MenuHelper = require('../library/MenuHelper');
        this.menuHelper = new MenuHelper();
    }
    // --- Get menu
    getMenuById (menuId) {
        let menu = this.objectWithId(this.className, menuId);
        menu.drinks = this.objectsWithFilter();
        return menu;
    }
    // --- Create Menu
    createMenu (newMenu) {
        if (this.validateMenu) {
            newMenu.id = uuidv4();
            newMenu.created = new Date();

            let preparedInsert = this.menuHelper.prepareInsert(newMenu);
            return this.writeObject(this.className, preparedInsert, false);
        }
    }
    // --- Updating Menu
    validateMenu (newMenuObj) {
        let result = this.menuHelper.validateMenu(newMenuObj);
        if (result === true) {
            return true;
        } else {
            result.forEach((errorItem) => {
                console.log(errorItem);
            });
        }
    }
    updateMenu (menuId, newMenuObj) {
        // validate new menu
        if (this.validateMenu(newMenuObj)) {
            // prepare drinks (insert id's etc)
            let preparedInsert = this.menuHelper.prepareInsert(newMenuObj);
            /*
            let currentMenu = this.getMenuById(menuId);
            let written = this.writeObject(this.className, preparedInsert, false);
            if (written) {
                this.realm.delete(currentMenu);
                return written;
            } */
        }
    }
}
module.exports = RealmDrinkController;
