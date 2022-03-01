"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitalPropertyValue = void 0;
const getInitalPropertyValue = (dataType) => {
    if (dataType.includes('[]')) {
        return '[]';
    }
    switch (dataType) {
        case 'string':
            return undefined;
        case 'number':
            return 1;
        case 'boolean':
            return false;
        default:
            return undefined;
    }
};
exports.getInitalPropertyValue = getInitalPropertyValue;
//# sourceMappingURL=initial-property-value-util.js.map