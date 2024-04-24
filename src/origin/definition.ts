/**
 * @author WMXPY
 * @namespace Origin
 * @description Definition
 */

import { IImbricateOrigin } from "@imbricate/core";
import { IImbricateConfigurationOrigin } from "../configuration/raw-definition";

export type ImbricateOriginManagerOriginResponse = {

    readonly originName: string;
    readonly origin: IImbricateOrigin;
};

export type ImbricateOriginConstructFunction = (originConfiguration: IImbricateConfigurationOrigin) => IImbricateOrigin;
