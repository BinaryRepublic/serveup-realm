const AccountSchema = {
    name: 'Account',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        mail: 'string',
        password: 'string',
        firstName: 'string',
        surName: 'string',
        street: 'string',
        postCode: 'string',
        city: 'string',
        country: 'string',
        phone: 'string',
        deleted: 'date?'
    }
};
module.exports = AccountSchema;
