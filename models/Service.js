const ServiceSchema = {
    name: 'Service',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        timestamp: 'date',
        items: 'ServiceItem[]',
        voiceDeviceId: 'string',
        restaurantId: 'string',
        status: {type: 'int', default: 0},
        deleted: 'date?'
    }
};
module.exports = ServiceSchema;
