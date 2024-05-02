/**
 * @author WMXPY
 * @namespace Configuration
 * @description Raw Definition
 */

import { IImbricateConfigurationProfile } from "./definition";
import { ConfigurationEditorPreset, configurationEditorVscodeNewWindowPreset } from "./editor/presets";

export interface IImbricateConfigurationOrigin {

    readonly originName: string;

    readonly type: string;
    readonly payloads: Record<string, any>;
}

export interface IRawImbricateConfiguration {

    readonly origins: Array<IImbricateConfigurationOrigin>;
    readonly activeOrigin: string | null;

    readonly profiles: Record<string, IImbricateConfigurationProfile>;
    readonly defaultProfile: string;
}

export const getDefaultRawImbricateConfiguration = (): IRawImbricateConfiguration => {

    const vscodeNewWindowPreset: ConfigurationEditorPreset =
        configurationEditorVscodeNewWindowPreset;

    return {

        origins: [],
        activeOrigin: null,

        profiles: {
            "$default": {
                editCommand: vscodeNewWindowPreset.editCommand,
                editHandsFreeCommand: vscodeNewWindowPreset.editHandsFreeCommand,
                diffCommand: vscodeNewWindowPreset.diffCommand,
            },
        },
        defaultProfile: "$default",
    };
};
