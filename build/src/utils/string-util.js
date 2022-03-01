"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLineEndings = exports.uppercaseFirstLetter = void 0;
const uppercaseFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);
exports.uppercaseFirstLetter = uppercaseFirstLetter;
const getLineEndings = (text) => {
    const semicolon = text.includes(';');
    if (semicolon) {
        return ';';
    }
    else {
        return '';
    }
};
exports.getLineEndings = getLineEndings;
//# sourceMappingURL=string-util.js.map