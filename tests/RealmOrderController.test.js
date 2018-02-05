const RealmAccountController = require('../controller/RealmAccountController');
const RealmRestaurantController = require('../controller/RealmRestaurantController');
const RealmVoiceDeviceController = require('../controller/RealmVoiceDeviceController');
const RealmOrderController = require('../controller/RealmOrderController');
const chai = require('chai');
const mocha = require('mocha');

const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;

let account;
let restaurant;
let voiceDevice;
let order;

describe('RealmOrderController', () => {
    it('Create object and check methods', () => {
        const controller = new RealmOrderController();
        expect(controller.getOrderById).to.be.a('Function');
        expect(controller.getOrdersByRestaurantId).to.be.a('Function');
        expect(controller.createOrder).to.be.a('Function');
        expect(controller.updateOrder).to.be.a('Function');
        expect(controller.deleteOrder).to.be.a('Function');
    });
    describe('Valid Data', () => {
        it('createOrder', (done) => {
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

                        const orderController = new RealmOrderController();
                        orderController.realm.then((realm) => {
                            let orderMock = require('./mockData/order/createValid');
                            order = orderController.createOrder(voiceDevice.id, orderMock.items);
                            order = orderController.formatRealmObj(order);
                            expect(order).has.property('timestamp');
                            expect(order).has.property('voiceDeviceId');
                            expect(order).has.property('restaurantId');
                            expect(order).has.property('items');
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
        it('getOrderById', (done) => {
            const controller = new RealmOrderController();
            controller.realm.then((realm) => {
                let result = controller.getOrderById(order.id);
                result = controller.formatRealmObj(result);
                expect(result).is.deep.equal(order);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getOrderByRestaurantId', (done) => {
            const controller = new RealmOrderController();
            controller.realm.then((realm) => {
                let result = controller.getOrdersByRestaurantId(restaurant.id);
                result = controller.formatRealmObj(result);
                result = result[0];
                expect(result).is.deep.equal(order);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('updateOrder', (done) => {
            const controller = new RealmOrderController();
            controller.realm.then((realm) => {
                let newStatus = 2;
                order.status = newStatus;
                let result = controller.updateOrder(order.id, {status: 2});
                result = controller.formatRealmObj(result);
                if (Array.isArray(result)) {
                    result = result[0];
                }
                expect(result).is.deep.equal(order);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('deleteOrder', (done) => {
            const controller = new RealmOrderController();
            controller.realm.then((realm) => {
                let result = controller.deleteOrder(order.id);
                result = controller.formatRealmObj(result);
                expect(result).is.deep.equal(order);
                done();
            }).catch((err) => {
                done(err);
            });
        });

    });
    describe('Wrong Data', () => {
        it('createOrder', (done) => {
            const controller = new RealmOrderController();
            controller.realm.then((realm) => {
                let validOrder = require('./mockData/order/createValid');
                let wrongOrder = require('./mockData/order/createWrong');
                // wrong voiceDeviceId
                let result = controller.createOrder('invalid-voice-id', validOrder.items);
                expect(result).to.be.undefined;
                // wrong orderItems
                result = controller.createOrder(voiceDevice.id, wrongOrder.items);
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getOrderById', (done) => {
            const controller = new RealmOrderController();
            controller.realm.then((realm) => {
                let result = controller.getOrderById('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getOrdersByRestaurantId', (done) => {
            const controller = new RealmOrderController();
            controller.realm.then((realm) => {
                let result = controller.getOrdersByRestaurantId('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('updateOrder', (done) => {
            const controller = new RealmOrderController();
            controller.realm.then((realm) => {
                let result = controller.updateOrder('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('deleteOrder', (done) => {
            const controller = new RealmOrderController();
            controller.realm.then((realm) => {
                let result = controller.deleteOrder('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});
