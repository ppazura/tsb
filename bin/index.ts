#!/usr/bin/env node

import {getLineEndings, uppercaseFirstLetter} from "./utils/string-util";
import {getTypeAliasName} from "./utils/type-alias-name-util";
import {getTypeAliasProperties} from "./utils/type-alias-properties-util";
import {getTypeAliasDataTypes} from "./utils/type-alias-data-types-util";
import {IPropertyOutput} from "./interfaces/property-output.interface";
import {getInitalPropertyValue} from "./utils/initial-property-value-util";

const path = require('path')
const fs = require('fs');
const process = require('process');

console.log("Current working directory: ", process.cwd());

const text = fs.readFileSync(path.resolve(process.cwd(), 'interface.ts'), 'utf8')
console.log(text)

const lineBreak = '\r\n'
const indent = '  ' // (e.g. tab vs spaces)
let lineEnding = '' // line-ending (e.g. semicolon)


// if (!typeName) return  null;
export const generatePropertyOutput = (
    properties: string[],
    dataTypes: string[]
): IPropertyOutput => {
    const output: IPropertyOutput = {
        definitions: [],
        externalSetters: [],
        localSetters: []
    }
    properties.forEach((p, i) => {
        const t = indent
        const b = lineBreak
        const e = lineEnding
        const dataType = dataTypes[i]
        const value = getInitalPropertyValue(dataType)
        let className = uppercaseFirstLetter(p)
        className = className.replace('?', '')
        output.definitions.push(`private ${p}: ${dataType} = ${value}${e}`)
        // Strip any '?' from optional properties
        p = p.replace('?', '')
        output.localSetters.push(`${p}: this.${p}`)
        let propertyExternalSetter = ''
        propertyExternalSetter += `public with${className}(value: ${dataType}) {${b}`
        propertyExternalSetter += `${t}${t}this.${p} = value${e}${b}`
        propertyExternalSetter += `${t}${t}return this${e}${b}`
        propertyExternalSetter += `${t}}`
        output.externalSetters.push(propertyExternalSetter)
    })
    return output
}

export const generateClass = (
    typeName: string,
    output: IPropertyOutput
): string => {
    const t = indent
    const b = lineBreak
    const e = lineEnding
    const definitions = output.definitions.join(`${b}${t}`)
    const localSetters = output.localSetters.join(`,${b}${t}${t}${t}`)
    const externalSetters = output.externalSetters.join(`${b}${b}${t}`)
    let classString = ''
    classString += `export class ${typeName}Builder {${b}`
    classString += `${t}${definitions}${b}${b}`
    classString += `${t}public build(): ${typeName} {${b}`
    classString += `${t}${t}return {${b}`
    classString += `${t}${t}${t}${localSetters}${b}`
    classString += `${t}${t}}${e}${b}`
    classString += `${t}}${b}${b}`
    classString += `${t}${externalSetters}${b}`
    classString += `}${b}`
    return classString
}

export const saveBuilderFile = (
    text: string
) => {
    const filePath = process.cwd();
    const fileName = filePath.match(/[^\\/]+(?=\.ts)/)![0]
    // Try to match the file naming convention.
    const numOfDots = fileName.split('.').length
    let builder = 'Builder'
    if (numOfDots > 1) {
        builder = '.builder'
    }

    // Writes the file to the current editor directory
    try {
        let folderPath = filePath.substring(0, filePath.lastIndexOf('/'))
        if (!folderPath) {
            folderPath = filePath.substring(0, filePath.lastIndexOf('\\'))
        }
        fs.writeFileSync(path.join(folderPath, `${fileName}${builder}.ts`), text)
        console.error(
            `Builder class saved to: ${path.join(
                folderPath,
                `${fileName}${builder}.ts`
            )}`
        )
    } catch (err) {
        console.error(`File save failed: ${err}`)
    }
}


lineEnding = getLineEndings(text);
const typeName = getTypeAliasName(text);
const properties = getTypeAliasProperties(text);
const dataTypes = getTypeAliasDataTypes(text);

// if (!properties || !dataTypes) return

const propertyOutput = generatePropertyOutput(properties, dataTypes);
const classString = generateClass(typeName, propertyOutput);

console.log('classString', classString)

// saveBuilderFile(classString);

