const RealmAccountController = require('../controller/RealmAccountController');
const RealmRestaurantController = require('../controller/RealmRestaurantController');
const RealmVoiceDeviceController = require('../controller/RealmVoiceDeviceController');
const RealmServiceController = require('../controller/RealmServiceController');
const chai = require('chai');
const mocha = require('mocha');

const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;

let account;
let restaurant;
let voiceDevice;
let service;

describe('RealmServiceController', () => {
    it('Create object and check methods', () => {
        const controller = new RealmServiceController();
        expect(controller.getServiceById).to.be.a('Function');
        expect(controller.getServicesByRestaurantId).to.be.a('Function');
        expect(controller.createService).to.be.a('Function');
        expect(controller.updateService).to.be.a('Function');
        expect(controller.deleteService).to.be.a('Function');
    });
    describe('Valid Data', () => {
        it('createService', (done) => {
            const accountController = new RealmAccountController();
            accountController.realm.then((realm) => {
                // create test account
                let accountMock = require('./mockData/account/createValid');
                account = accountController.createAccount(accountMock);

                const restaurantController = new RealmRestaurantController();
                restaurantController.realm.then((realm) => {
                    // create test restaurant
                    let restaurantMock = require('./mockData/restaurant/createValid');
                    restaurantMock.accountId = account.id;
                    restaurant = restaurantController.createRestaurant(restaurantMock);

                    const voiceDeviceController = new RealmVoiceDeviceController();
                    voiceDeviceController.realm.then((realm) => {
                        // create test voice device
                        let voiceDeviceMock = require('./mockData/voicedevice/createValid');
                        voiceDevice = voiceDeviceController.createVoiceDevice(restaurant.id, voiceDeviceMock);

                        const serviceController = new RealmServiceController();
                        serviceController.realm.then((realm) => {
                            let serviceMock = require('./mockData/service/createValid');
                            service = serviceController.createService(voiceDevice.id, serviceMock.items);
                            service = serviceController.formatRealmObj(service);
                            expect(service.timestamp).to.be.a('date');
                            expect(service.voiceDeviceId).to.be.a('string');
                            expect(service.restaurantId).to.be.a('string');

                            expect(service.items).to.be.a('array');
                            let serviceItem = service.items[0];
                            expect(serviceItem.name).to.be.a('string');

                            done();
                        }).catch((err) => {
                            done(err);
                        });
                    }).catch((err) => {
                        done(err);
                    });
                }).catch((err) => {
                    done(err);
                });
            }).catch((err) => {
                done(err);
            });
        });
        it('getServiceById', (done) => {
            const controller = new RealmServiceController();
            controller.realm.then((realm) => {
                let result = controller.getServiceById(service.id);
                result = controller.formatRealmObj(result);
                expect(result).is.deep.equal(service);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getServiceByRestaurantId', (done) => {
            const controller = new RealmServiceController();
            controller.realm.then((realm) => {
                let result = controller.getServicesByRestaurantId(restaurant.id);
                result = controller.formatRealmObj(result);
                result = result[0];
                expect(result).is.deep.equal(service);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('updateService', (done) => {
            const controller = new RealmServiceController();
            controller.realm.then((realm) => {
                let newStatus = 2;
                service.status = newStatus;
                let result = controller.updateService(service.id, {status: 2});
                result = controller.formatRealmObj(result);
                if (Array.isArray(result)) {
                    result = result[0];
                }
                expect(result).is.deep.equal(service);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('deleteService', (done) => {
            const controller = new RealmServiceController();
            controller.realm.then((realm) => {
                let result = controller.deleteService(service.id);
                result = controller.formatRealmObj(result);
                expect(result).is.deep.equal(service);
                done();
            }).catch((err) => {
                done(err);
            });
        });

    });
    describe('Wrong Data', () => {
        it('createService', (done) => {
            const controller = new RealmServiceController();
            controller.realm.then((realm) => {
                let validService = require('./mockData/service/createValid');
                let wrongService = require('./mockData/service/createWrong');
                // wrong voiceDeviceId
                let result = controller.createService('invalid-voice-id', validService.items);
                expect(result).to.be.undefined;
                // wrong serviceItems
                result = controller.createService(voiceDevice.id, wrongService.items);
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getServiceById', (done) => {
            const controller = new RealmServiceController();
            controller.realm.then((realm) => {
                let result = controller.getServiceById('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getServicesByRestaurantId', (done) => {
            const controller = new RealmServiceController();
            controller.realm.then((realm) => {
                let result = controller.getServicesByRestaurantId('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('updateService', (done) => {
            const controller = new RealmServiceController();
            controller.realm.then((realm) => {
                let result = controller.updateService('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('deleteService', (done) => {
            const controller = new RealmServiceController();
            controller.realm.then((realm) => {
                let result = controller.deleteService('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});
