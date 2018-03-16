'use strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');

class RealmVoiceDeviceController extends ParentRealmController {
    constructor (callback) {
        super(callback);
        this.className = 'VoiceDevice';
    }
    getVoiceDeviceById (id) {
        return this.objectWithId(this.className, id);
    };
    getVoiceDevicesByRestaurantId (restaurantId) {
        if (this.restaurantController.getRestaurantById(restaurantId)) {
            return this.objectsWithFilter(this.className, 'restaurantId == "' + restaurantId + '"');
        }
    };
    createVoiceDevice (restaurantId, voiceDeviceJSON) {
        voiceDeviceJSON.id = uuidv4();
        voiceDeviceJSON.created = new Date();
        voiceDeviceJSON.restaurantId = restaurantId;
        return this.createObject(this.className, voiceDeviceJSON);
    };
    updateVoiceDevice (id, newData) {
        return this.updateObject(this.className, id, newData, ['number', 'restaurant']);
    };
    deleteVoiceDevice (id) {
        return this.deleteObject(this.className, id);
    };
}
module.exports = RealmVoiceDeviceController;
