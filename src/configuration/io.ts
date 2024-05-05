/**
 * @author WMXPY
 * @namespace Configuration
 * @description IO
 */

import { writeTextFile } from "@sudoo/io";
import { concatConfigurationPath } from "../directory/directory-concat";
import { formatJSON } from "../format/format-json";
import { createOrGetFile } from "./common";
import { IImbricateConfiguration } from "./definition";
import { parseRawImbricateConfiguration } from "./parse";
import { IRawImbricateConfiguration, getDefaultRawImbricateConfiguration } from "./raw-definition";

export const persistImbricateConfiguration = async (
    configurationPath: string,
    configuration: IRawImbricateConfiguration,
): Promise<void> => {

    const configurationText: string = formatJSON(configuration);
    const configurationFilePath: string = concatConfigurationPath(
        configurationPath,
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
