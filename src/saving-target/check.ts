/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Check
 */

import { readActiveEditing } from "../active-editing/active-editing";
import { ActiveEditing } from "../active-editing/definition";
import { SAVING_TARGET_TYPE, SavingTarget } from "./definition";
import { hashSavingTarget } from "./hash";

export const checkSavingTargetActive = async (
    savingTarget: SavingTarget<SAVING_TARGET_TYPE>,
): Promise<boolean> => {

    const activeEditing: ActiveEditing[] = await readActiveEditing();

    const savingTargetHash = hashSavingTarget(savingTarget);
    for (const editing of activeEditing) {
        if (editing.hash === savingTargetHash) {
            return true;
        }
    }

    return false;
};
