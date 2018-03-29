'use strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');
const RealmRestaurantController = require('./RealmRestaurantController');
const RealmVoiceDeviceController = require('./RealmVoiceDeviceController');

class RealmServiceController extends ParentRealmController {
    constructor (callback) {
        super(callback);
        this.className = 'Service';
        this.voiceDeviceController = new RealmVoiceDeviceController();
        this.restaurantController = new RealmRestaurantController();
    }
    getServiceById (id) {
        return this.objectWithId(this.className, id);
    };
    getServicesByRestaurantId (restaurantId) {
        // check if restaurant exists
        if (this.restaurantController.getRestaurantById(restaurantId)) {
            let filterString = `restaurantId == '${restaurantId}'`;
            return this.objectsWithFilter(this.className, filterString);
        }
    };
    createService (voiceDeviceId, serviceItems) {
        let voiceDevice = this.voiceDeviceController.getVoiceDeviceById(voiceDeviceId);
        if (voiceDevice) {
            let date = new Date();
            serviceItems.forEach((item) => {
                item.id = uuidv4();
                item.created = date;
            });
            let newService = {
                id: uuidv4(),
                created: date,
                timestamp: date,
                voiceDeviceId: voiceDevice.id,
                restaurantId: voiceDevice.restaurantId,
                items: serviceItems
            };
            return this.createObject(this.className, newService);
        }
    };
    updateService (id, newData) {
        return this.updateObject(this.className, id, newData, ['status']);
    };
    deleteService (id) {
        return this.deleteObject(this.className, id);
    };
}
module.exports = RealmServiceController;
