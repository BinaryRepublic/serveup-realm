'use strict';

const RealmAccountController = require('../controller/RealmAccountController');
const expect = require('chai').expect;

var account;

describe('RealmAccountController', () => {
    it('Create object and check methods', (done) => {
        const controller = new RealmAccountController();
        expect(controller.getAccounts).to.be.a('Function');
        expect(controller.getAccountById).to.be.a('Function');
        expect(controller.createAccount).to.be.a('Function');
        expect(controller.updateAccount).to.be.a('Function');
        expect(controller.deleteAccount).to.be.a('Function');
        done();
    });
    describe('Valid Data', () => {
        it('createAccount', (done) => {
            const controller = new RealmAccountController();
            controller.realm.then(realm => {
                const accountMock = require('./mockData/account/createValid.json');
                account = controller.createAccount(accountMock);

                expect(account).not.to.be.undefined;
                expect(account.mail).to.equal(accountMock.mail);
                expect(account.password).to.equal(accountMock.password);
                expect(account.firstName).to.equal(accountMock.firstName);
                expect(account.surname).to.equal(accountMock.surname);
                expect(account.phone).to.equal(accountMock.phone);

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
        });
        it('updateAccount', (done) => {
            const controller = new RealmAccountController();
            controller.realm.then(realm => {
                let newMail = 'acbdefgadasd@de.as';
                let newData = {
                    mail: newMail
                };
                let updatedAccount = controller.updateAccount(account.id, newData);
                expect(updatedAccount.mail).to.equal(newMail);
                expect(updatedAccount).to.deep.equal(account);
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('getAccounts', (done) => {
            const controller = new RealmAccountController();
            controller.realm.then(realm => {
                let getAccount = controller.getAccounts();
                getAccount = controller.formatRealmObj(getAccount);
                account = controller.formatRealmObj(account);
                expect(getAccount[getAccount.length-1]).to.deep.equal(account);
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('getAccountById', (done) => {
            const controller = new RealmAccountController();
            controller.realm.then(realm => {
                let getAccount = controller.getAccountById(account.id);
                getAccount = controller.formatRealmObj(getAccount);
                account = controller.formatRealmObj(account);
                expect(getAccount).to.deep.equal(account);
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('deleteAccount', (done) => {
            const controller = new RealmAccountController();
            controller.realm.then(realm => {
                let result = controller.deleteAccount(account.id);
                result = controller.formatRealmObj(result);
                expect(result).to.deep.equal(account);
                done();
            }).catch(err => {
                done(err);
            });
        });
    });
    describe('Wrong Data', () => {
        it('createAccount', (done) => {
            const controller = new RealmAccountController();
            controller.realm.then(realm => {
                const accountMock = require('./mockData/account/createWrong.json');
                let emptyAccount = controller.createAccount(accountMock);
                expect(emptyAccount).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('updateAccount', (done) => {
            const controller = new RealmAccountController();
            controller.realm.then(realm => {
                let newPostCode = '99999';
                let newData = {
                    mail: [],
                    postCode: newPostCode
                };
                let updatedAccount = controller.updateAccount(account.id, newData);
                expect(updatedAccount).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('getAccountById', (done) => {
            const controller = new RealmAccountController();
            controller.realm.then(realm => {
                let getAccount = controller.getAccountById('xxxxxxsomerandomaccountid123456789');
                expect(getAccount).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
        it('deleteAccount', (done) => {
            const controller = new RealmAccountController();
            controller.realm.then(realm => {
                let result = controller.deleteAccount('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch(err => {
                done(err);
            });
        });
    });
});
