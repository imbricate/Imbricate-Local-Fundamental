/**
 * @author WMXPY
 * @namespace Error_Origin
 * @description Unknown Origin
 */

import { OriginError } from "./origin-error";

export class OriginUnknownOriginError extends OriginError {

    public static withOriginName(originType: string): OriginUnknownOriginError {

        return new OriginUnknownOriginError(
            `Origin type "${originType}" not found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "OriginUnknownOriginError", reason);

        Object.setPrototypeOf(this, OriginUnknownOriginError.prototype);
    }
}
