/**
 * @author WMXPY
 * @namespace Error_SavingTarget
 * @description Perform Failed
 */

import { SavingTargetError } from "./saving-target-error";

export class SavingTargetPerformFailedError extends SavingTargetError {

    public static originNotFound(
        originName: string,
    ): SavingTargetPerformFailedError {

        return new SavingTargetPerformFailedError(
            `Origin: ${originName} Not Found`,
        );
    }

    public static collectionNotFound(
        collectionIdentifier: string,
    ): SavingTargetPerformFailedError {

        return new SavingTargetPerformFailedError(
            `Collection: ${collectionIdentifier} Not Found`,
        );
    }

    public static pageNotFound(
        pageName: string,
    ): SavingTargetPerformFailedError {

        return new SavingTargetPerformFailedError(
            `Page: ${pageName} Not Found`,
        );
    }

    public static scriptNotFound(
        scriptName: string,
    ): SavingTargetPerformFailedError {

        return new SavingTargetPerformFailedError(
            `Script: ${scriptName} Not Found`,
        );
    }

    protected constructor(
        message: string,
        reason?: any,
    ) {

        super(message, "SavingTargetPerformFailedError", reason);

        Object.setPrototypeOf(this, SavingTargetPerformFailedError.prototype);
    }
}
