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
        it ('createMenu', (done) => {
            const controller = new RealmMenuController();
            controller.realm.then(realm => {
                let sampleMenu = require('./mockData/menu/menu');
                let createdMenu = controller.createMenu(sampleMenu);
                sampleMenu = controller.formatRealmObj(sampleMenu, true);
                createdMenu = controller.formatRealmObj(createdMenu, true);
                expect(createdMenu).is.deep.equal(sampleMenu);
                done();
            }).catch((err)=>{
                done(err);
            });
        });
    });
});