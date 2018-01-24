const DrinkSchema = {
    name: 'Drink',
    primaryKey: 'id',
    properties: {
        id: 'string',
        layer1: 'bool',
        name: 'string',
        synonym: 'string[]',
        default: 'string?',
        child: 'Drink[]',
        productName: 'string?',
        var: 'DrinkVar[]',
        alone: 'bool?',
        restaurantId: 'string'
    }
}
module.exports = DrinkSchema