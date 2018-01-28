const OrderItemSchema = {
    name: 'OrderItem',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        size: 'int',
        count: 'int',
        orderId: 'string'
    }
};
module.exports = OrderItemSchema;
