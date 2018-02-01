'use strict';
const Realm = require('realm');
const Order = require('./models/Order.js');
const OrderItem = require('./models/OrderItem.js');
const Account = require('./models/Account');
const Restaurant = require('./models/Restaurant.js');
const VoiceDevice = require('./models/VoiceDevice.js');
const Menu = require('./models/Menu.js');
const MenuDrinks = require('./models/MenuDrinks.js');
const MenuDrinksVar = require('./models/MenuDrinksVar.js');
const MenuDefaultParent = require('./models/MenuDefaultParent.js');
const Address = require('./models/Address.js');

class ParentRealmController {
    constructor () {
        this.Order = Order;
        this.OrderItem = OrderItem;
        this.Account = Account;
        this.Restaurant = Restaurant;
        this.VoiceDevice = VoiceDevice;
        this.Menu = Menu;
        this.MenuDrinks = MenuDrinks;
        this.MenuDrinksVar = MenuDrinksVar;
        this.MenuDefaultParent = MenuDefaultParent;
        this.Address = Address;

        var that = this;
        this.realm = Realm.open({
            path: './DataRealm/default.realm',
            schema: [Order, OrderItem, Account, Restaurant, VoiceDevice, Menu, MenuDrinks, MenuDrinksVar, MenuDefaultParent, Address]
        }).then(realm => {
            that.realm = realm;
        });
    };

    formatRealmObj (objectElem, emptyToUndefined = false) {
        let result = null;
        let worker = objectElem;
        if (typeof worker === 'object' && !(worker instanceof Date) && !Array.isArray(worker)) {
            let toArray = false;
            for (let key in worker) {
                if (key === '0') {
                    toArray = true;
                    break;
                }
            }
            if (toArray) {
                result = [];
                worker = Array.from(worker);
                for (let x = 0; x < worker.length; x++) {
                    result[x] = this.formatRealmObj(worker[x], emptyToUndefined);
                }
            } else if (JSON.stringify(worker) === JSON.stringify({})) {
                if (!emptyToUndefined) {
                    result = [];
                } else {
                    result = undefined;
                }
            } else if (worker === null) {
                result = undefined;
            } else {
                result = {};
                for (let key in worker) {
                    // remove realm flags
                    if (key !== 'deleted' && key !== 'created') {
                        let newObj = this.formatRealmObj(worker[key], emptyToUndefined);
                        if (newObj !== undefined) {
                            result[key] = newObj;
                        } else {
                            delete result[key];
                        }
                    }
                }
            }
        } else {
            if (Array.isArray(objectElem) && !objectElem.length && emptyToUndefined) {
                result = undefined;
            } else if (Array.isArray(worker)) {
                result = [];
                worker.forEach((workerItem, x) => {
                    result[x] = this.formatRealmObj(workerItem, emptyToUndefined);
                });
            } else {
                result = objectElem;
            }
        }
        return result;
    };

    // Abstract methods
    objectWithClassName (className) {
        return this.realm.objects(className);
    };
    objectWithId (className, id) {
        let object = this.realm.objects(className).filtered('id = $0 && deleted == null', id);
        if (object && object.length === 1) {
            return object[0];
        }
    };
    objectsWithFilter (className, filter) {
        filter = '(' + filter + ') && deleted == null';
        return this.realm.objects(className).filtered(filter);
    };
    createObject (className, objData) {
        return this.writeObject(className, objData, false);
    };
    updateObject (className, objectId, objData, legalAttributes) {
        for (var property in objData) {
            if (objData.hasOwnProperty(property)) {
                if (!legalAttributes.includes(property)) {
                    delete objData.property;
                }
            }
        }
        let updateObj = this.objectWithId(className, objectId);
        if (updateObj && updateObj.deleted === null) {
            objData.id = objectId;
            return this.writeObject(className, objData, true);
        }
    };
    deleteObject (className, objectId) {
        return this.updateObject(className, objectId, {deleted: new Date()}, ['deleted']);
    };

    // Realm methods
    writeObject (className, obj, update) {
        let created;
        try {
            this.realm.write(() => {
                created = this.realm.create(className, obj, update);
            });
        } catch (e) {
            if (process.env.DEBUG) {
                console.log('Error on creation: ' + e);
                console.log(className + ' -> ' + JSON.stringify(obj));
            }
        }
        return created;
    };
}
module.exports = ParentRealmController;
