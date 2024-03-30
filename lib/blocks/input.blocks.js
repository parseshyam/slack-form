const { md, pt } = require('../helper');
const { LIMITS } = require("../limits");

class SlackBlocks {

    constructor(data) {
        this.formBlock = data.formBlock;
        this.formValues = data.formValues;
        this.blockId = data.blockId;
        this.actionId = data.actionId;
    }

    textBlock() {

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
                    text: pt(value, LIMITS.TEXT.HEADER)
                }
                break;
            }

            default: {
                block = {
                    block_id: blockId,
                    type: "section",
                    text: md(value, LIMITS.TEXT.MARK_DOWN)
                };
                break;
            }
        }

        return block;
    }

    textInputBlock() {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            hint,
            label,
            watch = false,
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
                placeholder: pt(placeholder, LIMITS.PLACE_HOLDER),
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
            block.hint = pt(hint, LIMITS.TEXT_INPUT.HINT);
        }

        if (watch && block.type === "input") {
            // "dispatch_action" are only supported on type "input".
            block.dispatch_action = true;
        }

        return block;
    }

    selectBlock({ optionValues }) {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label = " ",
            placeholder = "Pick an option",
            multiselect = false,
            required = false,
            watch = false
        } = formBlock;

        const block = {
            block_id: blockId,
            optional: required ? false : true,
            type: "input",
            element: {
                type: multiselect ? "multi_static_select" : "static_select",
                placeholder: pt(placeholder, LIMITS.PLACE_HOLDER),
                options: [],
                action_id: actionId
            },
            label: pt(label)
        };

        const options = optionValues.map(({ text, value, description }) => ({
            text: pt(text, LIMITS.OPTIONS.LIMIT),
            description: description ? pt(description, LIMITS.OPTIONS.LIMIT) : undefined,
            value,
        }));

        block.element.options = options.slice(0, 100); // slack dropdown limit is 100

        if (multiselect && Array.isArray(formValues[key])) {
            const values = formValues[key] || [];
            const selectedOptions = options.filter(({ value }) => values.includes(value));
            selectedOptions.length && (block.element["initial_options"] = selectedOptions);
        } else if (formValues[key]) {
            const selectedOption = options.find(({ value }) => value === formValues[key]);
            selectedOption && (block.element["initial_option"] = selectedOption);
        }

        if (watch && block.type === "input") {
            // "dispatch_action" are only supported on type "input".
            block.dispatch_action = true;
        }

        return block;
    }

    userSelectBlock() {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label = " ",
            placeholder = "Pick an user",
            multiselect = false,
            required = false,
            watch = false
        } = formBlock;

        const block = {
            block_id: blockId,
            type: "input",
            optional: required ? false : true,
            label: pt(label),
            element: {
                type: multiselect ? "multi_conversations_select" : "conversations_select",
                placeholder: pt(placeholder, LIMITS.PLACE_HOLDER),
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

        if (watch && block.type === "input") {
            // "dispatch_action" are only supported on type "input".
            block.dispatch_action = true;
        }

        return block;
    }

    channelSelectBlock() {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label = " ",
            placeholder = "Pick a channel",
            multiselect = false,
            required = false,
            watch = false,
        } = formBlock;

        const block = {
            block_id: blockId,
            type: "input",
            optional: required ? false : true,
            label: pt(label),
            element: {
                type: multiselect ? "multi_conversations_select" : "conversations_select",
                placeholder: pt(placeholder, LIMITS.PLACE_HOLDER),
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

        if (watch && block.type === "input") {
            // "dispatch_action" are only supported on type "input".
            block.dispatch_action = true;
        }

        return block;

    }

    buttonBlock() {

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

    radioBlock({ optionValues }) {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label = " ",
            required = false,
            watch = false
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

        const options = optionValues.map(({ text, value, description }) => ({
            text: pt(text, LIMITS.OPTIONS.LIMIT),
            description: description ? pt(description, LIMITS.OPTIONS.LIMIT) : undefined,
            value,
        }));

        block.element.options = options.slice(0, LIMITS.RADIO.LIMIT); // slack dropdown limit for radio is 10

        if (formValues[key]) {
            const selectedOption = options.find(({ value }) => value === formValues[key]);
            selectedOption && (block.element["initial_option"] = selectedOption);
        }

        if (watch && block.type === "input") {
            // "dispatch_action" are only supported on type "input".
            block.dispatch_action = true;
        }

        return block;
    }

    checkboxBlock({ optionValues }) {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label = " ",
            required = false,
            watch = false,
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

        const options = optionValues.map(({ text, value, description }) => ({
            text: pt(text, LIMITS.OPTIONS.LIMIT),
            description: description ? pt(description, LIMITS.OPTIONS.LIMIT) : undefined,
            value,
        }));

        block.element.options = options.slice(0, LIMITS.CHECKBOX.LIMIT); // slack dropdown limit for checkbox is 10

        if (Array.isArray(formValues[key])) {
            const values = formValues[key];
            const selectedOptions = options.filter(({ value }) => values.includes(value));
            selectedOptions.length && (block.element["initial_options"] = selectedOptions);
        };

        if (watch && block.type === "input") {
            // "dispatch_action" are only supported on type "input".
            block.dispatch_action = true;
        }

        return block;
    }

    timePickerBlock() {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label,
            required = false,
            placeholder = "Pick a time",
            watch = false,
        } = formBlock;

        const block = {
            type: "input",
            block_id: blockId,
            optional: required ? false : true,
            element: {
                type: "timepicker",
                placeholder: pt(placeholder, LIMITS.PLACE_HOLDER),
                action_id: actionId
            },
            label: pt(label)
        };

        if (formValues[key]) {
            block.element.initial_time = formValues[key];
        }

        if (watch && block.type === "input") {
            // "dispatch_action" are only supported on type "input".
            block.dispatch_action = true;
        }

        return block;
    }

    datePickerBlock() {
        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label,
            required = false,
            placeholder = "Pick a date",
            watch = false,
        } = formBlock;

        const block = {
            type: "input",
            block_id: blockId,
            optional: required ? false : true,
            element: {
                type: "datepicker",
                placeholder: pt(placeholder, LIMITS.PLACE_HOLDER),
                action_id: actionId
            },
            label: pt(label)
        };

        if (formValues[key]) {
            block.element.initial_date = formValues[key];
        }

        if (watch && block.type === "input") {
            // "dispatch_action" are only supported on type "input".
            block.dispatch_action = true;
        }

        return block;
    }

    dateTimePickerBlock() {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            hint,
            label,
            required = false,
            watch = false,
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

        if (watch && block.type === "input") {
            // "dispatch_action" are only supported on type "input".
            block.dispatch_action = true;
        }

        return block;
    }

    static create(data) {
        return new SlackBlocks(data);
    }
}

module.exports = { SlackBlocks };
