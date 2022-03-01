/**
 * Extracts the property data types that are defined in the type.
 *
 * @param text      The type alias text
 * @param window    The VSCode Window
 */
export const getTypeAliasDataTypes = (text: string): string[] => {
    // Find all the property types defined in the type
    // by looking for words after a colon(:)
    const dataTypes = text.match(/(?<=:\s)([^\n\r;]+)/g)
    if (!dataTypes) {
        console.error(
            'Could not find any data types defined in the type alias.'
        )
        return null
    }
    return dataTypes
}
