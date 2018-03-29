const ServiceItemSchema = {
    name: 'ServiceItem',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        name: 'string',
        deleted: 'date?'
    }
};
module.exports = ServiceItemSchema;
