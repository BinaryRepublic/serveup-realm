'use strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');

class RealmAddressController extends ParentRealmController {
    constructor () {
        super();
        this.className = 'Address';
    }
    getAddressById (id) {
        return this.objectWithId(this.className, id);
    };
    createAddress (addressJSON) {
        addressJSON.id = uuidv4();
        addressJSON.created = new Date();
        let address = this.createObject(this.className, addressJSON);
        return address;
    };
    updateAddress (id, newData) {
        return this.updateObject(this.className, id, newData, ['street', 'postCode', 'city', 'country']);
    };
    deleteAddress (id) {
        return this.deleteObject(this.className, id);
    };
}
module.exports = RealmAddressController;
