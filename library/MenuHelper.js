'use strict';

const ParentRealmController = require('../ParentRealmController');
const uuidv4 = require('uuid/v4');

class DrinkHelper extends ParentRealmController {
    constructor () {
        super();
        this.drinks = 'drinks';
        this.defaultParents = 'defaultParents';
    }

    // menu validation
    validateMenu (menu) {
        // remove empty arrays
        menu = this.formatRealmObj(menu, true);
        // --- prepare error handling
        let errors = [];
        let createErr = (objName, type, name, index = false) => {
            let errorStr = objName + ': ';
            if (objName === this.defaultParents) {
                switch (type) {
                case 'duplicate':
                    errorStr += 'duplicated name in ' + objName + ' at name "' + name + '"';
                    break;
                case 'defaultParent-not-found':
                    errorStr += 'defaultParent not found for name "' + name + '"';
                    break;
                }
            } else if (objName === this.drinks) {
                switch (type) {
                case 'default-not-found':
                    errorStr += 'default child was not found at name "' + name + '"';
                    break;
                case 'nameChain-duplicate':
                    errorStr += 'duplicated name in nameChain at name "' + name + '"';
                    break;
                case 'parent-required':
                    errorStr += 'not allowed to set childAttr (parentName, var) if child is set at name "' + name + '"';
                    break;
                case 'child-required':
                    errorStr += 'lowest child requires childAttr (parentName, var) at name "' + name + '"';
                    break;
                case 'var-attr-missing':
                    errorStr += 'DrinkVar params missing (price, size) params at name "' + name + '"';
                    break;
                }
            }
            errors.push(errorStr);
        };

        // --- check defaultParentDrink

        // search for duplicate names
        let namesArr = [];
        let defaultParentsChecklist = [];
        if (menu.defaultParents) {
            menu.defaultParents.forEach((defaultParentsItem, x) => {
                namesArr.forEach((namesArrItem, y) => {
                    if (defaultParentsItem.name === namesArrItem) {
                        // throw error
                        createErr(this.defaultParents, 'duplicate', defaultParentsItem.name);
                    } else {
                        namesArr.push(defaultParentsItem.name);
                    }
                });
            });
            defaultParentsChecklist = menu.defaultParents;
        }

        // --- check drinks

        let checkObj = (obj, parentObj = false, index = [], nameChain = []) => {
            // prepare check var
            let defaultFound = !(parentObj.default);
            obj.forEach((item, x) => {
                // prepare new index
                let newIndex = index.slice();
                newIndex.push(x);
                // prepare newParentObj
                let newParentObj = {
                    name: item.name,
                    default: item.default
                };
                // check default child
                if (parentObj.default && (!defaultFound && item.name === parentObj.default)) {
                    defaultFound = true;
                }
                // check default parent
                if (nameChain.length) {
                    for (let y = 0; y < defaultParentsChecklist.length; y++) {
                        let defaultParentsItem = defaultParentsChecklist[y];
                        if (defaultParentsItem.name === item.name && nameChain[nameChain.length - 1] === defaultParentsItem.parent) {
                            // remove parent item from checklist
                            defaultParentsChecklist.splice(y, 1);
                            break;
                        }
                    }
                }
                // check nameChain duplicates
                if (nameChain.length) {
                    nameChain.forEach((nameChainItem) => {
                        if (nameChainItem === item.name) {
                            createErr(this.drinks, 'nameChain-duplicate', item.name, newIndex);
                        }
                    });
                }
                // check child / productName / var combinations
                if (item.child && (item.productName || item.var)) {
                    createErr(this.drinks, 'parent-required', item.name, newIndex);
                } else if (!item.child && (!item.productName || !item.var)) {
                    createErr(this.drinks, 'child-required', item.name, newIndex);
                }
                // check if drinkVar is set correctly
                if (!item.child && item.var) {
                    item.var.forEach((drinkVar) => {
                        if (!drinkVar.price || !drinkVar.size) {
                            createErr(this.drinks, 'var-attr-missing', item.name, newIndex);
                        }
                    });
                }
                // call new child object recursive
                if (item.child && item.child.length) {
                    let newNameChain = nameChain.slice();
                    newNameChain.push(item.name);
                    checkObj(item.child, newParentObj, newIndex, newNameChain);
                }
                // check if default is set but there are no childrens
                if (item.default && !item.child) {
                    createErr(this.drinks, 'default-not-found', item.name, index);
                }
            });
            if (!defaultFound) {
                createErr(this.drinks, 'default-not-found', parentObj.name, index);
            }
        };
        if (menu.drinks) {
            checkObj(menu.drinks);
        }

        // checklists
        if (defaultParentsChecklist.length) {
            defaultParentsChecklist.forEach((defaultParents, x) => {
                createErr(this.defaultParents, 'defaultParent-not-found', defaultParents.name);
            });
        }

        if (!errors.length) {
            return true;
        } else {
            return (errors);
        }
    }
    prepareInsert (newMenu) {
        let date = new Date();
        // drinks
        let addDrinkId = (obj, layer1 = true) => {
            obj.forEach((drink) => {
                drink.id = uuidv4();
                drink.layer1 = layer1;
                drink.created = date;
                if (drink.child && drink.child.length) {
                    drink.child = addDrinkId(drink.child, false);
                } else if (drink.var && drink.var.length) {
                    drink.var.forEach((drinkVar) => {
                        drinkVar.id = uuidv4();
                        drinkVar.created = date;
                    });
                }
            });
            return obj;
        };
        newMenu.drinks = addDrinkId(newMenu.drinks);

        // defaultParents
        if (newMenu.defaultParents) {
            newMenu.defaultParents.map((item) => {
                item.id = uuidv4();
                item.created = date;
            });
        }
        return newMenu;
    }
}
module.exports = DrinkHelper;
