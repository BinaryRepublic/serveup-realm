const AccountSchema = {
	name: 'Account',
	primaryKey: 'id',
	properties: {
	  	id:  'string',
		created: 'date',
		mail: 'string',
		firstName: 'string',
		surname: 'string',
		street: 'string',
		postCode: 'int',
		city: 'string',
		country: 'string'
	}
}
module.exports = AccountSchema