const RestaurantSchema = {
    name: 'Restaurant',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        account: 'Account',
        name: 'string',
        address: 'Address',
        drinkMenus: 'DrinkMenu[]'
    }
};
module.exports = RestaurantSchema;
