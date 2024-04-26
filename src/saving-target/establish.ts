/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Establish
 */

import { attemptMarkDir, writeTextFile } from "@sudoo/io";
import { UUIDVersion1 } from "@sudoo/uuid";
import { readActiveEditing, writeActiveEditing } from "../active-editing/active-editing";
import { ActiveEditing } from "../active-editing/definition";
import { resolveImbricateTempDirectory } from "../directory/directory-resolve";
import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";
import { hashImbricateSavingTarget } from "./hash";

export const establishImbricateSavingTarget = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
    fileName: string,
    content: string,
): Promise<ActiveEditing> => {

    const activeEditing: ActiveEditing[] = await readActiveEditing();

    const savingTargetHash: string = hashImbricateSavingTarget(savingTarget);

    for (const editing of activeEditing) {
        if (editing.hash === savingTargetHash) {
            return editing;
        }
    }

    const editingIdentifier: string = UUIDVersion1.generateString();

    const tempFolderPath: string = resolveImbricateTempDirectory();
    await attemptMarkDir(tempFolderPath);

    const outerTempFolderPath: string = resolveImbricateTempDirectory(editingIdentifier);
    await attemptMarkDir(outerTempFolderPath);

    const tempFilePath: string = resolveImbricateTempDirectory(editingIdentifier, fileName);

    const currentTime: Date = new Date();

    const newActiveEditing: ActiveEditing = {
        identifier: editingIdentifier,
        hash: savingTargetHash,
        path: tempFilePath,
        startedAt: currentTime,
        target: savingTarget,
    };

    const updatedActiveEditing: ActiveEditing[] = [
        ...activeEditing,
        newActiveEditing,
    ];

    await writeActiveEditing(updatedActiveEditing);
    await writeTextFile(tempFilePath, content);

    return newActiveEditing;
};
