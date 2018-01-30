const MenuDrinksVarSchema = {
    name: 'MenuDrinksVar',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        size: 'int',
        price: 'double',
        default: 'bool?',
        deleted: 'date?'
    }
};
module.exports = MenuDrinksVarSchema;
