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
        address: 'Address',
        phone: 'string',
        deleted: 'date?'
    }
};
module.exports = AccountSchema;
