const RealmAccountController = require('../controller/RealmAccountController');
const RealmRestaurantController = require('../controller/RealmRestaurantController');
const chai = require('chai');
const mocha = require('mocha');

const expect = chai.expect;
const describe = mocha.describe;
const it = mocha.it;
let restaurant;
let account;

describe('RealmRestaurantController', () => {
    it('Create object and check methods', () => {
        const controller = new RealmRestaurantController();
        expect(controller.getRestaurantById).to.be.a('Function');
        expect(controller.getRestaurantsByAccountId).to.be.a('Function');
        expect(controller.createRestaurant).to.be.a('Function');
        expect(controller.updateRestaurant).to.be.a('Function');
        expect(controller.deleteRestaurant).to.be.a('Function');
    });
    describe('Valid Data', () => {
        it('createRestaurant', (done) => {
            const accountController = new RealmAccountController();
            accountController.realm.then((realm) => {
                account = accountController.createAccount(require('./mockData/account/createValid.json'));
                const controller = new RealmRestaurantController();
                controller.realm.then((realm) => {
                    let mock = require('./mockData/restaurant/createValid.json');

                    mock.account = account;
                    mock.address = account.address;
                    restaurant = controller.createRestaurant(account.id, mock);

                    account = controller.formatRealmObj(account);
                    let restaurantFormatted = controller.formatRealmObj(restaurant);
                    mock = controller.formatRealmObj(mock);

                    expect(restaurantFormatted.name).to.equal(mock.name);
                    expect(restaurantFormatted.address).to.deep.equal(mock.address);
                    expect(restaurantFormatted.drinkMenus).to.deep.equal(mock.drinkMenus);
                    expect(restaurantFormatted.account).to.deep.equal(account);
                    expect(restaurant.created).to.be.an('date');
                    expect(restaurantFormatted.id).to.be.an('string');
                    expect(restaurantFormatted.id).not.to.be.empty;
                    done();
                }).catch((err) => {
                    done(err);
                });
            }).catch((err) => {
                done(err);
            });
        });
        it('updateRestaurant', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                const newName = 'rpiefBrxxYQn9HUzYUiKXqKwi0IsGR';
                let updated = controller.updateRestaurant(restaurant.id, { name: newName });

                updated = controller.formatRealmObj(updated);
                let restaurantFormatted = controller.formatRealmObj(restaurant);

                expect(updated.name).to.equal(newName);
                expect(updated).to.deep.equal(restaurantFormatted);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getRestaurantById', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                let getRestaurant = controller.getRestaurantById(restaurant.id);
                getRestaurant = controller.formatRealmObj(getRestaurant);
                let restaurantFormatted = controller.formatRealmObj(restaurant);
                expect(getRestaurant).to.deep.equal(restaurantFormatted);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getRestaurantsByAccountId', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                let restaurants = controller.getRestaurantsByAccountId(account.id);
                restaurants = controller.formatRealmObj(restaurants);
                expect(restaurants).to.have.lengthOf(1);
                const first = restaurants[0];
                let restaurantFormatted = controller.formatRealmObj(restaurant);
                expect(first).to.deep.equal(restaurantFormatted);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('deleteRestaurant', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                let result = controller.deleteRestaurant(restaurant.id);
                result = controller.formatRealmObj(result);
                restaurant = controller.formatRealmObj(restaurant);
                expect(result).to.deep.equal(restaurant);
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
    describe('Wrong Data', () => {
        it('createRestaurant', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                const mock = require('./mockData/restaurant/createWrong.json');
                const emptyRestaurant = controller.createRestaurant(account.id, mock);
                expect(emptyRestaurant).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('updateRestaurant', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                const id = 'rpiefBrxxYQn9HUzYUiKXqKwi0IsGR';
                const mock = require('./mockData/restaurant/createWrong.json');
                const updated = controller.updateRestaurant(id, mock);
                expect(updated).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getRestaurantById', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                const id = 'rpiefBrxxYQn9HUzYUiKXqKwi0IsGR';
                const getRestaurant = controller.getRestaurantById(id);
                expect(getRestaurant).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getRestaurantsByAccountId', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                const id = 'rpiefBrxxYQn9HUzYUiKXqKwi0IsGR';
                const restaurants = controller.getRestaurantsByAccountId(id);
                expect(restaurants).to.have.lengthOf(0);
                const first = restaurants[0];
                expect(first).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('deleteRestaurant', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                let result = controller.deleteRestaurant('invalid-id');
                expect(result).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});
