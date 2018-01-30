const AdressSchema = {
    name: 'Address',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        street: 'string',
        postCode: 'string',
        city: 'string',
        country: 'string',
        deleted: 'date?'
    }
};
module.exports = AdressSchema;
