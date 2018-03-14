const MenuDrinksSchema = {
    name: 'MenuDrinks',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        layer1: 'bool',
        name: 'string',
        synonym: 'string[]',
        default: 'string?',
        child: 'MenuDrinks[]',
        productName: 'string?',
        category: 'string',
        var: 'MenuDrinksVar[]',
        alone: 'bool?',
        deleted: 'date?'
    }
};
module.exports = MenuDrinksSchema;
