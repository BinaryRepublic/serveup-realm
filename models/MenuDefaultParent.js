const MenuDefaultParentSchema = {
    name: 'MenuDefaultParent',
    primaryKey: 'id',
    properties: {
        id: 'string',
        created: 'date',
        name: 'string',
        parent: 'string',
        deleted: 'date?'
    }
};
module.exports = MenuDefaultParentSchema;
