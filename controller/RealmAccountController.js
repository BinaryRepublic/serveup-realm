'use strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');
const RealmAddressController = require('./RealmAddressController');

class RealmAccountController extends ParentRealmController {
    constructor () {
        super();
        this.className = 'Account';
        this.addressController = new RealmAddressController();
    }
    getAccounts () {
        return this.objectWithClassName(this.className);
    };
    getAccountById (id) {
        return this.objectWithId(this.className, id);
    };
    createAccount (accountJSON) {
        accountJSON.id = uuidv4();
        accountJSON.created = new Date();
        let addressObj = {
            street: accountJSON.street,
            postCode: accountJSON.postCode,
            city: accountJSON.city,
            country: accountJSON.country
        };
        let address = this.addressController.createAddress(addressObj);
        if (address) {
            accountJSON.address = address;
            return this.createObject(this.className, accountJSON);
        }
    };
    updateAccount (id, newData) {
        return this.updateObject(this.className, id, newData, []);
    };
    deleteAccount (id) {
        return this.deleteObject(this.className, id);
    };
}
module.exports = RealmAccountController;
