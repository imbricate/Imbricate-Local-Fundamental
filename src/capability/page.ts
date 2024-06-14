/**
 * @author WMXPY
 * @namespace Capability
 * @description Page
 */

import { IImbricatePage, IMBRICATE_CAPABILITY_EFFECT, IMBRICATE_PAGE_CAPABILITY_KEY, ImbricateCapability } from "@imbricate/core";

/**
 * Check page capability
 * 
 * @param page IImbricatePage
 * @param capability IMBRICATE_PAGE_CAPABILITY_KEY
 * @returns whether the page has the capability
 */
export const checkPageCapability = (
    page: IImbricatePage,
    capability: IMBRICATE_PAGE_CAPABILITY_KEY,
): boolean => {

    const pageCapabilityKeys: IMBRICATE_PAGE_CAPABILITY_KEY[] =
        Object.keys(page.capabilities) as IMBRICATE_PAGE_CAPABILITY_KEY[];

    if (!pageCapabilityKeys.includes(capability)) {
        return false;
    }

    const capabilityValue: ImbricateCapability = page.capabilities[capability];

    return capabilityValue.effect === IMBRICATE_CAPABILITY_EFFECT.ALLOW;
};
