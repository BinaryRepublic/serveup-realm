const DrinkVarSchema = {
    name: 'DrinkVar',
    primaryKey: 'id',
    properties: {
        id: 'string',
        size: 'int',
        price: 'float'
    }
}
module.exports = DrinkVarSchema