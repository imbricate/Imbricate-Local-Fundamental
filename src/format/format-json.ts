/**
 * @author WMXPY
 * @namespace Format
 * @description Format JSON
 */

export const formatJSON = (input: any): string => {

    return JSON.stringify(input, null, 2);
};
