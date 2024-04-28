const { SlackFormManager } = require("../../generate");
const formOptions = require("./constants");
const { stateValues } = require("./state.values");

const testForm = [
    {
        key: "label",
        type: "text",
        value: "Just a label",
    },
    {
        key: "multiSelectInput",
        type: "select",
        label: "Multi select input label",
        placeholder: "Multi select input placeholder",
        required: true,
        multiselect: true,
    },
    {
        key: "singleSelectInput",
        type: "select",
        label: "Single select input label",
        placeholder: "Single select input placeholder",
        required: true,
        multiselect: false,
    },
    {
        key: "multiSelectUserInput",
        type: "user-select",
        label: "Multi select user input label",
        placeholder: "Multi select user input placeholder",
        required: true,
        multiselect: true,
    },
    {
        key: "singleSelectUserInput",
        type: "user-select",
        label: "Single select user input label",
        placeholder: "Single select user input placeholder",
        required: true,
        multiselect: false,
    },
    {
        key: "multiSelectChannelInput",
        type: "channel-select",
        label: "Multi select channel input label",
        placeholder: "Multi select channel input placeholder",
        required: true,
        multiselect: true,
    },
    {
        key: "singleSelectChannelInput",
        type: "channel-select",
        label: "Single select channel input label",
        placeholder: "Single select channel input placeholder",
        required: true,
        multiselect: false,
    },
    {
        key: "textInput",
        type: "text-input",
        label: "Text input label",
        placeholder: "Text input placeholder",
        hint: "Text input hint",
        required: true,
        multiline: true,
    },
    {
        key: "radioInput",
        type: "radio",
        label: "Radio input label",
        required: true,
    },
    {
        key: "checkboxInput",
        type: "checkbox",
        label: "Checkbox input label",
        required: false,
    },
    {
        key: "dateInput",
        type: "date-picker",
        label: "Date input label",
        required: true,
    },
    {
        key: "timeInput",
        type: "time-picker",
        label: "Time input label",
        required: false,
    },
    {
        key: "dateTimeInput",
        type: "date-time-picker",
        label: "Date time input label",
        required: false,
    }
];

const form = {
    id: "test-form",
    blocks: testForm,
    optionValues: {
        "radioInput": formOptions.radioOptions,
        "checkboxInput": formOptions.checkboxOptions,
        "multiSelectInput": formOptions.dropdownOptions,
        "singleSelectInput": formOptions.dropdownOptions,
    }
};

const {
    renderModal,
    setFormValues,
    getFormValues,
    setErrors,
    addBlock,
    addBlocks,
    removeBlocks,
    renderForm,
} = SlackFormManager.create(form, stateValues);

module.exports = {
    form
};