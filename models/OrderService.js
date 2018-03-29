const OrderServiceSchema = {
    name: 'OrderService',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        name: 'string',
        deleted: 'date?'
    }
};
module.exports = OrderServiceSchema;
