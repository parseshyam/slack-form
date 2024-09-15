const { md, pt } = require('../helper');
const { LIMITS } = require("../limits");

class SlackSectionBlocks {

    constructor(data) {
        this.formBlock = data.formBlock;
        this.formValues = data.formValues;
        this.blockId = data.blockId;
        this.actionId = data.actionId;
    }

    // type context | header | section
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

    // type section
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

    // type section
    selectBlock({ optionValues }) {

        const { formBlock, formValues, blockId, actionId, overflow } = this;

        const {
            key,
            label = " ",
            placeholder = "Pick an option",
            multiselect = false,
        } = formBlock;

        const block = {
            type: "section",
            block_id: blockId,
            text: md(label),
            accessory: {
                type: multiselect ? "multi_static_select" : overflow ? "overflow" : "static_select",
                placeholder: pt(placeholder, LIMITS.PLACE_HOLDER),
                options: [],
                action_id: actionId
            },
        };

        const options = optionValues.map(({ text, value, description }) => ({
            text: pt(text, LIMITS.OPTIONS.LIMIT),
            description: description ? pt(description, LIMITS.OPTIONS.LIMIT) : undefined,
            value,
        }));

        block.accessory.options = options.slice(0, 100); // slack dropdown limit is 100

        if (multiselect && Array.isArray(formValues[key])) {
            const values = formValues[key] || [];
            const selectedOptions = options.filter(({ value }) => values.includes(value));
            selectedOptions.length && (block.accessory["initial_options"] = selectedOptions);
        } else if (formValues[key]) {
            const selectedOption = options.find(({ value }) => value === formValues[key]);
            selectedOption && (block.accessory["initial_option"] = selectedOption);
        }

        return block;
    }

    // type section
    userSelectBlock() {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label = " ",
            placeholder = "Pick an user",
            multiselect = false,
        } = formBlock;

        const block = {
            type: "section",
            block_id: blockId,
            text: md(label),
            accessory: {
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
            block.accessory[multiselect ? "initial_conversations" : "initial_conversation"] = formValues[key];
        }

        return block;
    }

    // type section
    channelSelectBlock() {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label = " ",
            placeholder = "Pick a channel",
            multiselect = false
        } = formBlock;

        const block = {
            type: "section",
            block_id: blockId,
            text: md(label),
            accessory: {
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
            block.accessory[multiselect ? "initial_conversations" : "initial_conversation"] = formValues[key];
        }

        return block;

    }

    // type section
    radioBlock({ optionValues }) {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label = " ",
        } = formBlock;

        const block = {
            type: "section",
            block_id: blockId,
            text: md(label),
            accessory: {
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

        block.accessory.options = options.slice(0, LIMITS.RADIO.LIMIT); // slack dropdown limit for radio is 10

        if (formValues[key]) {
            const selectedOption = options.find(({ value }) => value === formValues[key]);
            selectedOption && (block.accessory["initial_option"] = selectedOption);
        }

        return block;
    }

    // type section
    checkboxBlock({ optionValues }) {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label = " ",
        } = formBlock;

        const block = {
            type: "section",
            block_id: blockId,
            text: md(label),
            accessory: {
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

        block.accessory.options = options.slice(0, LIMITS.CHECKBOX.LIMIT); // slack dropdown limit for checkbox is 10

        if (Array.isArray(formValues[key])) {
            const values = formValues[key];
            const selectedOptions = options.filter(({ value }) => values.includes(value));
            selectedOptions.length && (block.accessory["initial_options"] = selectedOptions);
        };

        return block;
    }

    // type section
    timePickerBlock() {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label,
            placeholder = "Pick a time",
        } = formBlock;

        const block = {
            type: "section",
            block_id: blockId,
            text: md(label),
            accessory: {
                type: "timepicker",
                placeholder: pt(placeholder, LIMITS.PLACE_HOLDER),
                action_id: actionId
            },
        };

        if (formValues[key]) {
            block.accessory.initial_time = formValues[key];
        }

        return block;
    }

    // type section
    datePickerBlock() {

        const { formBlock, formValues, blockId, actionId } = this;

        const {
            key,
            label,
            placeholder = "Pick a date",
        } = formBlock;

        const block = {
            type: "section",
            block_id: blockId,
            text: md(label),
            accessory: {
                type: "datepicker",
                placeholder: pt(placeholder, LIMITS.PLACE_HOLDER),
                action_id: actionId
            },
        };

        if (formValues[key]) {
            block.accessory.initial_date = formValues[key];
        }

        return block;
    }

    static create(data) {
        return new SlackSectionBlocks(data);
    }
}

module.exports = {
    SlackSectionBlocks
};
