const OrderSchema = {
    name: 'Order',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        timestamp: 'date',
        items: 'OrderItem[]',
        voiceDeviceId: 'string',
        restaurantId: 'string',
        status: {type: 'int', default: 0},
        deleted: 'date?'
    }
};
module.exports = OrderSchema;
