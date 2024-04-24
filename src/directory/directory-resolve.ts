/**
 * @author WMXPY
 * @namespace Directory
 * @description Directory Resolve
 */

import { concatDirectory, resolveDirectory } from "./directory";

export const resolveHomeDirectory = (...paths: string[]): string => {

    const homePath: string = process.env.HOME || process.env.USERPROFILE || "~";
    const resolvedPath: string = resolveDirectory(homePath, ...paths);

    return resolvedPath;
};

export const resolveImbricateHomeDirectory = (...paths: string[]): string => {

    const configurationPath: string = resolveHomeDirectory(".imbricate");
    return concatDirectory(configurationPath, ...paths);
};

export const resolveImbricateTempDirectory = (...paths: string[]): string => {

    const configurationPath: string = resolveImbricateHomeDirectory();
    return concatDirectory(configurationPath, "temp", ...paths);
};
