const RestaurantSchema = {
    name: 'Restaurant',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        accountId: 'string',
        name: 'string',
        address: 'Address',
        deleted: 'date?'
    }
};
module.exports = RestaurantSchema;
