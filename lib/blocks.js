const { md, pt } = require('./helper');

function textBlock() {

    const { formBlock, blockId } = this;
    const { value, textType } = formBlock;
    let block = null;

    switch (textType) {

        case "context": {
            block = {
                block_id: blockId,
                type: "context",
                elements: [md(value)]
            }
            break;
        }

        case "header": {
            block = {
                block_id: blockId,
                type: "header",
                text: pt(value)
            }
            break;
        }

        default: {
            block = {
                block_id: blockId,
                type: "section",
                text: md(value)
            };
            break;
        }
    }

    return block;
}

function textInputBlock() {

    const { formBlock, formValues, blockId, actionId } = this;

    const {
        key,
        hint,
        label,
        required = false,
        multiline = false,
        placeholder = "Write something",
    } = formBlock;

    const block = {
        block_id: blockId,
        type: "input",
        optional: required ? false : true,
        label: pt(label),
        element: {
            type: "plain_text_input",
            max_length: 3000,
            placeholder: pt(placeholder),
            action_id: actionId
        },
    };

    if (multiline) {
        block.element.multiline = true;
    }

    if (formValues[key]) {
        block.element.initial_value = formValues[key];
    }

    if (hint) {
        block.hint = pt(hint);
    }

    return block;
}

function selectBlock({ optionValues }) {

    const { formBlock, formValues, blockId, actionId } = this;

    const {
        key,
        label = " ",
        placeholder = "Pick an option",
        multiselect = false,
        required = false
    } = formBlock;

    const block = {
        block_id: blockId,
        optional: required ? false : true,
        type: "input",
        element: {
            type: multiselect ? "multi_static_select" : "static_select",
            placeholder: pt(placeholder),
            options: [],
            action_id: actionId
        },
        label: pt(label)
    };

    const options = optionValues.map(({ text, value }) => ({ text: pt(text), value }));
    block.element.options = options.slice(0, 100); // slack dropdown limit is 100

    if (multiselect && Array.isArray(formValues[key])) {
        const values = formValues[key] || [];
        const selectedOptions = options.filter(({ value }) => values.includes(value));
        selectedOptions.length && (block.element["initial_options"] = selectedOptions);
    } else if (formValues[key]) {
        const selectedOption = options.find(({ value }) => value === formValues[key]);
        selectedOption && (block.element["initial_option"] = selectedOption);
    }

    return block;
}

function userSelectBlock() {

    const { formBlock, formValues, blockId, actionId } = this;

    const {
        key,
        label = " ",
        placeholder = "Pick an user",
        multiselect = false,
        required = false
    } = formBlock;

    const block = {
        block_id: blockId,
        type: "input",
        optional: required ? false : true,
        label: pt(label),
        element: {
            type: multiselect ? "multi_conversations_select" : "conversations_select",
            placeholder: pt(placeholder),
            action_id: actionId,
            filter: {
                include: [
                    "im"
                ],
                exclude_bot_users: true
            }
        }
    };

    if (formValues[key]) {
        block.element[multiselect ? "initial_conversations" : "initial_conversation"] = formValues[key];
    }

    return block;
}

function channelSelectBlock() {

    const { formBlock, formValues, blockId, actionId } = this;

    const {
        key,
        label = " ",
        placeholder = "Pick a channel",
        multiselect = false,
        required = false
    } = formBlock;

    const block = {
        block_id: blockId,
        type: "input",
        optional: required ? false : true,
        label: pt(label),
        element: {
            type: multiselect ? "multi_conversations_select" : "conversations_select",
            placeholder: pt(placeholder),
            action_id: actionId,
            filter: {
                include: [
                    "private",
                    "public"
                ],
                exclude_bot_users: true
            }
        }
    };

    if (formValues[key]) {
        block.element[multiselect ? "initial_conversations" : "initial_conversation"] = formValues[key];
    }

    return block;

}

