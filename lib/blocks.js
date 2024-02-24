const { md, pt } = require('./helper');

function textBlock({ formBlock, blockId }) {

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

function textInputBlock({ formBlock, formValues, blockId, actionId }) {

    const {
        key,
        hint,
        label,
        required = false,
        multiline = false,
        placeholder = "Write something",
    } = formBlock;

    let block = {
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

function selectBlock({ formBlock, formValues, blockId, actionId, optionValues }) {

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
    block.element.options = options.slice(0, 100);

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

function userSelectBlock({ formBlock, formValues, blockId, actionId }) {

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

function buttonBlock({ formBlock, blockId, actionId }) {

    const {
        value,
        label = " ",
        text = "Click",
        style
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

    if (style) {
        block.accessory.style = style;
    }

    return block;
}

function radioBlock({ formBlock, formValues, blockId, actionId, optionValues }) {

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
    block.element.options = options.slice(0, 100);
    if (formValues[key]) {
        const selectedOption = options.find(({ value }) => value === formValues[key]);
        selectedOption && (block.element["initial_option"] = selectedOption);
    }

    return block;
}

function checkboxBlock({ formBlock, formValues, blockId, actionId, optionValues }) {

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
    block.element.options = options.slice(0, 100);
    if (Array.isArray(formValues[key])) {
        const values = formValues[key];
        const selectedOptions = options.filter(({ value }) => values.includes(value));
        selectedOptions.length && (block.element["initial_options"] = selectedOptions);
    };

    return block;
}

function slackBlocks(data) {
    // const { formBlock, formValues, blockId, actionId } = data;
    return {
        textBlock: function (options = {}) {
            return textBlock({ ...data, ...options })
        },
        textInputBlock: function (options = {}) {
            return textInputBlock({ ...data, ...options })
        },
        selectBlock: function (options = {}) {
            return selectBlock({ ...data, ...options })
        },
        userSelectBlock: function (options = {}) {
            return userSelectBlock({ ...data, ...options })
        },
        buttonBlock: function (options = {}) {
            return buttonBlock({ ...data, ...options })
        },
        radioBlock: function (options = {}) {
            return radioBlock({ ...data, ...options })
        },
        checkboxBlock: function (options = {}) {
            return checkboxBlock({ ...data, ...options })
        },
    }
}


module.exports = slackBlocks;