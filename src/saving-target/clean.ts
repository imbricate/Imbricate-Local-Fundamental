/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Clean
 */

import { readActiveEditing, writeActiveEditing } from "../active-editing/active-editing";
import { ActiveEditing } from "../active-editing/definition";
import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";
import { hashSavingTarget } from "./hash";

export const cleanupSavingTarget = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
): Promise<void> => {

    const activeEditing: ActiveEditing[] = await readActiveEditing();

    const savingTargetHash = hashSavingTarget(savingTarget);
    const updatedActiveEditing: ActiveEditing[] = activeEditing.filter(
        (item: ActiveEditing) => {
            return item.hash !== savingTargetHash;
        },
    );

    await writeActiveEditing(updatedActiveEditing);
};
