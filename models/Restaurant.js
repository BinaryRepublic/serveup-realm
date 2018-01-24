const RestaurantSchema = {
	name: 'Restaurant',
	primaryKey: 'id',
	properties: {
	  	id:  'string',
		account: 'Account',
		name: 'string',
		created: 'date'
	}
}
module.exports = RestaurantSchema