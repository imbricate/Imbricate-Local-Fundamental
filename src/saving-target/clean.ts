/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Clean
 */

import { directoryFiles, removeDirectory, removeFile } from "@sudoo/io";
import { readActiveEditing, writeActiveEditing } from "../active-editing/active-editing";
import { ActiveEditing } from "../active-editing/definition";
import { getFolderPath } from "../directory/directory";
import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";
import { hashImbricateSavingTarget } from "./hash";

/**
 * Cleanup imbricate saving target
 * 
 * @param savingTarget saving target
 */
export const cleanupImbricateSavingTarget = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
): Promise<void> => {

    const activeEditing: ActiveEditing[] = await readActiveEditing();

    const savingTargetHash: string = hashImbricateSavingTarget(savingTarget);

    const targetActiveEditing: ActiveEditing | undefined = activeEditing.find(
        (item: ActiveEditing) => {
            return item.hash === savingTargetHash;
        },
    );

    if (!targetActiveEditing) {
        return;
    }

    const updatedActiveEditing: ActiveEditing[] = activeEditing.filter(
        (item: ActiveEditing) => {
            return item.hash !== targetActiveEditing.hash;
        },
    );

    await writeActiveEditing(updatedActiveEditing);

    const filePath: string = targetActiveEditing.path;
    const outerTempFolderPath: string = getFolderPath(filePath);

    await removeFile(filePath);

    const remainingFiles: string[] = await directoryFiles(outerTempFolderPath);
    if (remainingFiles.length === 0) {
        await removeDirectory(outerTempFolderPath);
    }
};
