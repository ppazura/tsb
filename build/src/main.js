#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBuilderFile = exports.generateClass = exports.generatePropertyOutput = void 0;
const string_util_1 = require("./utils/string-util");
const type_alias_name_util_1 = require("./utils/type-alias-name-util");
const type_alias_properties_util_1 = require("./utils/type-alias-properties-util");
const type_alias_data_types_util_1 = require("./utils/type-alias-data-types-util");
const initial_property_value_util_1 = require("./utils/initial-property-value-util");
const path = require("path");
const fs = require("fs");
const yargs = require("yargs");
const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "File name", type: "string", demandOption: true })
    .argv;
console.log("Current working directory: ", process.cwd());
const fileName = options.name.toString();
const text = fs.readFileSync(path.resolve(process.cwd(), fileName), 'utf8');
console.log(text);
const lineBreak = '\r\n';
const indent = '  ';
let lineEnding = '';
const generatePropertyOutput = (properties, dataTypes) => {
    const output = {
        definitions: [],
        externalSetters: [],
        localSetters: []
    };
    properties.forEach((p, i) => {
        const t = indent;
        const b = lineBreak;
        const e = lineEnding;
        const dataType = dataTypes[i];
        const value = (0, initial_property_value_util_1.getInitalPropertyValue)(dataType);
        let className = (0, string_util_1.uppercaseFirstLetter)(p);
        className = className.replace('?', '');
        output.definitions.push(`private ${p}: ${dataType} = ${value}${e}`);
        p = p.replace('?', '');
        output.localSetters.push(`${p}: this.${p}`);
        let propertyExternalSetter = '';
        propertyExternalSetter += `public with${className}(value: ${dataType}) {${b}`;
        propertyExternalSetter += `${t}${t}this.${p} = value${e}${b}`;
        propertyExternalSetter += `${t}${t}return this${e}${b}`;
        propertyExternalSetter += `${t}}`;
        output.externalSetters.push(propertyExternalSetter);
    });
    return output;
};
exports.generatePropertyOutput = generatePropertyOutput;
const generateClass = (typeName, output) => {
    const t = indent;
    const b = lineBreak;
    const e = lineEnding;
    const definitions = output.definitions.join(`${b}${t}`);
    const localSetters = output.localSetters.join(`,${b}${t}${t}${t}`);
    const externalSetters = output.externalSetters.join(`${b}${b}${t}`);
    let classString = '';
    classString += `export class ${typeName}Builder {${b}`;
    classString += `${t}${definitions}${b}${b}`;
    classString += `${t}public build(): ${typeName} {${b}`;
    classString += `${t}${t}return {${b}`;
    classString += `${t}${t}${t}${localSetters}${b}`;
    classString += `${t}${t}}${e}${b}`;
    classString += `${t}}${b}${b}`;
    classString += `${t}${externalSetters}${b}`;
    classString += `}${b}`;
    return classString;
};
exports.generateClass = generateClass;
const saveBuilderFile = (text, fileName) => {
    const filePath = process.cwd();
    fileName = fileName.match(/[^\\/]+(?=\.ts)/)[0];
    const numOfDots = fileName.split('.').length;
    let builder = '.builder';
    if (numOfDots > 1) {
        builder = '.builder';
    }
    try {
        const folderPath = filePath;
        fs.writeFileSync(path.join(folderPath, `${fileName}${builder}.ts`), text);
        console.error(`Builder class saved to: ${path.join(folderPath, `${fileName}${builder}.ts`)}`);
    }
    catch (err) {
        console.error(`File save failed: ${err}`);
    }
};
exports.saveBuilderFile = saveBuilderFile;
lineEnding = (0, string_util_1.getLineEndings)(text);
const typeName = (0, type_alias_name_util_1.getTypeAliasName)(text);
const properties = (0, type_alias_properties_util_1.getTypeAliasProperties)(text);
const dataTypes = (0, type_alias_data_types_util_1.getTypeAliasDataTypes)(text);
const propertyOutput = (0, exports.generatePropertyOutput)(properties, dataTypes);
const classString = (0, exports.generateClass)(typeName, propertyOutput);
(0, exports.saveBuilderFile)(classString, fileName);
//# sourceMappingURL=main.js.map