'use strict';

const RealmAccountController = require('../controller/RealmAccountController');
const RealmAddressController = require('../controller/RealmAddressController');
const expect = require('chai').expect;

describe('RealmAddressController', () => {
    it('Create object and check methods', () => {
        const controller = new RealmAddressController();
        expect(controller.getAddressById).to.be.a('Function');
        expect(controller.createAddress).to.be.a('Function');
        expect(controller.updateAddress).to.be.a('Function');
        expect(controller.deleteAddress).to.be.a('Function');
    });
    describe('Valid Data', () => {
        let insertedAddress;
        it('createAddress', (done) => {
            const controller = new RealmAddressController();
            controller.realm.then(realm => {
                let sampleAddr = require('./mockData/address/createValid');
                let result = controller.createAddress(sampleAddr);
                sampleAddr = controller.formatRealmObj(sampleAddr);
                result = controller.formatRealmObj(result);
                expect(result).is.deep.equal(sampleAddr);
                insertedAddress = result;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('getAddressById', (done) => {
            const controller = new RealmAddressController();
            controller.realm.then(realm => {
                let result = controller.getAddressById(insertedAddress.id);
                result = controller.formatRealmObj(result);
                expect(result).is.deep.equal(insertedAddress);
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('updateAddress', (done) => {
            const controller = new RealmAddressController();
            controller.realm.then(realm => {
                let updateMock = require('./mockData/address/updateValid');
                let result = controller.updateAddress(insertedAddress.id, updateMock);
                result = controller.formatRealmObj(result);
                expect(result).to.deep.equal(updateMock);
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('deleteAddress', (done) => {
            const controller = new RealmAddressController();
            controller.realm.then(realm => {
                let result = controller.deleteAddress(insertedAddress.id);
                expect(result.deleted).to.be.a('Date');
                done();
            }).catch(err => {
                done(err);
            });
        });
    });
    describe('Wrong Data', () => {
        it('createAddress', (done) => {
            const controller = new RealmAddressController();
            controller.realm.then(realm => {
                let mockWrong = require('./mockData/address/createWrong');
                let result = controller.createAddress(mockWrong);
                expect(result).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('getAddressById', (done) => {
            const controller = new RealmAddressController();
            controller.realm.then(realm => {
                let result = controller.getAddressById('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('updateAddress', (done) => {
            const controller = new RealmAddressController();
            controller.realm.then(realm => {
                let updateMock = require('./mockData/address/createWrong');
                let result = controller.updateAddress('invalid-id', updateMock);
                expect(result).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('deleteAddress', (done) => {
            const controller = new RealmAddressController();
            controller.realm.then(realm => {
                let result = controller.deleteAddress('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
    });
});
