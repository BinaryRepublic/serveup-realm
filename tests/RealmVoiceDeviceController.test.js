'use strict'

const RealmAccountController = require('../controller/RealmAccountController');
const RealmRestaurantController = require('../controller/RealmRestaurantController');
const RealmVoiceDeviceController = require('../controller/RealmVoiceDeviceController');
const expect = require('chai').expect

var voiceDevice;
var restaurant;
var account;

describe('RealmVoiceDeviceController', () => {
	it('Create object and check methods', () => {
		const controller = new RealmVoiceDeviceController();
		expect(controller.getVoiceDevice).to.be.a('Function')
		expect(controller.getVoiceDevices).to.be.a('Function')
		expect(controller.createVoiceDevice).to.be.a('Function')
		expect(controller.updateVoiceDevice).to.be.a('Function')
	})
	describe('Valid Data', () => {
		it('createVoiceDevice', (done) => {
			let accountController = new RealmAccountController();
			accountController.realm.then(realm => {
				account = accountController.createAccount(require('./mockData/account/createValid.json'))
				let restaurantController = new RealmRestaurantController();
				restaurantController.realm.then(realm => {
					restaurant = restaurantController.createRestaurant(account.id, require('./mockData/restaurant/createValid.json'))
					let controller = new RealmVoiceDeviceController();
					controller.realm.then(realm => {
						const mock = require('./mockData/voicedevice/createValid.json')
						voiceDevice = controller.createVoiceDevice(restaurant.id, mock);
						expect(voiceDevice.number).to.equal(mock.number);
						expect(voiceDevice.restaurant).to.deep.equal(restaurant);
						expect(voiceDevice.created).to.be.an('date');
						expect(voiceDevice.id).to.be.an('string');
						expect(voiceDevice.number).to.be.an('number');
						expect(voiceDevice.id).not.to.be.empty;
						done();
					}).catch(err => {
						done(err);
					})
				}).catch(err => {
					done(err);
				})
			}).catch(err => {
				done(err);
			});
		})
		it('updateVoiceDevice', (done) => {
			const controller = new RealmVoiceDeviceController();
			controller.realm.then(realm => {
				let updated = controller.updateVoiceDevice(voiceDevice.id, {number:199});
				expect(updated.number).to.equal(voiceDevice.number);
				expect(updated).to.deep.equal(voiceDevice);
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getVoiceDevice', (done) => {
			const controller = new RealmVoiceDeviceController();
			controller.realm.then(realm => {
				let getVoiceDevice = controller.getVoiceDevice(voiceDevice.id);
				expect(getVoiceDevice).to.deep.equal(voiceDevice);
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getVoiceDevices', (done) => {
			const controller = new RealmVoiceDeviceController();
			controller.realm.then(realm => {
				let voiceDevices = controller.getVoiceDevices(restaurant.id);
				expect(voiceDevices).to.have.lengthOf(1);
				let first = voiceDevices[0];
				expect(first).to.deep.equal(voiceDevice);
				done();
			}).catch(err => {
				done(err);
			});
		})
	});
	describe('Wrong Data', () => {
		it('createVoiceDevice', (done) => {
			let controller = new RealmVoiceDeviceController();
			controller.realm.then(realm => {
				const mock = require('./mockData/voicedevice/createWrong.json')
				let emptyVoiceDevice = controller.createVoiceDevice(restaurant.id, mock);
				expect(emptyVoiceDevice).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			})
		})
		it('updateVoiceDevice', (done) => {
			const controller = new RealmVoiceDeviceController();
			controller.realm.then(realm => {
				let id = "rpiefBrxxYQn9HUzYUiKXqKwi0IsGR";
				const mock = require('./mockData/restaurant/createWrong.json')
				let updated = controller.updateVoiceDevice(id, mock);
				expect(updated).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getVoiceDevice', (done) => {
			const controller = new RealmVoiceDeviceController();
			controller.realm.then(realm => {
				let id = "rpiefBrxxYQn9HUzYUiKXqKwi0IsGR";
				let getVoiceDevice = controller.getVoiceDevice(id);
				expect(getVoiceDevice).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			});
		})
		it('getVoiceDevices', (done) => {
			const controller = new RealmVoiceDeviceController();
			controller.realm.then(realm => {
				let id = "rpiefBrxxYQn9HUzYUiKXqKwi0IsGR";
				let getVoiceDevices = controller.getVoiceDevices(id);
				expect(getVoiceDevices).to.have.lengthOf(0);
				let first = getVoiceDevices[0];
				expect(first).to.be.undefined;
				done();
			}).catch(err => {
				done(err);
			});
		})
	});
})