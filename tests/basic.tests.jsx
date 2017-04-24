window.__DEV__ = true;

jest.dontMock("../index.js");

describe("re-format", function () {
    var format = require("../index.js");

    it("matches based on single curlies", function () {
        expect(format("your name is: {name}", { name: "bruce wayne" })).toEqual("your name is: bruce wayne");
    });

    it("matches based on double curlies", function () {
        expect(format.doubleCurly("your name is: {{name}}", { name: "bruce wayne" })).toEqual("your name is: bruce wayne");
    });

    it("matches :param", function () {
        expect(format.colon("your name is: :name", { name: "bruce wayne" })).toEqual("your name is: bruce wayne");
    });

    it("matches numbered params", function () {
        expect(format("numbers go {0}, {1}, {2}", "one", "two", "three")).toEqual("numbers go one, two, three");
    });
});
