/**
 * @author WMXPY
 * @namespace Configuration_SearchPreference
 * @description Definition
 */

export type ImbricateSearchPreference = {

    readonly included: IncludedSearchPreference[];
};

export type IncludedSearchPreference = {

    readonly originName: string;
    readonly collectionName: string;
};
