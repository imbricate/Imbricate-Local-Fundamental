/**
 * @author WMXPY
 * @namespace Util
 * @description Validate Filename
 */

export const validateFilename = (filename: string): boolean => {

    if (filename.length < 1) {
        return false;
    }

    if (filename.includes("/")) {
        return false;
    }

    if (filename.includes("\\")) {
        return false;
    }

    return true;
};
