const RestaurantSchema = {
	name: 'Restaurant',
	primaryKey: 'id',
	properties: {
	  	id:  'string',
		owner: 'Account',
		name: 'string'
	}
}
module.exports = RestaurantSchema