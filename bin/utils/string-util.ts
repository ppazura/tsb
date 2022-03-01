/**
 * Converts the first letter of a string to uppercase.
 *
 * @param s The string to convert
 */
export const uppercaseFirstLetter = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1)

/**
 * Determines if the source text uses semicolons at the end of the lines.
 *
 * @param text The type alias text
 */
export const getLineEndings = (text: string) => {
    const semicolon = text.includes(';')
    if (semicolon) {
        return ';'
    } else {
        return ''
    }
}
