/**
 * @author WMXPY
 * @namespace SavingTarget
 * @description Definition
 */

export enum SAVING_TARGET_TYPE {

    PAGE = "PAGE",
    SCRIPT = "SCRIPT",
}

export type SavingTargetPayload<T> =
    T extends SAVING_TARGET_TYPE.PAGE ? {
        origin: string;
        collection: string;
        identifier: string;
    } : T extends SAVING_TARGET_TYPE.SCRIPT ? {
        origin: string;
        identifier: string;
    } : never;

export type SavingTarget<T> = {

    type: T;
    payload: SavingTargetPayload<T>;
};
