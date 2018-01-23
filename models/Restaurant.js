const RestaurantSchema = {
	name: 'Restaurant',
	primaryKey: 'id',
	properties: {
	  	id:  'string',
		owner: 'Account',
		name: 'string',
		created: 'date'
	}
}
module.exports = RestaurantSchema