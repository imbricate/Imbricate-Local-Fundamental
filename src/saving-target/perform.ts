/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Perform
 */

import { SavingTargetPerformFailedError } from "../error/saving-target/perform-failed";
import { ImbricateOriginManager } from "../origin/origin-manager";
import { debugLog } from "../util/debug";
import { digestString } from "../util/digest";
import { cleanupImbricateSavingTarget } from "./clean";
import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";

export type PerformImbricateSavingTargetOptions = {

    readonly force: boolean;
    readonly cancelIfNoChange: boolean;
    readonly cleanup: boolean;
};

const fixPerformImbricateSavingTargetOptions = (
    options: Partial<PerformImbricateSavingTargetOptions>,
): PerformImbricateSavingTargetOptions => {

    const defaultOptions: PerformImbricateSavingTargetOptions = {

        force: false,
        cancelIfNoChange: true,
        cleanup: true,
    };

    return {
        ...defaultOptions,
        ...options,
    };
};

/**
 * Perform imbricate saving target
 * - If cancelIfNoChange is true, will cancel the saving if the content is not changed
 * - If cancelIfNoChange is false, will always save the content
 * - If force is true, will save the content even if the original digest is not matched
 * - If force is false, will cancel the saving if the original digest is not matched
 * - If cleanup is true, will cleanup after saving
 * - If cleanup is false, will not cleanup after saving
 * 
 * @param savingTarget saving target
 * @param originalDigest original digest
 * @param content content
 * @param originManager origin manager
 * @param cancelIfNoChange cancel if no change
 * @param cleanup cleanup after saving
 * 
 * @returns whether the saving performed or canceled, true if performed, false if canceled
 */
export const performImbricateSavingTarget = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
    originalDigest: string,
    content: string,
    originManager: ImbricateOriginManager,
    options: Partial<PerformImbricateSavingTargetOptions> = {},
): Promise<boolean> => {

    const fixedOptions: PerformImbricateSavingTargetOptions = fixPerformImbricateSavingTargetOptions(options);

    const updateTime: Date = new Date();
    const updatedDigest: string = digestString(content);

    const performCleanup = async () => {
        if (fixedOptions.cleanup) {
            await cleanupImbricateSavingTarget(savingTarget);
        }
    };

    switch (savingTarget.type) {

        case SAVING_TARGET_TYPE.PAGE: {

            const fixedTarget: SavingTarget<SAVING_TARGET_TYPE.PAGE> =
                savingTarget as SavingTarget<SAVING_TARGET_TYPE.PAGE>;

            const origin = originManager.getOrigin(fixedTarget.payload.origin);
            if (!origin) {
                throw SavingTargetPerformFailedError.originNotFound(fixedTarget.payload.origin);
            }

            const collection = await origin
                .getCollectionManager()
                .getCollection(fixedTarget.payload.collection);

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
            const currentDigest: string = digestString(currentContent);

            if (currentDigest !== originalDigest) {

                if (!fixedOptions.force) {

                    debugLog(`Digest not matched, current: ${currentDigest}, original: ${originalDigest}`);
                    return false;
                }
            }

            if (fixedOptions.cancelIfNoChange) {

                if (currentDigest === updatedDigest) {

                    debugLog(`Digest not changed, current: ${currentDigest}, updated: ${updatedDigest}`);
                    await performCleanup();
                    return false;
                }
            }

            await page.writeContent(content);
            await page.refreshUpdateMetadata(updateTime, updatedDigest);

            break;
        }
        case SAVING_TARGET_TYPE.SCRIPT: {

            const origin = originManager.getOrigin(savingTarget.payload.origin);
            if (!origin) {
                throw SavingTargetPerformFailedError.originNotFound(savingTarget.payload.origin);
            }

            const script = await origin
                .getScriptManager()
                .getScript(savingTarget.payload.identifier);

            if (!script) {
                throw SavingTargetPerformFailedError.scriptNotFound(savingTarget.payload.identifier);
            }

            const currentContent: string = await script.readScript();
            const currentDigest: string = digestString(currentContent);

            if (currentDigest !== originalDigest) {

                if (!fixedOptions.force) {

                    debugLog(`Digest not matched, current: ${currentDigest}, original: ${originalDigest}`);
                    return false;
                }
            }

            if (fixedOptions.cancelIfNoChange) {

                if (currentDigest === updatedDigest) {

                    debugLog(`Digest not changed, current: ${currentDigest}, updated: ${updatedDigest}`);
                    await performCleanup();
                    return false;
                }
            }

            await script.writeScript(content);
            await script.refreshUpdateMetadata(updateTime, updatedDigest);

            break;
        }
    }

    await performCleanup();
    return true;
};
