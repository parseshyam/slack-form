
const slackBlocks = require("./blocks");

function renderSlackForm(form, formValues = {}) {

    const blocks = [];

    const { id: formId, blocks: formBlocks, optionValues } = form;

    for (let index = 0; index < formBlocks.length; index++) {

        const formBlock = formBlocks[index];
        if (!formBlock || formBlock.disabled) continue;
        const { key, type } = formBlock;
        const blockId = formId + "::" + key + "::block";
        const actionId = formId + "::" + key + "::action";
        let block = null;

        const slackBlock = slackBlocks({ formBlock, formValues, actionId, blockId });

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

            case "button": {
                block = slackBlock.buttonBlock();
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
};

function readFormValues(form, stateValues) {

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

            default: {
                break;
            }
        }
    };

    return formValues;
};

function addBlock(form, extraBlock, location = "end") {
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

function addBlocks(form, extraBlocks = []) {

    for (let index = 0; index < extraBlocks.length; index++) {
        const { location = "end", ...extraBlock } = extraBlocks[index];
        addBlock(form, extraBlock, location);
    }
}

function setErrors(form, errors = {}) {
    for (const [key, value] of Object.entries(errors)) {
        const errorBlock = {};
        errorBlock.key = `error-${key}`
        errorBlock.type = "text";
        errorBlock.textType = "context";
        errorBlock.value = value;
        addBlock(form, errorBlock, `after::${key}`);
    }
}

function manageForm(form, stateValues = {}) {

    const formValues = readFormValues(form, stateValues);
    return {
        renderForm: function (initialValues = {}) {
            return renderSlackForm(form, { ...formValues, ...initialValues });
        },
        getFormValues: function () {
            return formValues;
        },
        addBlock: function (extraBlock, location = "end") {
            return addBlock(form, extraBlock, location);
        },
        addBlocks: function (extraBlocks = []) {
            return addBlocks(form, extraBlocks);
        },
        remove: function (removeBlocks = []) {
            form.blocks = form.blocks.filter(block => !removeBlocks.includes(block.key));
        },
        setErrors: function (errors = {}) {
            return setErrors(form, errors);
        }
    }
}


module.exports = {
    manageForm
};
