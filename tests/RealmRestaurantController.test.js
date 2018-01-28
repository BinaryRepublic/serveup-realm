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
        expect(controller.getRestaurant).to.be.a('Function');
        expect(controller.getRestaurants).to.be.a('Function');
        expect(controller.createRestaurant).to.be.a('Function');
        expect(controller.updateRestaurant).to.be.a('Function');
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
                    restaurant = controller.formatRealmObj(restaurant);
                    mock = controller.formatRealmObj(mock);

                    expect(restaurant.name).to.equal(mock.name);
                    expect(restaurant.address).to.deep.equal(mock.address);
                    expect(restaurant.drinkMenus).to.deep.equal(mock.drinkMenus);
                    expect(restaurant.account).to.deep.equal(account);
                    expect(restaurant.created).to.be.an('date');
                    expect(restaurant.id).to.be.an('string');
                    expect(restaurant.id).not.to.be.empty;
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

                restaurant.name = newName;
                updated = controller.formatRealmObj(updated);

                expect(updated.name).to.equal(newName);
                expect(updated).to.deep.equal(restaurant);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getRestaurant', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                let getRestaurant = controller.getRestaurant(restaurant.id);
                getRestaurant = controller.formatRealmObj(getRestaurant);
                expect(getRestaurant).to.deep.equal(restaurant);
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getRestaurants', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                let restaurants = controller.getRestaurants(account.id);
                restaurants = controller.formatRealmObj(restaurants);
                expect(restaurants).to.have.lengthOf(1);
                const first = restaurants[0];
                expect(first).to.deep.equal(restaurant);
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
        it('getRestaurant', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                const id = 'rpiefBrxxYQn9HUzYUiKXqKwi0IsGR';
                const getRestaurant = controller.getRestaurant(id);
                expect(getRestaurant).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
        it('getRestaurants', (done) => {
            const controller = new RealmRestaurantController();
            controller.realm.then((realm) => {
                const id = 'rpiefBrxxYQn9HUzYUiKXqKwi0IsGR';
                const restaurants = controller.getRestaurants(id);
                expect(restaurants).to.have.lengthOf(0);
                const first = restaurants[0];
                expect(first).to.be.undefined;
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});
