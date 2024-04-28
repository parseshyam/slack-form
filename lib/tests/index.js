const test = require("node:test");
const assert = require("node:assert");
const { form } = require("./test.helpers/form");
const { stateValues } = require("./test.helpers/state.values");
const { SlackFormManager } = require("../index");

// test case for form render.

// case 1: All the blocks in the form should be rendered in the slack blocks unless they are disabled.
const slackForm = SlackFormManager.create(form, stateValues);

test('Blocks in the form should be equal to rendered blocks', (t) => {
    const formBlockLength = form.blocks.filter(ele => !ele.disabled).length;
    const SlackBlocksLength = slackForm.renderForm().length;
    assert.strictEqual(formBlockLength, SlackBlocksLength);
});

// Single select input.
test('Single select input test [String, Should match slack value]', (t) => {
    const singleSelectInputValue = slackForm.getFormValues()["singleSelectInput"];
    assert.strictEqual(typeof singleSelectInputValue, "string", "Singleselect type is of string");
    assert.deepEqual(singleSelectInputValue, 'dropdown-1', "Singleselect value should match with slack value");
});

// Multi select input.
test('Multi select input test [Array, Should match slack values]', (t) => {
    const multiselectInputValue = slackForm.getFormValues()["multiSelectInput"];
    assert.strictEqual(typeof multiselectInputValue, "object", "Multiselect type is of object");
    assert.strictEqual(typeof multiselectInputValue.length, "number", "Multiselect has property length");
    if (multiselectInputValue.length) {
        assert.deepEqual(multiselectInputValue, ['dropdown-1', 'dropdown-2'], "Multi select value should match with slack value");
    } else {
        assert.deepEqual(multiselectInputValue, [], "Multi select value empty case");
    }
});

// Single user select input.
test('Single user select input test [String, Should match slack value]', (t) => {
    const singleSelectUserInputValue = slackForm.getFormValues()["singleSelectUserInput"];
    if (singleSelectUserInputValue) {
        assert.strictEqual(typeof singleSelectUserInputValue, "string", "Single select type is of string");
        assert.deepEqual(singleSelectUserInputValue, 'U06NRHQ018B', "Single select value should match with slack value");
    } else {
        assert.strictEqual(singleSelectUserInputValue, null, "Single select empty case");
    }
});

// Multi user select input.
test('Multi user select input test [Array, Should match slack values]', (t) => {
    const multiselectUserInputValue = slackForm.getFormValues()["multiSelectUserInput"];
    // This test passes because it does not throw an exception.
    assert.strictEqual(typeof multiselectUserInputValue, "object", "Multiselect user type is of object");
    assert.strictEqual(typeof multiselectUserInputValue.length, "number", "Multi select user has property length");
    if (multiselectUserInputValue.length) {
        assert.deepEqual(multiselectUserInputValue, ['U06NRHQ018B'], "Multi select user value should match with slack value");
    } else {
        assert.deepEqual(multiselectUserInputValue, [], "Multi select user empty case");
    }
});

// Single channel select input.
test('Single channel select input test [String, Should match slack value]', (t) => {
    const singleSelectChannelInputValue = slackForm.getFormValues()["singleSelectChannelInput"];
    if (singleSelectChannelInputValue) {
        assert.strictEqual(typeof singleSelectChannelInputValue, "string", "Single select channel type is of string");
        assert.deepEqual(singleSelectChannelInputValue, 'C06NRM48QKU', "Single select channel value should match with slack value");
    } else {
        assert.strictEqual(singleSelectChannelInputValue, null, "Single select channel empty case");
    }
});

// Multi channel select input.
test('Multi channel select input test [Array, Should match slack values]', (t) => {
    const multiSelectChannelInputValue = slackForm.getFormValues()["multiSelectChannelInput"];
    // This test passes because it does not throw an exception.
    assert.strictEqual(typeof multiSelectChannelInputValue, "object", "Multiselect channel type is of object");
    assert.strictEqual(typeof multiSelectChannelInputValue.length, "number", "Multiselect channel has property length");
    if (multiSelectChannelInputValue.length) {
        assert.deepEqual(multiSelectChannelInputValue, ["C06NRM48QKU", "C06NRM48WN6"], "Multiselect channel value should match with slack value");
    } else {
        assert.deepEqual(multiSelectChannelInputValue, [], "Multiselect channel empty case");
    }
});

// Text Input
test('Input test [String, Should match slack value]', (t) => {
    const textInputValue = slackForm.getFormValues()["textInput"];
    if (textInputValue) {
        assert.strictEqual(typeof textInputValue, "string", "Input text value type is of string");
        assert.deepEqual(textInputValue, 'input text', "Input text value should match with slack value");
    } else {
        assert.strictEqual(textInputValue, null, "Input text empty case");
    }
});

// Radio input
test('Radio input test [String, Should match slack value]', (t) => {
    const radioInputValue = slackForm.getFormValues()["radioInput"];
    if (radioInputValue) {
        assert.strictEqual(typeof radioInputValue, "string", "Radio input value type is of string");
        assert.deepEqual(radioInputValue, 'radio-1', "Radio value should match with slack value");
    } else {
        assert.strictEqual(radioInputValue, null, "Radio empty case");
    }
});

// Checkbox input
test('Checkbox input test [Array, Should match slack values]', (t) => {
    const checkboxInputValue = slackForm.getFormValues()["checkboxInput"];
    // This test passes because it does not throw an exception.
    assert.strictEqual(typeof checkboxInputValue, "object", "checkbox Input type is of object");
    assert.strictEqual(typeof checkboxInputValue.length, "number", "checkbox input has property length");
    if (checkboxInputValue.length) {
        assert.deepEqual(checkboxInputValue, ["checkbox-2", "checkbox-1"], "checkbox input value should match with slack value");
    } else {
        assert.deepEqual(checkboxInputValue, [], "checkbox input empty case");
    }
});

// Date Input
test('Date input test [String, Should match slack value]', (t) => {
    const dateInputValue = slackForm.getFormValues()["dateInput"];
    if (dateInputValue) {
        assert.strictEqual(typeof dateInputValue, "string", "Date input value type is of string");
        assert.deepEqual(dateInputValue, '2024-04-20', "Date value should match with slack value");
    } else {
        assert.strictEqual(dateInputValue, null, "Date empty case");
    }
});

// Time Input
test('Time input test [String, Should match slack value]', (t) => {
    const timeInputValue = slackForm.getFormValues()["timeInput"];
    if (timeInputValue) {
        assert.strictEqual(typeof timeInputValue, "string", "Time input value type is of string");
        assert.deepEqual(timeInputValue, '10:00', "Time value should match with slack value");
    } else {
        assert.strictEqual(timeInputValue, null, "Time empty case");
    }
});

// Date Time Input
test('Date time input test [Number(unix), Should match slack value]', (t) => {
    const timeInputValue = slackForm.getFormValues()["dateTimeInput"];
    if (timeInputValue) {
        assert.strictEqual(typeof timeInputValue, "number", "Date time input value type is of string");
        assert.deepEqual(timeInputValue, 1713551968, "Date time value should match with slack value");
    } else {
        assert.strictEqual(timeInputValue, null, "Date time empty case");
    }
});