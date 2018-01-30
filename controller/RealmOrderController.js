'use strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');
const RealmRestaurantController = require('./RealmRestaurantController');
const RealmVoiceDeviceController = require('./RealmVoiceDeviceController');

class RealmOrderController extends ParentRealmController {
    constructor (callback) {
        super(callback);
        this.className = 'Order';
        this.voiceDeviceController = new RealmVoiceDeviceController();
        this.restaurantController = new RealmRestaurantController();
    }
    getOrderById (id) {
        return this.objectWithId(this.className, id);
    };
    getOrdersByRestaurantId (restaurantId) {
        // check if restaurant exists
        if (this.restaurantController.getRestaurantById(restaurantId)) {
            let filterString = `restaurantId == '${restaurantId}'`;
            return this.objectsWithFilter(this.className, filterString);
        }
    };
    createOrder (voiceDeviceId, orderItems) {
        let voiceDevice = this.voiceDeviceController.getVoiceDeviceById(voiceDeviceId);
        if (voiceDevice) {
            let date = new Date();
            orderItems.forEach((item) => {
                item.id = uuidv4();
                item.created = date;
            });
            let newOrder = {
                id: uuidv4(),
                created: date,
                timestamp: date,
                voiceDeviceId: voiceDevice.id,
                restaurantId: voiceDevice.restaurantId,
                items: orderItems
            };
            return this.createObject(this.className, newOrder);
        }
    };
    updateOrder (id, newData) {
        return this.updateObject(this.className, id, newData, ['status']);
    };
    deleteOrder (id) {
        return this.deleteObject(this.className, id);
    };
}
module.exports = RealmOrderController;
