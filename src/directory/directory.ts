/**
 * @author WMXPY
 * @namespace Directory
 * @description Directory Resolve
 */

import * as Path from "path";

export const resolveDirectory = (...paths: string[]): string => {

    const resolvedPath: string = Path.resolve(...paths);

    return resolvedPath;
};

export const concatDirectory = (...paths: string[]): string => {

    const resolvedPath: string = Path.join(...paths);

    return resolvedPath;
};

export const getFolderPath = (filePath: string): string => {

    const parsedPath: Path.ParsedPath = Path.parse(filePath);
    return parsedPath.dir;
};
