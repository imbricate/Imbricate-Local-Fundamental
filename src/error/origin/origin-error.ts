/**
 * @author WMXPY
 * @namespace Error_Origin
 * @description Origin Error
 */

import { LocalFundamentalError } from "../local-fundamental-error";

export class OriginError extends LocalFundamentalError {

    protected constructor(
        message: string,
        type: string,
        reason?: any,
    ) {

        super(message, type, reason);

        Object.setPrototypeOf(this, OriginError.prototype);
    }
}
