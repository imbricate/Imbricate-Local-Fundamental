/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Check
 */

import { readActiveEditing } from "../active-editing/active-editing";
import { ActiveEditing } from "../active-editing/definition";
import { SavingTargetCheckFailedError } from "../error/saving-target/check-failed";
import { ImbricateOriginManager } from "../origin/origin-manager";
import { digestString } from "../util/digest";
import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";
import { hashImbricateSavingTarget } from "./hash";

/**
 * Check saving target active
 * 
 * @param savingTarget saving target
 * 
 * @returns whether the saving target is active
 */
export const checkSavingTargetActive = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
): Promise<boolean> => {

    const activeEditing: ActiveEditing[] = await readActiveEditing();

    const savingTargetHash: string = hashImbricateSavingTarget(savingTarget);
    for (const editing of activeEditing) {
        if (editing.hash === savingTargetHash) {
            return true;
        }
    }

    return false;
};

/**
 * Check saving target conflict
 * 
 * @param savingTarget saving target
 * @param originalDigest original digest
 * @param originManager origin manager
 * 
 * @returns whether the saving target is conflicted
 */
export const checkSavingTargetConflict = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
    originalDigest: string,
    originManager: ImbricateOriginManager,
): Promise<boolean> => {

    switch (savingTarget.type) {

        case SAVING_TARGET_TYPE.PAGE: {

            const fixedTarget: SavingTarget<SAVING_TARGET_TYPE.PAGE> =
                savingTarget as SavingTarget<SAVING_TARGET_TYPE.PAGE>;

            const origin = originManager.getOrigin(fixedTarget.payload.origin);
            if (!origin) {
                throw SavingTargetCheckFailedError.originNotFound(fixedTarget.payload.origin);
            }

            const collection = await origin
                .getCollectionManager()
                .getCollection(fixedTarget.payload.collection);

            if (!collection) {
                throw SavingTargetCheckFailedError.collectionNotFound(
                    fixedTarget.payload.collection,
                );
            }

            const page = await collection.getPage(fixedTarget.payload.identifier);
            if (!page) {
                throw SavingTargetCheckFailedError.pageNotFound(fixedTarget.payload.identifier);
            }

            const currentContent: string = await page.readContent();
            const currentDigest: string = digestString(currentContent);

            return currentDigest !== originalDigest;
        }
        case SAVING_TARGET_TYPE.SCRIPT: {

            const origin = originManager.getOrigin(savingTarget.payload.origin);
            if (!origin) {
                throw SavingTargetCheckFailedError.originNotFound(savingTarget.payload.origin);
            }

            const script = await origin
                .getScriptManager()
                .getScript(savingTarget.payload.identifier);

            if (!script) {
                throw SavingTargetCheckFailedError.scriptNotFound(savingTarget.payload.identifier);
            }

            const currentContent: string = await script.readScript();
            const currentDigest: string = digestString(currentContent);

            return currentDigest !== originalDigest;
        }
    }
};
