'use_strict';

const uuidv4 = require('uuid/v4');
const ParentRealmController = require('../ParentRealmController');

class RealmVoiceDeviceController extends ParentRealmController {
    constructor (callback) {
        super(callback);
        this.className = 'VoiceDevice';
    }
    getVoiceDevice (id) {
        let voiceDevice = this.objectWithId(this.className, id);
        return voiceDevice;
    };
    getVoiceDevices (restaurantId) {
        let filterString = `restaurant.id == '${restaurantId}'`;
        let voiceDevices = this.objectsWithFilter(this.className, filterString);
        return voiceDevices;
    };
    createVoiceDevice (restaurantId, voiceDeviceJSON) {
        let restaurant = this.objectWithId('Restaurant', restaurantId);
        if (restaurant) {
            voiceDeviceJSON.id = uuidv4();
            voiceDeviceJSON.created = new Date();
            voiceDeviceJSON.restaurant = restaurant;
            let voiceDevice = this.createObject(this.className, voiceDeviceJSON);
            return voiceDevice;
        }
    };
    updateVoiceDevice (id, newData) {
        let voiceDevice = this.updateObject(this.className, id, newData, ['number', 'restaurant']);
        return voiceDevice;
    };
}
module.exports = RealmVoiceDeviceController;
