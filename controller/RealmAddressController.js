'use_strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');

class RealmAddressController extends ParentRealmController {
    constructor () {
        super();
        this.className = 'Address';
    }
    getAddressById (id) {
        let address = this.objectWithId(this.className, id);
        return address;
    };
    createAddress (addressJSON) {
        addressJSON.id = uuidv4();
        addressJSON.created = new Date();
        let address = this.createObject(this.className, addressJSON);
        return address;
    };
    updateAddressWithId (id, newData) {
        let address = this.updateObject(this.className, id, newData, ['street', 'postCode', 'city', 'country']);
        return address;
    };
}
module.exports = RealmAddressController;
