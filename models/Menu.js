const MenuSchema = {
    name: 'Menu',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        name: 'string',
        drinks: 'MenuDrinks[]',
        defaultParents: 'MenuDefaultParent[]',
        restaurantId: 'string',
        deleted: 'date?'
    }
};
module.exports = MenuSchema;
