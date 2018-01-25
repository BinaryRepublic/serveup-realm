const AccountSchema = {
	name: 'Account',
	primaryKey: 'id',
	properties: {
		id:  'string',
		created: 'date',
		mail: 'string',
		password: 'string',
		firstName: 'string',
		surname: 'string',
		address: 'Address',
		phone: 'string'
	}
}
module.exports = AccountSchema