/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Create
 */

import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";

export const createPageSavingTarget = (
    originName: string,
    collection: string,
    pageIdentifier: string,
): SavingTarget<SAVING_TARGET_TYPE.PAGE> => {

    return {

        type: SAVING_TARGET_TYPE.PAGE,
        payload: {
            origin: originName,
            collection,
            identifier: pageIdentifier,
        },
    };
};

export const createScriptSavingTarget = (
    originName: string,
    scriptIdentifier: string,
): SavingTarget<SAVING_TARGET_TYPE.SCRIPT> => {

    return {

        type: SAVING_TARGET_TYPE.SCRIPT,
        payload: {
            origin: originName,
            identifier: scriptIdentifier,
        },
    };
};
