/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Perform
 */

import { SavingTargetPerformFailedError } from "../error/saving-target/perform-failed";
import { ImbricateOriginManager } from "../origin/origin-manager";
import { cleanupSavingTarget } from "./clean";
import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";

export const performImbricateSavingTarget = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
    content: string,
    originManager: ImbricateOriginManager,
): Promise<void> => {

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
                throw SavingTargetPerformFailedError.collectionNotFound(fixedTarget.payload.collection);
            }

            const page = await collection.getPage(fixedTarget.payload.identifier);
            if (!page) {
                throw SavingTargetPerformFailedError.pageNotFound(fixedTarget.payload.identifier);
            }

            await page.writeContent(content);
            await page.refreshUpdatedAt(new Date());
            break;
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

            await script.writeScript(content);
            await script.refreshUpdatedAt(new Date());
            break;
        }
    }

    await cleanupSavingTarget(savingTarget);
};
