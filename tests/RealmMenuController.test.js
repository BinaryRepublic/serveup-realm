'use strict';

const RealmMenuController = require('../controller/RealmMenuController');
const RealmRestaurantController = require('../controller/RealmRestaurantController');
const RealmAccountController = require('../controller/RealmAccountController');
const expect = require('chai').expect;

let menu, restaurant, account;

describe ('RealmMenuController', () => {
    it ('Create object and check methods', (done) => {
        const controller = new RealmMenuController();
        expect(controller.getMenuById).to.be.a('Function');
        expect(controller.getMenuByRestaurantId).to.be.a('Function');
        expect(controller.createMenu).to.be.a('Function');
        expect(controller.validateMenu).to.be.a('Function');
        expect(controller.updateMenu).to.be.a('Function');
        expect(controller.deleteMenu).to.be.a('Function');
        done();
    });
    describe ('Valid Data', () => {
        it ('createMenu', (done) => {
            const accountController = new RealmAccountController();
            accountController.realm.then(realm => {
                let accountMock = require('./mockData/account/createValid');
                account = accountController.createAccount(accountMock);

                const restaurantController = new RealmRestaurantController();
                restaurantController.realm.then(realm => {
                    let restaurantMock = require('./mockData/restaurant/createValid');
                    restaurant = restaurantController.createRestaurant(account.id, restaurantMock);

                    const menuController = new RealmMenuController();
                    menuController.realm.then(realm => {
                        let sampleMenu = require('./mockData/menu/createValid');
                        sampleMenu.restaurantId = restaurant.id;
                        menu = menuController.createMenu(sampleMenu);
                        sampleMenu = menuController.formatRealmObj(sampleMenu, true);
                        menu = menuController.formatRealmObj(menu, true);
                        expect(menu).is.deep.equal(sampleMenu);
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
        it ('getMenuByRestaurantId', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let result = controller.getMenuByRestaurantId(restaurant.id);
                result = controller.formatRealmObj(result, true);
                expect(result[0]).to.deep.equal(menu);
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