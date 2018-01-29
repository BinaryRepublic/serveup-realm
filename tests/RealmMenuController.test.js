'use strict';

const RealmMenuController = require('../controller/RealmMenuController');
const expect = require('chai').expect;

describe ('RealmDrinkController', () => {
    it ('Create object and check methods', (done) => {
        const controller = new RealmMenuController();
        expect(controller.getMenuById).to.be.a('Function');
        expect(controller.createMenu).to.be.a('Function');
        expect(controller.validateMenu).to.be.a('Function');
        expect(controller.updateMenu).to.be.a('Function');
        done();
    });
    describe ('Valid Data', () => {
        let menuId;
        it ('createMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let sampleMenu = require('./mockData/menu/createValid');
                let createdMenu = controller.createMenu(sampleMenu);
                sampleMenu = controller.formatRealmObj(sampleMenu, true);
                createdMenu = controller.formatRealmObj(createdMenu, true);
                expect(createdMenu).is.deep.equal(sampleMenu);
                menuId = createdMenu.id;
                done();
            }).catch((err)=>{
                done(err);
            });
        });
        it ('getMenuById', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let menu = controller.getMenuById(menuId);
                menu = controller.formatRealmObj(menu);
                expect(menu).to.be.an('Object');
                expect(menu).to.have.property('drinks');
                expect(menu).to.have.property('defaultParents');
                expect(menu.drinks).to.be.an('Array');
                expect(menu.drinks[0]).to.have.property('name');
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
                let updatedMenu = controller.updateMenu(menuId, sampleMenuUpdate);
                sampleMenuUpdate = controller.formatRealmObj(sampleMenuUpdate, true);
                updatedMenu = controller.formatRealmObj(updatedMenu, true);
                expect(updatedMenu).is.deep.equal(sampleMenuUpdate);
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
    });
});