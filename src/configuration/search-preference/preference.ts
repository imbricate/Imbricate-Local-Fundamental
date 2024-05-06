/**
 * @author WMXPY
 * @namespace Configuration_SearchPreference
 * @description Preference
 */

import { writeTextFile } from "@sudoo/io";
import { concatSearchPreferencePath } from "../../directory/directory-concat";
import { formatJSON } from "../../format/format-json";
import { createOrGetFile } from "../common";
import { ImbricateSearchPreference, IncludedSearchPreference } from "./definition";

export const persistSearchPreferenceConfiguration = async (
    configurationPath: string,
    configuration: ImbricateSearchPreference,
): Promise<void> => {

    const configurationText: string = formatJSON(configuration);
    const configurationFilePath: string = concatSearchPreferencePath(
        configurationPath,
    );

    await writeTextFile(configurationFilePath, configurationText);
};

export const readOrCreateSearchPreferenceConfiguration = async (
    configurationPath: string,
): Promise<ImbricateSearchPreference> => {

    const configurationFilePath: string = concatSearchPreferencePath(
        configurationPath,
    );

    const configurationText: string = await createOrGetFile(
        configurationFilePath,
        formatJSON({
            included: [],
        } satisfies ImbricateSearchPreference),
    );

    const configuration: ImbricateSearchPreference = JSON.parse(configurationText);

    return configuration;
};

export const includeCollectionInSearch = async (
    configurationPath: string,
    originName: string,
    collectionUniqueIdentifier: string,
): Promise<void> => {

    const preferences: ImbricateSearchPreference = await readOrCreateSearchPreferenceConfiguration(
        configurationPath,
    );

    const newPreferences: IncludedSearchPreference[] = [
        ...preferences.included,
        {
            originName,
            collectionUniqueIdentifier,
        },
    ];

    await persistSearchPreferenceConfiguration(configurationPath, {
        included: newPreferences,
    });
};

export const excludeCollectionInSearch = async (
    configurationPath: string,
    originName: string,
    collectionUniqueIdentifier: string,
): Promise<void> => {

    const preferences: ImbricateSearchPreference = await readOrCreateSearchPreferenceConfiguration(
        configurationPath,
    );

    const newPreferences: IncludedSearchPreference[] = preferences.included.filter((preference: IncludedSearchPreference) => {
        return preference.originName !== originName
            || preference.collectionUniqueIdentifier !== collectionUniqueIdentifier;
    });

    await persistSearchPreferenceConfiguration(configurationPath, {
        included: newPreferences,
    });
};
