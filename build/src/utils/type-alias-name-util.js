"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeAliasName = void 0;
const getTypeAliasName = (text) => {
    const typeAliasNames = text.match(/(?<=\bexport interface\s)(\w+)/);
    if (!typeAliasNames) {
        console.error('Could not find the type alias name.');
        return null;
    }
    return typeAliasNames[0];
};
exports.getTypeAliasName = getTypeAliasName;
//# sourceMappingURL=type-alias-name-util.js.map