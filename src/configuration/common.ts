/**
 * @author WMXPY
 * @namespace Configuration_SearchPreference
 * @description Preference
 */

import { attemptMarkDir, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";

export const createOrGetFile = async (
    path: string,
    defaultValue: string,
): Promise<string> => {

    const fileExist: boolean = await pathExists(path);

    if (fileExist) {
        return await readTextFile(path);
    }

    const folderPath = Path.dirname(path);

    await attemptMarkDir(folderPath);
    await writeTextFile(path, defaultValue);

    return defaultValue;
};
