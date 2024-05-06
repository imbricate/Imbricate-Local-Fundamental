/**
 * @author WMXPY
 * @namespace Util
 * @description Validate Filename
 */

/**
 * Validate filename
 * - Filename should not be empty
 * - Filename should not contain / or \
 * 
 * Return null if valid, error message if invalid
 * 
 * @param filename 
 * @returns null if valid, error message if invalid
 */
export const validateFilename = (filename: string): string | null => {

    if (filename.length < 1) {
        return "Filename is too short";
    }

    if (filename.includes("/")) {
        return "Filename contains /";
    }

    if (filename.includes("\\")) {
        return "Filename contains \\";
    }

    return null;
};
