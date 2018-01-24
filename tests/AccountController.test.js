'use strict'

const RealmAccountController = require('../controller/RealmAccountController')
const expect = require('chai').expect

var account;

describe('RealmAccountController', () => {
	it('Create object and check methods', () => {
		const controller = new RealmAccountController();
		expect(controller.getAccount).to.be.a('Function')
		expect(controller.createAccount).to.be.a('Function')
		expect(controller.updateAccount).to.be.a('Function')
	})
	describe('Valid Data', () => {
		it('createAccount', (done) => {
			const controller = new RealmAccountController();
			controller.realm.then(realm => {
				const accountMock = require('./mockData/account/createValid.json')
				account = controller.createAccount(accountMock);
	
				expect(account.mail).to.equal(accountMock.mail);
				expect(account.password).to.equal(accountMock.password);
				expect(account.firstName).to.equal(accountMock.firstName);
				expect(account.surname).to.equal(accountMock.surname);
				expect(account.street).to.equal(accountMock.street);
				expect(account.postCode).to.equal(accountMock.postCode);
				expect(account.city).to.equal(accountMock.city);
				expect(account.country).to.equal(accountMock.country);
	
				expect(account.created).to.be.an('date');
				expect(account.id).to.be.an('string');
				expect(account.id).not.to.be.empty;
	
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('updateAccount', (done) => {
			const controller = new RealmAccountController();
			controller.realm.then(realm => {
				let newMail = "acbdefgadasd@de.as";
				let newPostCode = 99999;
				let newData = {
					mail:newMail,
					postCode:newPostCode
				}
				let updatedAccount = controller.updateAccount(account.id, newData);
				expect(updatedAccount.mail).to.equal(newMail);
				expect(updatedAccount.postCode).to.equal(newPostCode);
				expect(updatedAccount).to.deep.equal(account);
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getAccount', (done) => {
			const controller = new RealmAccountController();
			controller.realm.then(realm => {
				let getAccount = controller.getAccount(account.id);
				expect(getAccount).to.deep.equal(account);
				done();
			}).catch(err => {
				done(err);
			});
		})
	});
	describe('Wrong Data', () => {
		it('createAccount', (done) => {
			const controller = new RealmAccountController();
			controller.realm.then(realm => {
				const accountMock = require('./mockData/account/createWrong.json')
				let emptyAccount = controller.createAccount(accountMock);
				expect(emptyAccount).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('updateAccount', (done) => {
			const controller = new RealmAccountController();
			controller.realm.then(realm => {
				let newPostCode = "99999";
				let newData = {
					mail:[],
					postCode:newPostCode
				}
				let updatedAccount = controller.updateAccount(account.id, newData);
				expect(updatedAccount).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getAccount', (done) => {
			const controller = new RealmAccountController();
			controller.realm.then(realm => {
				let getAccount = controller.getAccount("xxxxxxsomerandomaccountid123456789");
				expect(getAccount).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			});
		})
	});
	
})