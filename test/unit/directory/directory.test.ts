/**
 * @author WMXPY
 * @namespace Directory
 * @description Directory
 * @override Unit Test
 */

import { concatDirectory, resolveDirectory } from "../../../src/directory/directory";

describe("Given [Directory] Directory Helper Methods", (): void => {

    test("Should be able to resolve directory", (): void => {

        const resolved: string = resolveDirectory("test");

        expect(resolved.endsWith("test")).toBeTruthy();
    });

    test("Should be able to concat directory", (): void => {

        const concated: string = concatDirectory("first", "second");

        expect(concated).toContain("first");
        expect(concated).toContain("second");
    });
});
