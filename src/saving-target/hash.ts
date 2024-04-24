/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Hash
 */

import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";

export const hashSavingTarget = (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
): string => {

    switch (savingTarget.type) {

        case SAVING_TARGET_TYPE.PAGE: {

            const origin = savingTarget.payload.origin;
            const collection = (savingTarget as SavingTarget<SAVING_TARGET_TYPE.PAGE>).payload.collection;
            const identifier = savingTarget.payload.identifier;
            return `PAGE:${origin}:${collection}:${identifier}`;
        }
        case SAVING_TARGET_TYPE.SCRIPT: {

            const origin = savingTarget.payload.origin;
            const identifier = savingTarget.payload.identifier;
            return `SCRIPT:${origin}:${identifier}`;
        }
    }
};
