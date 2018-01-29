'use strict';

const ParentRealmController = require('../ParentRealmController');
const uuidv4 = require('uuid/v4');

class DrinkHelper extends ParentRealmController {
    constructor () {
        super();
        this.drinks = 'drinks';
        this.defaultParent = 'defaultParent';
    }

    // menu validation
    validateMenu (menu) {
        // --- prepare error handling
        let errors = [];
        let createErr = (objName, type, name, index = false) => {
            let errorStr = objName + ': ';
            if (objName === this.defaultParent) {
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
                }
            }
            errors.push(errorStr);
        };

        // --- check defaultParentDrink

        // search for duplicate names
        let namesArr = [];
        menu.defaultParent.forEach((defaultParentItem, x) => {
            namesArr.forEach((namesArrItem, y) => {
                if (defaultParentItem.name === namesArrItem) {
                    // throw error
                    createErr(this.defaultParent, 'duplicate', defaultParentItem.name);
                } else {
                    namesArr.push(defaultParentItem.name);
                }
            });
        });
        let defaultParentChecklist = menu.defaultParent;

        // --- check drinks

        let checkObj = (obj, parentObj = false, index = [], nameChain = []) => {
            // prepare check var
            let defaultFound = !!(parentObj.default);
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
                    for (let y = 0; y < defaultParentChecklist.length; y++) {
                        let defaultParentItem = defaultParentChecklist[y];
                        if (defaultParentItem.name === item.name && nameChain[nameChain.length - 1] === defaultParentItem.parent) {
                            // remove parent item from checklist
                            defaultParentChecklist.splice(y, 1);
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
                // call new child object recursive
                if (item.child && item.child.length) {
                    let newNameChain = nameChain.slice();
                    newNameChain.push(item.name);
                    checkObj(item.child, newParentObj, newIndex, newNameChain);
                }
            });
            if (!defaultFound) {
                createErr(this.drinks, 'default-not-found', parentObj.name, index);
            }
        };
        checkObj(menu.drinks);

        // checklists
        if (defaultParentChecklist.length) {
            defaultParentChecklist.forEach((defaultParent, x) => {
                createErr(this.defaultParent, 'defaultParent-not-found', defaultParent.name);
            });
        }

        if (!errors.length) {
            return true;
        } else {
            return (errors);
        }
    }
    prepareInsert (newMenu) {
        // drinks
        let addDrinkId = (obj, layer1 = true) => {
            obj.forEach((drink) => {
                drink.id = uuidv4();
                drink.layer1 = layer1;
                if (drink.child) {
                    drink.child = addDrinkId(drink.child, false);
                } else if (drink.var) {
                    drink.var.forEach((drinkVar) => {
                        drinkVar.id = uuidv4();
                    });
                }
            });
            return obj;
        };
        newMenu.drinks = addDrinkId(newMenu.drinks);

        // defaultParent
        newMenu.defaultParents.map((item) => {
            item.id = uuidv4();
        });

        return newMenu;
    }
}
module.exports = DrinkHelper;
