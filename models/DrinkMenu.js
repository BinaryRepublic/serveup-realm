const DrinkMenuSchema = {
	name: 'DrinkMenu',
	primaryKey: 'id',
	properties: {
		id:  'string',
		created: 'date',
		name: 'string',
		drinks: 'Drink[]',
		restaurantId: 'string'
	}
}
module.exports = DrinkMenuSchema