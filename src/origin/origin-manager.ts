/**
 * @author WMXPY
 * @namespace Origin
 * @description Origin Manager
 */

import { IImbricateOrigin } from "@imbricate/core";
import { ImbricateOriginManagerOriginResponse } from "./definition";

export class ImbricateOriginManager {

    public static fromScratch(): ImbricateOriginManager {

        return new ImbricateOriginManager();
    }

    private _origins: Map<string, IImbricateOrigin>;

    private constructor() {

        this._origins = new Map<string, IImbricateOrigin>();
    }

    public get origins(): ImbricateOriginManagerOriginResponse[] {

        const response: ImbricateOriginManagerOriginResponse[] = [];
        for (const [key, value] of this._origins) {
            response.push({
                originName: key,
                origin: value,
            });
        }
        return response;
    }

    public getOrigin(originName: string): IImbricateOrigin | null {

        const origin: IImbricateOrigin | undefined = this._origins.get(originName);
        if (!origin) {
            return null;
        }
        return origin;
    }

    public putOrigin(originName: string, origin: IImbricateOrigin): this {

        this._origins.set(originName, origin);
        return this;
    }
}
