'use_strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');
const RealmAddressController = require('./RealmAddressController');

class RealmAccountController extends ParentRealmController {
    constructor () {
        super();
        this.className = 'Account';
        this.addressController = new RealmAddressController();
    }
    getAccount (id) {
        return this.objectWithId(this.className, id);
    };
    createAccount (accountJSON) {
        accountJSON.id = uuidv4();
        accountJSON.created = new Date();
        var addressObj = {
            street: accountJSON.street,
            postCode: accountJSON.postCode,
            city: accountJSON.city,
            country: accountJSON.country
        };
        var address = this.addressController.createAddress(addressObj);
        if (address) {
            accountJSON.address = address;
            let account = this.createObject(this.className, accountJSON);
            return account;
        }
    };
    updateAccount (id, newData) {
        return this.updateObject(this.className, id, newData, []);
    };
}
module.exports = RealmAccountController;
