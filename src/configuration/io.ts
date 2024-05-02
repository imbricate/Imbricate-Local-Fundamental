/**
 * @author WMXPY
 * @namespace Configuration
 * @description IO
 */

import { attemptMarkDir, pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";
import { resolveDirectory } from "../directory/directory";
import { concatConfigurationPath } from "../directory/directory-concat";
import { formatJSON } from "../format/format-json";
import { IImbricateConfiguration } from "./definition";
import { parseRawImbricateConfiguration } from "./parse";
import { IRawImbricateConfiguration, getDefaultRawImbricateConfiguration } from "./raw-definition";

const createOrGetFile = async (
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

export const persistImbricateConfiguration = async (
    configurationPath: string,
    configuration: IRawImbricateConfiguration,
): Promise<void> => {

    const configurationText: string = formatJSON(configuration);
    const configurationFilePath: string = resolveDirectory(
        configurationPath,
        "imbricate.config.json",
    );

    await writeTextFile(configurationFilePath, configurationText);
};

export const readOrCreateImbricateConfiguration = async (
    configurationPath: string,
): Promise<IImbricateConfiguration> => {

    const configuration: IRawImbricateConfiguration = await readOrCreateRawImbricateConfiguration(
        configurationPath,
    );

    const parsedConfiguration: IImbricateConfiguration =
        parseRawImbricateConfiguration(configuration);

    return parsedConfiguration;
};

export const readOrCreateRawImbricateConfiguration = async (
    configurationPath: string,
): Promise<IRawImbricateConfiguration> => {

    const configurationFilePath: string = concatConfigurationPath(
        configurationPath,
    );

    const configurationText: string = await createOrGetFile(
        configurationFilePath,
        formatJSON(getDefaultRawImbricateConfiguration()),
    );

    const configuration: IRawImbricateConfiguration = JSON.parse(configurationText);

    return configuration;
};
