/**
 * @author WMXPY
 * @namespace Origin
 * @description Initialize
 */

import { IImbricateOrigin } from "@imbricate/core";
import { IImbricateConfigurationOrigin } from "../configuration/raw-definition";
import { OriginUnknownOriginError } from "../error/origin/unknown-origin";
import { ImbricateOriginConstructFunction } from "./definition";
import { ImbricateOriginManager } from "./origin-manager";

export class ImbricateOriginInitializer {

    public static create(): ImbricateOriginInitializer {

        return new ImbricateOriginInitializer();
    }

    private _originConstructors: Map<string, ImbricateOriginConstructFunction>;

    private constructor() {

        this._originConstructors = new Map();
    }

    public registerOriginConstructor(
        type: string,
        constructor: ImbricateOriginConstructFunction,
    ): this {

        this._originConstructors.set(type, constructor);
        return this;
    }

    public reconstructOrigin(
        type: string,
        origin: IImbricateConfigurationOrigin,
    ): IImbricateOrigin {

        const constructor: ImbricateOriginConstructFunction | undefined = this._originConstructors.get(type);

        if (!constructor) {
            throw OriginUnknownOriginError.withOriginName(type);
        }

        return constructor(origin);
    }

    public initializeOrigins(
        origins: IImbricateConfigurationOrigin[],
    ): ImbricateOriginManager {

        const originManager: ImbricateOriginManager = ImbricateOriginManager.fromScratch();

        for (const origin of origins) {

            const result: IImbricateOrigin = this.reconstructOrigin(
                origin.type,
                origin,
            );
            originManager.putOrigin(origin.originName, result);
        }

        return originManager;
    }
}
