/**
 * @author WMXPY
 * @namespace ActiveEditing
 * @description Definition
 */

import { SavingTarget } from "../saving-target/definition";

export type ActiveEditing = {

    identifier: string;
    hash: string;
    path: string;
    startedAt: Date;
    digest: string;
    target: SavingTarget<any>;
};
