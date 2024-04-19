const test = require("node:test");
const assert = require("node:assert");


test('synchronous passing test', (t) => {
    // This test passes because it does not throw an exception.
    assert.strictEqual(1, 1);
});

test('object equal?', (t) => {
    // This test fails because it throws an exception.
    assert.deepEqual({ b: "okay", a: "as", }, { a: "as", b: "okay" });
});


