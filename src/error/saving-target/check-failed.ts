/**
 * @author WMXPY
 * @namespace Error_SavingTarget
 * @description Check Failed
 */

import { SavingTargetError } from "./saving-target-error";

export class SavingTargetCheckFailedError extends SavingTargetError {

    public static originNotFound(
        originName: string,
    ): SavingTargetCheckFailedError {

        return new SavingTargetCheckFailedError(
            `Origin: ${originName} Not Found`,
        );
    }

    public static collectionNotFound(
        collectionIdentifier: string,
    ): SavingTargetCheckFailedError {

        return new SavingTargetCheckFailedError(
            `Collection: ${collectionIdentifier} Not Found`,
        );
    }

    public static pageNotFound(
        pageName: string,
    ): SavingTargetCheckFailedError {

        return new SavingTargetCheckFailedError(
            `Page: ${pageName} Not Found`,
        );
    }

    public static scriptNotFound(
        scriptName: string,
    ): SavingTargetCheckFailedError {

        return new SavingTargetCheckFailedError(
            `Script: ${scriptName} Not Found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "SavingTargetCheckFailedError", reason);

        Object.setPrototypeOf(this, SavingTargetCheckFailedError.prototype);
    }
}
