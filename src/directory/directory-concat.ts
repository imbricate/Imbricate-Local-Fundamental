/**
 * @author WMXPY
 * @namespace Directory
 * @description Directory Concat
 */

import { concatDirectory } from "./directory";

export const concatConfigurationPath = (configurationPath: string): string => {

    return concatDirectory(
        configurationPath,
        "imbricate.config.json",
    );
};

export const concatSearchPreferencePath = (configurationPath: string): string => {

    return concatDirectory(
        configurationPath,
        "search-preference.json",
    );
};
