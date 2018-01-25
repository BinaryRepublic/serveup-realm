const AdressSchema = {
	name: 'Address',
	primaryKey: 'id',
	properties: {
		id:  'string',
		created: 'date',
		street: 'string',
		postCode: 'int',
		city: 'string',
		country: 'string'
	}
}
module.exports = AdressSchema
		