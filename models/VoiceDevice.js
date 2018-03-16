const VoiceDeviceSchema = {
    name: 'VoiceDevice',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        number: 'string',
        restaurantId: 'string',
        deleted: 'date?'
    }
};
module.exports = VoiceDeviceSchema;
