"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyOutputBuilder = void 0;
class PropertyOutputBuilder {
    constructor() {
        this.definitions = [];
        this.externalSetters = [];
        this.localSetters = [];
    }
    build() {
        return {
            definitions: this.definitions,
            externalSetters: this.externalSetters,
            localSetters: this.localSetters
        };
    }
    withDefinitions(value) {
        this.definitions = value;
        return this;
    }
    withExternalSetters(value) {
        this.externalSetters = value;
        return this;
    }
    withLocalSetters(value) {
        this.localSetters = value;
        return this;
    }
}
exports.PropertyOutputBuilder = PropertyOutputBuilder;
//# sourceMappingURL=property-output.interface.builder.js.map