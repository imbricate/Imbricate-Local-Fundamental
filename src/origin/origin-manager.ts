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
    private _dynamicOrigins: Set<string>;

    private constructor() {

        this._origins = new Map<string, IImbricateOrigin>();
        this._dynamicOrigins = new Set<string>();
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

    public get dynamicOrigins(): string[] {
        return Array.from(this._dynamicOrigins);
    }

    public getOrigin(originName: string): IImbricateOrigin | null {

        const origin: IImbricateOrigin | undefined = this._origins.get(originName);
        if (!origin) {
            return null;
        }
        return origin;
    }

    public isDynamicOrigin(originName: string): boolean {

        return this._dynamicOrigins.has(originName);
    }

    public putOrigin(
        originName: string,
        origin: IImbricateOrigin,
        isDynamic: boolean = false,
    ): this {

        this._origins.set(originName, origin);

        if (isDynamic) {
            this._dynamicOrigins.add(originName);
        }

        return this;
    }
}
