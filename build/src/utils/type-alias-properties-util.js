"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeAliasProperties = void 0;
const getTypeAliasProperties = (text) => {
    let properties = text.match(/(\w*[^\s][ \t]*)(?=:)/gm);
    if (!properties) {
        console.error('Could not find any properties defined in the type alias.');
        return null;
    }
    properties = properties.map(p => p.trim());
    return properties;
};
exports.getTypeAliasProperties = getTypeAliasProperties;
//# sourceMappingURL=type-alias-properties-util.js.map