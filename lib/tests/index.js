const { describe, it } = require('node:test');
const assert = require("node:assert");
const { form } = require("./test.helpers/form");
const { stateValues } = require("./test.helpers/state.values");
const { SlackFormManager } = require("../index");

// test case for form render.

const slackValueMatch = "Value should match with slack value";
const emptyCase = "Empty case";
const stringType = "Type should be string";
const objectType = "Type should be object";
const numberType = "Type should be number";
const hasPropertyLength = "Should have length property";

// case 1: All the blocks in the form should be rendered in the slack blocks unless they are disabled.
const slackForm = SlackFormManager.create(form, stateValues);

it('Slack Blocks', async (t) => {
    const formBlockLength = form.blocks.filter(ele => !ele.disabled).length;
    const SlackBlocksLength = slackForm.renderForm().length;
    await t.test('Form elemnts should be equal to rendered blocks', t => {
        assert.strictEqual(formBlockLength, SlackBlocksLength);
    });
});

// Single select input.
it('Single Select', async (t) => {

    const singleSelectInputValue = slackForm.getFormValues()["singleSelectInput"];

    if (singleSelectInputValue) {

        await t.test(stringType, t => {
            assert.strictEqual(typeof singleSelectInputValue, "string");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(singleSelectInputValue, 'dropdown-1');
        });

    } else {

        await t.test(emptyCase, t => {
            assert.strictEqual(singleSelectInputValue, undefined);
        });
    }
});

// Multi select input.
it('Multi Select', async (t) => {

    const multiselectInputValue = slackForm.getFormValues()["multiSelectInput"];

    if (multiselectInputValue) {

        await t.test(objectType, t => {
            assert.strictEqual(typeof multiselectInputValue, "object");
        });

        await t.test(hasPropertyLength, t => {
            assert.strictEqual(typeof multiselectInputValue.length, "number");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(multiselectInputValue, ['dropdown-1', 'dropdown-2']);
        });

    } else {

        await t.test(emptyCase, t => {
            assert.deepEqual(multiselectInputValue, undefined);
        });
    }
});

// Single user select input.
it('Single User', async (t) => {

    const singleSelectUserInputValue = slackForm.getFormValues()["singleSelectUserInput"];

    if (singleSelectUserInputValue) {

        await t.test(stringType, t => {
            assert.strictEqual(typeof singleSelectUserInputValue, "string");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(singleSelectUserInputValue, 'U06NRHQ018B');
        });


    } else {

        await t.test(emptyCase, t => {
            assert.strictEqual(singleSelectUserInputValue, undefined);
        });
    }
});

// Multi user select input.
it('Multi User', async (t) => {

    const multiselectUserInputValue = slackForm.getFormValues()["multiSelectUserInput"];

    if (multiselectUserInputValue) {

        await t.test(objectType, t => {
            assert.strictEqual(typeof multiselectUserInputValue, "object");
        });

        await t.test(hasPropertyLength, t => {
            assert.strictEqual(typeof multiselectUserInputValue.length, "number");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(multiselectUserInputValue, ['U06NRHQ018B']);
        });

    } else {

        await t.test(emptyCase, t => {
            assert.deepEqual(multiselectUserInputValue, undefined);
        });
    }
});

// Single channel select input.
it('Single Channel', async (t) => {

    const singleSelectChannelInputValue = slackForm.getFormValues()["singleSelectChannelInput"];

    if (singleSelectChannelInputValue) {

        await t.test(stringType, t => {
            assert.strictEqual(typeof singleSelectChannelInputValue, "string");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(singleSelectChannelInputValue, 'C06NRM48QKU');
        });

    } else {

        await t.test(emptyCase, t => {
            assert.strictEqual(singleSelectChannelInputValue, undefined);
        });
    }
});

// Multi channel select input.
it('Multi Channel', async (t) => {

    const multiSelectChannelInputValue = slackForm.getFormValues()["multiSelectChannelInput"];

    if (multiSelectChannelInputValue) {

        await t.test(objectType, t => {
            assert.strictEqual(typeof multiSelectChannelInputValue, "object");
        });

        await t.test(hasPropertyLength, t => {
            assert.strictEqual(typeof multiSelectChannelInputValue.length, "number");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(multiSelectChannelInputValue, ["C06NRM48QKU", "C06NRM48WN6"]);
        });

    } else {

        await t.test(emptyCase, t => {
            assert.deepEqual(multiSelectChannelInputValue, undefined);
        });
    }
});

// Text Input
it('Input Text', async (t) => {

    const textInputValue = slackForm.getFormValues()["textInput"];

    if (textInputValue) {

        await t.test(stringType, t => {
            assert.strictEqual(typeof textInputValue, "string");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(textInputValue, 'input text');
        });

    } else {

        await t.test(emptyCase, t => {
            assert.strictEqual(textInputValue, undefined);
        });

    }
});

// Radio input
it('Radio', async (t) => {

    const radioInputValue = slackForm.getFormValues()["radioInput"];

    if (radioInputValue) {

        await t.test(stringType, t => {
            assert.strictEqual(typeof radioInputValue, "string");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(radioInputValue, 'radio-1');
        });

    } else {

        await t.test(emptyCase, t => {
            assert.strictEqual(radioInputValue, undefined);
        });
    }
});

// Checkbox input
it('Checkbox', async (t) => {

    const checkboxInputValue = slackForm.getFormValues()["checkboxInput"];

    if (checkboxInputValue) {

        await t.test(objectType, t => {
            assert.strictEqual(typeof checkboxInputValue, "object");
        });

        await t.test(hasPropertyLength, t => {
            assert.strictEqual(typeof checkboxInputValue.length, "number");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(checkboxInputValue, ["checkbox-2", "checkbox-1"]);
        });

    } else {

        await t.test(emptyCase, t => {
            assert.deepEqual(checkboxInputValue, undefined);
        });
    }
});

// Date Input
it('Date', async (t) => {

    const dateInputValue = slackForm.getFormValues()["dateInput"];

    if (dateInputValue) {

        await t.test(stringType, t => {
            assert.strictEqual(typeof dateInputValue, "string");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(dateInputValue, '2024-04-20');
        });

    } else {

        await t.test(emptyCase, t => {
            assert.strictEqual(dateInputValue, undefined);
        });

    }
});

// Time Input
it('Time', async (t) => {

    const timeInputValue = slackForm.getFormValues()["timeInput"];

    if (timeInputValue) {

        await t.test(stringType, t => {
            assert.strictEqual(typeof timeInputValue, "string");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(timeInputValue, '10:00');
        });

    } else {

        await t.test(emptyCase, t => {
            assert.strictEqual(timeInputValue, undefined);
        });

    }
});

// Date Time Input
it('Date time', async (t) => {

    const timeInputValue = slackForm.getFormValues()["dateTimeInput"];

    if (timeInputValue) {

        await t.test(numberType, t => {
            assert.strictEqual(typeof timeInputValue, "number");
        });

        await t.test(slackValueMatch, t => {
            assert.deepEqual(timeInputValue, 1713551968);
        });

    } else {

        await t.test(emptyCase, t => {
            assert.strictEqual(timeInputValue, undefined);
        });

    }
});