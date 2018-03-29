'use strict';

const RealmAccountController = require('../controller/RealmAccountController');
const RealmRestaurantController = require('../controller/RealmRestaurantController');
const RealmVoiceDeviceController = require('../controller/RealmVoiceDeviceController');
const expect = require('chai').expect;

var voiceDevice;
var restaurant;
var account;

describe('RealmVoiceDeviceController', () => {
    it('Create object and check methods', () => {
        const controller = new RealmVoiceDeviceController();
        expect(controller.getVoiceDeviceById).to.be.a('Function');
        expect(controller.getVoiceDevicesByRestaurantId).to.be.a('Function');
        expect(controller.createVoiceDevice).to.be.a('Function');
        expect(controller.updateVoiceDevice).to.be.a('Function');
        expect(controller.deleteVoiceDevice).to.be.a('Function');
    });
    describe('Valid Data', () => {
        it('createVoiceDevice', (done) => {
            let accountController = new RealmAccountController();
            accountController.realm.then(realm => {
                account = accountController.createAccount(require('./mockData/account/createValid.json'));
                let restaurantController = new RealmRestaurantController();
                restaurantController.realm.then(realm => {
                    let restaurantMock = require('./mockData/restaurant/createValid.json');
                    restaurantMock.accountId = account.id;
                    restaurant = restaurantController.createRestaurant(restaurantMock);
                    let controller = new RealmVoiceDeviceController();
                    controller.realm.then(realm => {
                        const mock = require('./mockData/voicedevice/createValid.json');
                        voiceDevice = controller.createVoiceDevice(restaurant.id, mock);
                        expect(voiceDevice.number).to.equal(mock.number);
                        expect(voiceDevice.restaurantId).to.deep.equal(restaurant.id);
                        expect(voiceDevice.created).to.be.an('date');
                        expect(voiceDevice.id).to.be.an('string');
                        expect(voiceDevice.number).to.be.an('string');
                        expect(voiceDevice.id).not.to.be.empty;
                        done();
                    }).catch(err => {
                        done(err);
                    });
                }).catch(err => {
                    done(err);
                });
            }).catch(err => {
                done(err);
            });
        });
        it('updateVoiceDevice', (done) => {
            const controller = new RealmVoiceDeviceController();
            controller.realm.then(realm => {
                let updated = controller.updateVoiceDevice(voiceDevice.id, {number: "199"});
                expect(updated.number).to.equal(voiceDevice.number);
                expect(updated).to.deep.equal(voiceDevice);
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('getVoiceDeviceById', (done) => {
            const controller = new RealmVoiceDeviceController();
            controller.realm.then(realm => {
                let getVoiceDevice = controller.getVoiceDeviceById(voiceDevice.id);
                expect(getVoiceDevice).to.deep.equal(voiceDevice);
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('getVoiceDevicesByRestaurantId', (done) => {
            const controller = new RealmVoiceDeviceController();
            controller.realm.then(realm => {
                let voiceDevices = controller.getVoiceDevicesByRestaurantId(restaurant.id);
                expect(voiceDevices).to.have.lengthOf(1);
                let first = voiceDevices[0];
                expect(first).to.deep.equal(voiceDevice);
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('deleteOrder', (done) => {
            const controller = new RealmVoiceDeviceController();
            controller.realm.then((realm) => {
                let result = controller.deleteVoiceDevice(voiceDevice.id);
                result = controller.formatRealmObj(result);
                voiceDevice = controller.formatRealmObj(voiceDevice);
                expect(result).is.deep.equal(voiceDevice);
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
    describe('Wrong Data', () => {
        it('createVoiceDevice', (done) => {
            let controller = new RealmVoiceDeviceController();
            controller.realm.then(realm => {
                const mock = require('./mockData/voicedevice/createWrong.json');
                let emptyVoiceDevice = controller.createVoiceDevice(restaurant.id, mock);
                expect(emptyVoiceDevice).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('updateVoiceDevice', (done) => {
            const controller = new RealmVoiceDeviceController();
            controller.realm.then(realm => {
                let id = 'rpiefBrxxYQn9HUzYUiKXqKwi0IsGR';
                const mock = require('./mockData/restaurant/createWrong.json');
                let updated = controller.updateVoiceDevice(id, mock);
                expect(updated).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('getVoiceDeviceById', (done) => {
            const controller = new RealmVoiceDeviceController();
            controller.realm.then(realm => {
                let id = 'rpiefBrxxYQn9HUzYUiKXqKwi0IsGR';
                let getVoiceDevice = controller.getVoiceDeviceById(id);
                expect(getVoiceDevice).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('getVoiceDevicesByRestaurantId', (done) => {
            const controller = new RealmVoiceDeviceController();
            controller.realm.then(realm => {
                let id = 'rpiefBrxxYQn9HUzYUiKXqKwi0IsGR';
                let getVoiceDevices = controller.getVoiceDevicesByRestaurantId(id);
                expect(getVoiceDevices).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('deleteOrder', (done) => {
            const controller = new RealmVoiceDeviceController();
            controller.realm.then((realm) => {
                let result = controller.deleteVoiceDevice('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});
