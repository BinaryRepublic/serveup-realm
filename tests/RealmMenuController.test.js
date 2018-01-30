'use strict';

const RealmMenuController = require('../controller/RealmMenuController');
const expect = require('chai').expect;

describe ('RealmMenuController', () => {
    it ('Create object and check methods', (done) => {
        const controller = new RealmMenuController();
        expect(controller.getMenuById).to.be.a('Function');
        expect(controller.createMenu).to.be.a('Function');
        expect(controller.validateMenu).to.be.a('Function');
        expect(controller.updateMenu).to.be.a('Function');
        expect(controller.deleteMenu).to.be.a('Function');
        done();
    });
    describe ('Valid Data', () => {
        let menu;
        it ('createMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let sampleMenu = require('./mockData/menu/createValid');
                let createdMenu = controller.createMenu(sampleMenu);
                sampleMenu = controller.formatRealmObj(sampleMenu, true);
                createdMenu = controller.formatRealmObj(createdMenu, true);
                expect(createdMenu).is.deep.equal(sampleMenu);
                menu = createdMenu;
                done();
            }).catch((err)=>{
                done(err);
            });
        });
        it ('getMenuById', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let result = controller.getMenuById(menu.id);
                result = controller.formatRealmObj(result);
                expect(result).to.be.an('Object');
                expect(result).to.have.property('drinks');
                expect(result).to.have.property('defaultParents');
                expect(result.drinks).to.be.an('Array');
                expect(result.drinks[0]).to.have.property('name');
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it ('validateMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let sampleMenu = require('./mockData/menu/createValid');
                let validation = controller.validateMenu(sampleMenu);
                expect(validation).to.be.true;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it ('updateMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let sampleMenuUpdate = require('./mockData/menu/updateValid');
                let updatedMenu = controller.updateMenu(menu.id, sampleMenuUpdate);
                sampleMenuUpdate = controller.formatRealmObj(sampleMenuUpdate, true);
                updatedMenu = controller.formatRealmObj(updatedMenu, true);
                expect(updatedMenu).is.deep.equal(sampleMenuUpdate);
                menu = updatedMenu;
                done();
            }).catch((err) => {
                done(err);
            })
        });
        it ('deleteMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let result = controller.deleteMenu(menu.id);
                result = controller.formatRealmObj(result, true);
                expect(result).to.deep.equal(menu);
                done();
            }).catch((err) => {
                done(err);
            })
        });
    });
    describe ('Wrong Data', () => {
        it ('createMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let sampleMenu = require('./mockData/menu/createWrong');
                let createdMenu = controller.createMenu(sampleMenu);
                sampleMenu = controller.formatRealmObj(sampleMenu, true);
                createdMenu = controller.formatRealmObj(createdMenu, true);
                expect(createdMenu).is.not.deep.equal(sampleMenu);
                expect(createdMenu).has.property('error');
                done();
            }).catch((err)=>{
                done(err);
            });
        });
        it ('getMenuById', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let menuId = 'this-id-is-invalid';
                let result = controller.getMenuById(menuId);
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it ('validateMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let sampleMenu = require('./mockData/menu/createWrong');
                let result = controller.validateMenu(sampleMenu);
                expect(result).not.to.be.true;
                expect(result).not.to.be.empty;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it ('updateMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let sampleMenu = require('./mockData/menu/createWrong');
                let result = controller.updateMenu('this-id-is-invalid', sampleMenu);
                sampleMenu = controller.formatRealmObj(sampleMenu, true);
                result = controller.formatRealmObj(result, true);
                expect(result).not.to.be.true;
                expect(result).not.to.be.empty;
                done();
            }).catch((err) => {
                done(err);
            })
        });
        it ('deleteMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let result = controller.deleteMenu('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            })
        });
    });
});