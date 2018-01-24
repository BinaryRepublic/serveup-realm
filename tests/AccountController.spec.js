'use strict'

const RealmAccountController = require('../controller/RealmAccountController')
const accountMock = require('./mockData/account.json')
const expect = require('chai').expect
const assert = require('assert')

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
			var account = controller.createAccount(accountMock);
			expect(account.mail).to.equal(accountMock.mail);
			done();
		}).catch(err => {
			done(err);
		});
	})
})