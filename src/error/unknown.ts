/**
 * @author WMXPY
 * @namespace Error
 * @description Unknown
 */

import { LocalFundamentalError } from "./local-fundamental-error";

export class UnknownLocalFundamentalError extends LocalFundamentalError {

    public static withError(error: Error): UnknownLocalFundamentalError {

        return new UnknownLocalFundamentalError(error.message);
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "UnknownLocalFundamentalError", reason);

        Object.setPrototypeOf(this, UnknownLocalFundamentalError.prototype);
    }
}
