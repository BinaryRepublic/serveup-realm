const RestaurantSchema = {
    name: 'Restaurant',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        accountId: 'string',
        name: 'string',
        street: 'string',
        postCode: 'string',
        city: 'string',
        country: 'string',
        deleted: 'date?'
    }
};
module.exports = RestaurantSchema;
