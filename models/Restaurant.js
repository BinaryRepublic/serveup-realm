const RestaurantSchema = {
	name: 'Restaurant',
	primaryKey: 'id',
	properties: {
	  	id:  'string',
		ownerId: 'string',
		name: 'string'
	}
}
module.exports = RestaurantSchema