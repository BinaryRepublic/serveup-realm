const RestaurantSchema = {
    name: 'Restaurant',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        account: 'Account',
        name: 'string',
        address: 'Address',
        deleted: 'date?'
    }
};
module.exports = RestaurantSchema;
