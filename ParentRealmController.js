'use strict';
const Realm = require('realm');
const Order = require('./models/Order.js');
const OrderItem = require('./models/OrderItem.js');
const Account = require('./models/Account');
const Restaurant = require('./models/Restaurant.js');
const VoiceDevice = require('./models/VoiceDevice.js');
const Drink = require('./models/Drink.js');
const DrinkVar = require('./models/DrinkVar.js');
const DefaultParentDrink = require('./models/DefaultParentDrink.js');

class ParentRealmController {
	constructor() {
		this.Order = Order;
		this.OrderItem = OrderItem;
		this.Account = Account;
		this.Restaurant = Restaurant;
		this.VoiceDevice = VoiceDevice;
        this.Drink = Drink;
        this.DrinkVar = DrinkVar;
        this.DefaultParentDrink = DefaultParentDrink;

		var that = this
		this.realm = Realm.open({
			path: './DataRealm/default.realm',
			schema: [Order, OrderItem, Account, Restaurant, VoiceDevice, Drink, DrinkVar, DefaultParentDrink],
		}).then(realm => {
			that.realm = realm;
		})
	};

    formatRealmObj (objectElem) {
        let result = null;
        let worker = objectElem;
        if (typeof worker === 'object') {
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
                    result[x] = this.formatRealmObj(worker[x]);
                }
            } else if (JSON.stringify(worker) === JSON.stringify({})) {
                result = [];
            } else if (worker === null) {
                result = false;
            } else {
                result = {};
                for (let key in worker) {
                    result[key] = this.formatRealmObj(worker[key]);
                }
            }
        } else {
            result = objectElem;
        }
        return result;
    };

	// Abstract methods
	objectWithId(className, id) {
		let object = this.realm.objects(className).filtered('id = $0', id);
		if(object && object.length === 1) {
            object = this.formatRealmObj(object);
			return object[0];
		}
		return;
	};
	objectsWithFilter(className, filter) {
		let objects = this.realm.objects(className).filtered(filter);
        objects = this.formatRealmObj(objects);
		return objects;
	};
	createObject(className, objData) {
		let object;
		if(this.valid(className, objData)) {
			object = this.writeObject(this.className, objData, false);
		}
		return object;
	};
	updateObject(className, objectId, objData) {
		objData.id = objectId;
		let object = this.writeObject(className, objData, true);
		return object;
	};

	// Validation
	valid(className, obj) {
		let realmSchema = this[className];
		var valid = true;
		for(var property in realmSchema.properties) {
			if (!obj.hasOwnProperty(property)) {
				valid = false;
				if(process.env.DEBUG) {
					console.error("MISSING: " + property + " in " + className);
				}
				break;
    		}
		}
		return valid;
	}

	// Realm methods
	writeObject(className, obj, update) {
		var created;
		try {
			this.realm.write(() => {
				created = this.realm.create(className, obj, update);
			});
		} catch (e) {
			if(process.env.DEBUG) {
				console.log('Error on creation: ' + e);
				console.log(className + ' -> ' + JSON.stringify(obj));
			}
		}
		return created;
	};
}
module.exports = ParentRealmController;
