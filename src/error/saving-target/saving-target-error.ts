/**
 * @author WMXPY
 * @namespace Error_SavingTarget
 * @description Editing Error
 */

import { LocalFundamentalError } from "../local-fundamental-error";

export class SavingTargetError extends LocalFundamentalError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, SavingTargetError.prototype);
    }
}
