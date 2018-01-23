'use_strict'

const ParentRealmController = require('./ro-realm/ParentRealmController');

class RealmAccountController extends ParentRealmController {
	constructor() {
		this.className = 'Account';
	}
	getAccount(id) {
		let account = this.objectWithId(this.className, id);
		return account;
	};
	createAccount(accountJSON) {
		accountJSON.id = uuidv4();
		accountJSON.created = new Date();
		let account = this.createObject(this.className, accountJSON);
		return account;
	};
	updateAccount(id, newData) {
		let account = this.updateObject(this.className, id, newData);
		return account;
	};
}
module.exports = RealmAccountController;