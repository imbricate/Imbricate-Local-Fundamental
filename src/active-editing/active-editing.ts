/**
 * @author WMXPY
 * @namespace ActiveEditing
 * @description Active Editing
 */

import { pathExists, readTextFile, writeTextFile } from "@sudoo/io";
import { resolveImbricateHomeDirectory } from "../directory/directory-resolve";
import { formatJSON } from "../format/format-json";
import { ActiveEditing } from "./definition";

const activeEditingConfigPath: string =
    resolveImbricateHomeDirectory("active-editing.json");

export const readActiveEditing = async (): Promise<ActiveEditing[]> => {

    const fileExist: boolean = await pathExists(activeEditingConfigPath);

    if (!fileExist) {
        return [];
    }
    const editingFileContent = await readTextFile(activeEditingConfigPath);
    const parsed: ActiveEditing[] = JSON.parse(editingFileContent);

    return parsed.map((item: ActiveEditing) => {
        return {
            ...item,
            startedAt: new Date(item.startedAt),
        };
    });
};

export const writeActiveEditing = async (newValue: ActiveEditing[]) => {

    const fixedValue = newValue.map((item: ActiveEditing) => {
        return {
            ...item,
            startedAt: item.startedAt.getTime(),
        };
    });

    await writeTextFile(
        activeEditingConfigPath,
        formatJSON(fixedValue),
    );
};
