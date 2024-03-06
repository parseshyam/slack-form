
const slackBlocks = require("./blocks");
const { pt } = require("./helper");

function renderForm(initialValues = {}) {

    const { form, formValues } = this;

    const combinedValue = { ...formValues, ...initialValues };

    const blocks = [];
    const keyMap = new Map();

    const { id: formId, blocks: formBlocks, optionValues } = form;

    for (let index = 0; index < formBlocks.length; index++) {

        const formBlock = formBlocks[index];
        if (!formBlock || formBlock.disabled) continue;
        const { key, type } = formBlock;
        const blockId = formId + "::" + key + "::block";
        const actionId = formId + "::" + key + "::action";
        let block = null;

        // duplicate key check
        if (keyMap.get(key)) {
            throw new Error(`duplicate::key::${key}::form::${formId}`);
        } else {
            keyMap.set(key, true);
        }

        const slackBlock = slackBlocks({ formBlock, formValues: combinedValue, actionId, blockId });

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

function renderModal(modalData = {}) {

    const { form } = this;
    const { metaData = {}, modalConfig = {}, initialValues = {} } = modalData;

    const modal = {
        type: "modal",
        callback_id: modalConfig.id || form.id,
        title: pt(modalConfig.title || "Modal Title"),
        submit: pt(modalConfig.submit || "Submit"),
        close: pt(modalConfig.close || "close"),
        private_metadata: JSON.stringify(metaData),
        blocks: renderForm.bind(this)(initialValues)
    };
    return modal;
}

function getFormValues() {

    const { form, stateValues } = this;
    const { id: formId, blocks: formBlocks } = form;

    const formValues = {};

    for (let index = 0; index < formBlocks.length; index++) {

        const formBlock = formBlocks[index];
        const { key, type, } = formBlock;
        const blockId = formId + "::" + key + "::block";
        const actionId = formId + "::" + key + "::action";
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

function addBlock(extraBlock, location = "end") {

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

function addBlocks(extraBlocks = []) {

    for (let index = 0; index < extraBlocks.length; index++) {
        const { location = "end", ...extraBlock } = extraBlocks[index];
        addBlock.bind(this)(extraBlock, location);
    }
}

function removeBlocks(removeBlocks = []) {
    const { form } = this;
    form.blocks = form.blocks.filter(block => !removeBlocks.includes(block.key));
}

function setErrors(errors = {}) {

    for (const [key, value] of Object.entries(errors)) {
        const errorBlock = {};
        errorBlock.key = `error-${key}`
        errorBlock.type = "text";
        errorBlock.textType = "context";
        errorBlock.value = value;
        addBlock.bind(this)(errorBlock, `after::${key}`);
    }
}

function manageForm(form, stateValues = {}) {
    const formValues = getFormValues.bind({ form, stateValues })();
    const data = { form, formValues, stateValues };
    return {
        addBlock: addBlock.bind(data),
        addBlocks: addBlocks.bind(data),
        setErrors: setErrors.bind(data),
        renderForm: renderForm.bind(data),
        renderModal: renderModal.bind(data),
        removeBlocks: removeBlocks.bind(data),
        getFormValues: getFormValues.bind(data),
    }
}

module.exports = {
    manageForm
};
