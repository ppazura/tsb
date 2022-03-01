/**
 * Determines the default value to set the builder property to, based on the provided type alias data type.
 *
 * @param dataType The data type of the property (e.g. number)
 */
export const getInitalPropertyValue = (dataType: string) => {
    if (dataType.includes('[]')) {
        return '[]'
    }

    switch (dataType) {
        case 'string':
            return undefined
        case 'number':
            return 1
        case 'boolean':
            return false
        default:
            return undefined
    }
}
