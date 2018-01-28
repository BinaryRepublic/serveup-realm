const MenuDefaultParentsSchema = {
    name: 'MenuDefaultParents',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        parent: 'string'
    }
};
module.exports = MenuDefaultParentsSchema;
