/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Retrieve
 */

import { SavingTargetPerformFailedError } from "../error/saving-target/perform-failed";
import { ImbricateOriginManager } from "../origin/origin-manager";
import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";

/**
 * Retrieve imbricate saving target
 *
 * @param savingTarget saving target
 * @param originManager origin manager
 * @param defaultContent the default content if not found
 * 
 * @returns content of the saving target
 */
export const retrieveImbricateSavingTarget = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
    originManager: ImbricateOriginManager,
    defaultContent: string,
): Promise<string> => {

    switch (savingTarget.type) {
        case SAVING_TARGET_TYPE.PAGE: {

            const fixedTarget: SavingTarget<SAVING_TARGET_TYPE.PAGE> =
                savingTarget as SavingTarget<SAVING_TARGET_TYPE.PAGE>;

            const origin = originManager.getOrigin(fixedTarget.payload.origin);
            if (!origin) {
                throw SavingTargetPerformFailedError.originNotFound(fixedTarget.payload.origin);
            }

            const collection = await origin.getCollection(fixedTarget.payload.collection);
            if (!collection) {
                throw SavingTargetPerformFailedError.collectionNotFound(
                    fixedTarget.payload.collection,
                );
            }

            const page = await collection.getPage(fixedTarget.payload.identifier);
            if (!page) {
                throw SavingTargetPerformFailedError.pageNotFound(fixedTarget.payload.identifier);
            }

            const currentContent: string = await page.readContent();
            return currentContent;
        }
        case SAVING_TARGET_TYPE.SCRIPT: {

            const origin = originManager.getOrigin(savingTarget.payload.origin);
            if (!origin) {
                throw SavingTargetPerformFailedError.originNotFound(savingTarget.payload.origin);
            }

            const script = await origin.getScript(savingTarget.payload.identifier);
            if (!script) {
                throw SavingTargetPerformFailedError.scriptNotFound(savingTarget.payload.identifier);
            }

            const currentContent: string = await script.readScript();
            return currentContent;
        }
    }

    return defaultContent;
};
