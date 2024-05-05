/**
 * @author WMXPY
 * @namespace Configuration_SearchPreference
 * @description Preference
 */

import { IncludedSearchPreference } from "./definition";

export const getIncludedSearchPreference = (): IncludedSearchPreference[] => {

    return [];
};

export const includeCollectionInSearch = (
    originName: string,
    collectionName: string,
): void => {

    const preferences: IncludedSearchPreference[] = getIncludedSearchPreference();
    preferences.push({
        originName,
        collectionName,
    });
};

export const excludeCollectionInSearch = (
    originName: string,
    collectionName: string,
): void => {

    const preferences: IncludedSearchPreference[] = getIncludedSearchPreference();
    const newPreferences: IncludedSearchPreference[] = preferences.filter((preference: IncludedSearchPreference) => {
        return preference.originName !== originName || preference.collectionName !== collectionName;
    });

    setIncludedSearchPreference(newPreferences);
};
