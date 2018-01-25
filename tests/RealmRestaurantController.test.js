'use strict'

const RealmAccountController = require('../controller/RealmAccountController');
const RealmRestaurantController = require('../controller/RealmRestaurantController')
const expect = require('chai').expect

var restaurant;
var account;

describe('RealmRestaurantController', () => {
	it('Create object and check methods', () => {
		const controller = new RealmRestaurantController();
		expect(controller.getRestaurant).to.be.a('Function')
		expect(controller.getRestaurants).to.be.a('Function')
		expect(controller.createRestaurant).to.be.a('Function')
		expect(controller.updateRestaurant).to.be.a('Function')
	})
	describe('Valid Data', () => {
		it('createRestaurant', (done) => {
			let accountController = new RealmAccountController();
			accountController.realm.then(realm => {
				account = accountController.createAccount(require('./mockData/account/createValid.json'))
				let controller = new RealmRestaurantController();
				controller.realm.then(realm => {
					const mock = require('./mockData/restaurant/createValid.json')
					restaurant = controller.createRestaurant(account.id, mock);
					expect(restaurant.name).to.equal(mock.name);
					expect(restaurant.account).to.deep.equal(account);
					expect(restaurant.created).to.be.an('date');
					expect(restaurant.id).to.be.an('string');
					expect(restaurant.id).not.to.be.empty;
					done();
				}).catch(err => {
					done(err);
				})
			}).catch(err => {
				done(err);
			});
		})
		it('updateRestaurant', (done) => {
			const controller = new RealmRestaurantController();
			controller.realm.then(realm => {
				let newName = "rpiefBrxxYQn9HUzYUiKXqKwi0IsGR";
				let updated = controller.updateRestaurant(restaurant.id, {name:newName});
				expect(updated.name).to.equal(newName);
				expect(updated).to.deep.equal(restaurant);
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getRestaurant', (done) => {
			const controller = new RealmRestaurantController();
			controller.realm.then(realm => {
				let getRestaurant = controller.getRestaurant(restaurant.id);
				expect(getRestaurant).to.deep.equal(restaurant);
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getRestaurants', (done) => {
			const controller = new RealmRestaurantController();
			controller.realm.then(realm => {
				let restaurants = controller.getRestaurants(account.id);
				expect(restaurants).to.have.lengthOf(1);
				let first = restaurants[0];
				expect(first).to.deep.equal(restaurant);
				done();
			}).catch(err => {
				done(err);
			});
		})
	});
	describe('Wrong Data', () => {
		it('createRestaurant', (done) => {
			let controller = new RealmRestaurantController();
			controller.realm.then(realm => {
				const mock = require('./mockData/restaurant/createWrong.json')
				let emptyRestaurant = controller.createRestaurant(account.id, mock);
				expect(emptyRestaurant).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			})
		})
		it('updateRestaurant', (done) => {
			const controller = new RealmRestaurantController();
			controller.realm.then(realm => {
				let id = "rpiefBrxxYQn9HUzYUiKXqKwi0IsGR";
				const mock = require('./mockData/restaurant/createWrong.json')
				let updated = controller.updateRestaurant(id, mock);
				expect(updated).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getRestaurant', (done) => {
			const controller = new RealmRestaurantController();
			controller.realm.then(realm => {
				let id = "rpiefBrxxYQn9HUzYUiKXqKwi0IsGR";
				let getRestaurant = controller.getRestaurant(id);
				expect(getRestaurant).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getRestaurants', (done) => {
			const controller = new RealmRestaurantController();
			controller.realm.then(realm => {
				let id = "rpiefBrxxYQn9HUzYUiKXqKwi0IsGR";
				let restaurants = controller.getRestaurants(id);
				expect(restaurants).to.have.lengthOf(0);
				let first = restaurants[0];
				expect(first).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			});
		})
	});
})