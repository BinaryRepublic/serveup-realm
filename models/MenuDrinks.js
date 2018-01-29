const MenuDrinksSchema = {
    name: 'MenuDrinks',
    primaryKey: 'id',
    properties: {
        id: 'string',
        layer1: 'bool',
        name: 'string',
        synonym: 'string[]',
        default: 'string?',
        child: 'MenuDrinks[]',
        productName: 'string?',
        var: 'MenuDrinksVar[]',
        alone: 'bool?'
    }
};
module.exports = MenuDrinksSchema;
