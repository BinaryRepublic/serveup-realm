const OrderSchema = {
    name: 'Order',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        timestamp: 'date',
        drinks: 'OrderDrink[]',
        services: 'OrderService[]',
        voiceDeviceId: 'string',
        restaurantId: 'string',
        status: {type: 'int', default: 0},
        tableNb: 'string',
        deleted: 'date?'
    }
};
module.exports = OrderSchema;
