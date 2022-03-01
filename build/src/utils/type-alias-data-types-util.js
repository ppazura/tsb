"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeAliasDataTypes = void 0;
const getTypeAliasDataTypes = (text) => {
    const dataTypes = text.match(/(?<=:\s)([^\n\r;]+)/g);
    if (!dataTypes) {
        console.error('Could not find any data types defined in the type alias.');
        return null;
    }
    return dataTypes;
};
exports.getTypeAliasDataTypes = getTypeAliasDataTypes;
//# sourceMappingURL=type-alias-data-types-util.js.map