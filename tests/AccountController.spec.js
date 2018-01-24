'use strict'

const RealmAccountController = require('../controller/RealmAccountController')
const accountMock = require('./mockData/account.json')
const expect = require('chai').expect
const assert = require('assert')

var account;

describe('RealmAccountController', () => {
	it('Create object and check methods', () => {
		const controller = new RealmAccountController();
		expect(controller.getAccount).to.be.a('Function')
		expect(controller.createAccount).to.be.a('Function')
		expect(controller.updateAccount).to.be.a('Function')
	})
	it('Create account', (done) => {
		const controller = new RealmAccountController();
		controller.realm.then(realm => {
			account = controller.createAccount(accountMock);
			expect(account.mail).to.equal(accountMock.mail);
			expect(account.password).to.equal(accountMock.password);
			expect(account.firstName).to.equal(accountMock.firstName);
			expect(account.surname).to.equal(accountMock.surname);
			expect(account.street).to.equal(accountMock.street);
			expect(account.postCode).to.equal(accountMock.postCode);
			expect(account.city).to.equal(accountMock.city);
			expect(account.country).to.equal(accountMock.country);
			done();
		}).catch(err => {
			done(err);
		});
	})
	// it('Update account', (done) => {
	// 	const controller = new RealmAccountController();
	// 	controller.realm.then(realm => {
	// 		var newMail = "acbdefgadasd@de.as";
	// 		var newPostCode = 99999;
	// 		var newData = {
	// 			mail:newMail,
	// 			postCode:newPostCode
	// 		}
	// 		let updatedAccount = controller.updateAccount(account.id, newData);
	// 		console.log(updatedAccount);
	// 		expect(updatedAccount.mail).to.equal(newMail);
	// 		expect(updatedAccount.postCode).to.equal(newPostCode);
	// 		done();
	// 	}).catch(err => {
	// 		done(err);
	// 	});
	// })

	
})