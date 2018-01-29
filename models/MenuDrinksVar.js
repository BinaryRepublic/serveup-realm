const MenuDrinksVarSchema = {
    name: 'MenuDrinksVar',
    primaryKey: 'id',
    properties: {
        id: 'string',
        size: 'int',
        price: 'double',
        default: 'bool?'
    }
};
module.exports = MenuDrinksVarSchema;
