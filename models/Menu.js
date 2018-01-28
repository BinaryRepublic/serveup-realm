const MenuSchema = {
    name: 'Menu',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        name: 'string',
        drinks: 'MenuDrinks[]',
        defaultParents: 'MenuDefaultParents[]',
        restaurantId: 'string'
    }
};
module.exports = MenuSchema;
