const OrderItemSchema = {
    name: 'OrderItem',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        name: 'string',
        size: 'int',
        nb: 'int',
        deleted: 'date?'
    }
};
module.exports = OrderItemSchema;
