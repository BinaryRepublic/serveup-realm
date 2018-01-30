const VoiceDeviceSchema = {
    name: 'VoiceDevice',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        number: 'int',
        restaurantId: 'string',
        deleted: 'date?'
    }
};
module.exports = VoiceDeviceSchema;