function buttonBlock() {

    const { formBlock, blockId, actionId } = this;

    const {
        key,
        style,
        value,
        label = " ",
        text = "Click",
    } = formBlock;

    const block = {
        block_id: blockId,
        type: "section",
        text: md(label),
        accessory: {
            type: "button",
            text: pt(text),
            value: value,
            action_id: actionId
        }
    };

    if (value) {
        switch (typeof value) {

            case "object":
                block.accessory.value = JSON.stringify(value);
                break;

            case "string":
                block.accessory.value = value;
                break;

            default:
                throw new Error(`invalid-button-value::key::${key}::form::${formId}`);
            }
    }

    if (style) {
        block.accessory.style = style;
    }

    return block;
}

function radioBlock({ optionValues }) {

    const { formBlock, formValues, blockId, actionId } = this;

    const {
        key,
        label = " ",
        required = false
    } = formBlock;

    const block = {
        block_id: blockId,
        type: "input",
        optional: required ? false : true,
        label: pt(label),
        element: {
            type: "radio_buttons",
            options: [],
            action_id: actionId
        }
    }

    const options = optionValues.map(({ text, value }) => ({ text: pt(text), value }));
    block.element.options = options.slice(0, 100); // slack dropdown limit is 100
    if (formValues[key]) {
        const selectedOption = options.find(({ value }) => value === formValues[key]);
        selectedOption && (block.element["initial_option"] = selectedOption);
    }

    return block;
}

function checkboxBlock({ optionValues }) {

    const { formBlock, formValues, blockId, actionId } = this;

    const {
        key,
        label = " ",
        required = false
    } = formBlock;

    const block = {
        block_id: blockId,
        type: "input",
        label: pt(label),
        optional: required ? false : true,
        element: {
            type: "checkboxes",
            action_id: actionId,
            options: [],
        }
    };

    const options = optionValues.map(({ text, value }) => ({ text: pt(text), value }));
    block.element.options = options.slice(0, 100); // slack dropdown limit is 100
    if (Array.isArray(formValues[key])) {
        const values = formValues[key];
        const selectedOptions = options.filter(({ value }) => values.includes(value));
        selectedOptions.length && (block.element["initial_options"] = selectedOptions);
    };

    return block;
}

function timePickerBlock() {

    const { formBlock, formValues, blockId, actionId } = this;

    const {
        key,
        label,
        required = false,
        placeholder = "Pick a time",
    } = formBlock;

    const block = {
        type: "input",
        block_id: blockId,
        optional: required ? false : true,
        element: {
            type: "timepicker",
            placeholder: pt(placeholder),
            action_id: actionId
        },
        label: pt(label)
    };

    if (formValues[key]) {
        block.element.initial_time = formValues[key];
    }

    return block;
}

function datePickerBlock() {
    const { formBlock, formValues, blockId, actionId } = this;

    const {
        key,
        label,
        required = false,
        placeholder = "Pick a date",
    } = formBlock;

    const block = {
        type: "input",
        block_id: blockId,
        optional: required ? false : true,
        element: {
            type: "datepicker",
            placeholder: pt(placeholder),
            action_id: actionId
        },
        label: pt(label)
    };

    if (formValues[key]) {
        block.element.initial_date = formValues[key];
    }

    return block;
}

function dateTimePickerBlock() {

    const { formBlock, formValues, blockId, actionId } = this;

    const {
        key,
        hint,
        label,
        required = false,
    } = formBlock;

    const block = {
        type: "input",
        block_id: blockId,
        optional: required ? false : true,
        element: {
            type: "datetimepicker",
            action_id: actionId
        },
        label: pt(label)
    };

    if (hint) {
        block.hint = pt(hint);
    }

    if (formValues[key]) {
        block.element.initial_date_time = formValues[key];
    }

    return block;
}

function slackBlocks(data) {
    // const { formBlock, formValues, blockId, actionId } = data;
    return {
        textBlock: textBlock.bind(data),
        radioBlock: radioBlock.bind(data),
        selectBlock: selectBlock.bind(data),
        buttonBlock: buttonBlock.bind(data),
        checkboxBlock: checkboxBlock.bind(data),
        textInputBlock: textInputBlock.bind(data),
        userSelectBlock: userSelectBlock.bind(data),
        timePickerBlock: timePickerBlock.bind(data),
        datePickerBlock: datePickerBlock.bind(data),
        channelSelectBlock: channelSelectBlock.bind(data),
        dateTimePickerBlock: dateTimePickerBlock.bind(data),
    }
}

module.exports = slackBlocks;