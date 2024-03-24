const { SlackBlocks } = require("./blocks");
const { pt } = require("./helper");

class SlackFormManager {

    constructor(form, stateValues = {}) {
        // initilize this.
        this.form = form;
        this.stateValues = stateValues;
        this.formValues = this.getFormValues();

        // bind all methods with this.
        this.addBlock = this.addBlock.bind(this);
        this.addBlocks = this.addBlocks.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.removeBlocks = this.removeBlocks.bind(this);
        this.setFormValues = this.setFormValues.bind(this);
        this.getFormValues = this.getFormValues.bind(this);
    }

    renderForm(initialValues = {}) {

        const { form, formValues } = this;
        const combinedValue = { ...formValues, ...initialValues };
        const blocks = [];
        const keyMap = new Map();

        const { id: formId, blocks: formBlocks, optionValues } = form;
        for (let index = 0; index < formBlocks.length; index++) {

            const formBlock = formBlocks[index];
            if (!formBlock || formBlock.disabled) continue;

            const {
                key,
                type,
                blockId: customBlockId,
                actionId: customActionId,
            } = formBlock;

            // duplicate key check
            if (keyMap.has(key)) {
                throw new Error(`duplicate::key::${key}::form::${formId}`);
            } else {
                keyMap.set(key, true);
            }

            // use custom blockId and actionId if provided.
            // else generate own blockId and actionId.
            const blockId = customBlockId || formId + "::" + key + "::block";
            const actionId = customActionId || formId + "::" + key + "::action";

            let block = null;

            const slackBlock = SlackBlocks.create({ formBlock, formValues: combinedValue, actionId, blockId });

            switch (type) {

                case "text": {
                    block = slackBlock.textBlock();
                    break;
                };

                case "text-input": {
                    block = slackBlock.textInputBlock();
                    break;
                };

                case "select": {
                    if (!Array.isArray(optionValues[key]) && !optionValues[key].length) {
                        throw new Error(`options::required::key:${key}::form:${formId}`)
                    }
                    block = slackBlock.selectBlock({ optionValues: optionValues[key] });
                    break;
                };

                case "user-select": {
                    block = slackBlock.userSelectBlock();
                    break;
                };

                case "channel-select": {
                    block = slackBlock.channelSelectBlock();
                    break;
                };

                case "button": {
                    block = slackBlock.buttonBlock();
                    break;
                };

                case "date-picker": {
                    block = slackBlock.datePickerBlock();
                    break;
                };

                case "time-picker": {
                    block = slackBlock.timePickerBlock();
                    break;
                };

                case "date-time-picker": {
                    block = slackBlock.dateTimePickerBlock();
                    break;
                };

                case "radio": {
                    if (!Array.isArray(optionValues[key]) && !optionValues[key].length) {
                        throw new Error(`options::required::key:${key}::form:${formId}`)
                    }
                    block = slackBlock.radioBlock({ optionValues: optionValues[key] });
                    break;
                };

                case "checkbox": {
                    if (!Array.isArray(optionValues[key]) && !optionValues[key].length) {
                        throw new Error(`options::required::key:${key}::form:${formId}`)
                    }
                    block = slackBlock.checkboxBlock({ optionValues: optionValues[key] });
                    break;
                };

                case "divider": {
                    block = {
                        type: "divider"
                    };
                    break;
                };

                default: {
                    break;
                }

            };

            block && blocks.push(block);
        }

        return blocks;
    }

    setFormValues(initialValues = {}) {
        return this.renderForm(initialValues)
    }

    renderModal(modalData = {}) {

        const { form } = this;
        const { metaData = {}, modalConfig = {}, initialValues = {} } = modalData;

        const modal = {
            type: "modal",
            callback_id: modalConfig.id || form.id,
            title: pt(modalConfig.title || "Modal Title"),
            submit: pt(modalConfig.submit || "Submit"),
            close: pt(modalConfig.close || "close"),
            private_metadata: JSON.stringify(metaData),
            blocks: this.renderForm(initialValues)
        };
        return modal;
    }

    getFormValues() {
        const { form, stateValues } = this;
        const { id: formId, blocks: formBlocks } = form;

        const formValues = {};

        for (let index = 0; index < formBlocks.length; index++) {

            const formBlock = formBlocks[index];
            if (!formBlock || formBlock.disabled) continue;

            const {
                key,
                type,
                blockId: customBlockId,
                actionId: customActionId,
            } = formBlock;

            const blockId = customBlockId || formId + "::" + key + "::block";
            const actionId = customActionId || formId + "::" + key + "::action";

            const actionValue = stateValues?.[blockId]?.[actionId];
            if (!actionValue) continue;

            switch (type) {

                case "select": {
                    const { multiselect } = formBlock;
                    if (multiselect) {
                        formValues[key] = actionValue.selected_options.map(option => option.value);
                    } else {
                        formValues[key] = actionValue.selected_option.value;
                    }
                    break;
                };

                case "text-input": {
                    formValues[key] = actionValue.value;
                    break;
                };

                case "user-select": {
                    const { multiselect } = formBlock;
                    formValues[key] = actionValue[multiselect ? "selected_conversations" : "selected_conversation"];
                    break;
                };

                case "radio": {
                    formValues[key] = actionValue.selected_option.value;
                    break;
                };

                case "checkbox": {
                    formValues[key] = actionValue.selected_options.map(option => option.value);
                    break;
                };

                case "date-picker": {
                    formValues[key] = actionValue.selected_date;
                    break;
                };

                case "time-picker": {
                    formValues[key] = actionValue.selected_time;
                    break;
                };

                case "date-time-picker": {
                    formValues[key] = actionValue.selected_date_time;
                    break;
                };

                default: {
                    break;
                }
            }
        };

        return formValues;
    }

    addBlock(extraBlock, location = "end") {

        const { form } = this;

        const { blocks = [], id: formId } = form;

        // validation check
        for (let index = 0; index < blocks.length; index++) {
            const block = blocks[index];
            if (block.key === extraBlock.key) {
                throw new Error(`duplicate::key::${block.key}::form::${formId}`)
            }
        }

        switch (location) {
            case "start": {
                blocks.unshift(extraBlock);
                break
            }
            case "end": {
                blocks.push(extraBlock);
                break
            }
            default: {
                // handle location after::blockKey & before::blockKey
                const [position, key] = location.split("::");
                let findIndex = blocks.findIndex(block => block.key === key) + 1;
                if (findIndex > 0) {
                    if (position === "before") {
                        findIndex -= 1;
                    }
                    form.blocks.splice(findIndex, 0, extraBlock)
                }
            }
        }
    }

    addBlocks(extraBlocks = []) {
        for (let index = 0; index < extraBlocks.length; index++) {
            const { location = "end", ...extraBlock } = extraBlocks[index];
            this.addBlock(extraBlock, location);
        }
    }

    removeBlocks(removeBlocks = []) {
        const { form } = this;
        form.blocks = form.blocks.filter(block => !removeBlocks.includes(block.key));
    }

    setErrors(errors = {}) {

        for (const [key, value] of Object.entries(errors)) {
            const errorBlock = {};
            errorBlock.key = `error-${key}`
            errorBlock.type = "text";
            errorBlock.textType = "context";
            errorBlock.value = value;
            this.addBlock(errorBlock, `after::${key}`);
        }
    }

    static create(form, stateValues = {}) {
        return new SlackFormManager(form, stateValues);
    }
}

module.exports = {
    SlackFormManager
};