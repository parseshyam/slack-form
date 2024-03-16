const { SlackFormManager } = require("./generate");

const feedbackForm = [
    {
        key: "order-feedback-label",
        type: "text",
        value: "Feedback form about your recent purchase.",
    },
    {
        key: "satisfaction-level",
        type: "select",
        label: "Satisfaction level rating",
        placeholder: "Select your satisfaction level",
        required: true,
        multiselect: false,
    },
    {
        key: "feedback-about",
        type: "user-select",
        label: "Sales Representative(s)",
        placeholder: "Choose recipient(s)",
        required: true,
        multiselect: true,
    },
    {
        key: "selected-channel",
        type: "channel-select",
        label: "Select Channel(s)",
        placeholder: "Choose channel(s)",
        required: false,
        multiselect: true,
    },
    {
        key: "feedback-text",
        type: "text-input",
        label: "Your feedback",
        placeholder: "Type your feedback here",
        hint: "Public",
        required: true,
        multiline: true,
    },
    {
        key: "product-quality",
        type: "radio",
        label: "How was the Product quality ?",
        required: true,
    },
    {
        key: "issues-faced",
        type: "checkbox",
        label: "Select any Issue(s) faced by you",
        required: false,
    },
    {
        key: "date",
        type: "date-picker",
        label: "Date of Purchase",
        required: true,
    },
    {
        key: "time",
        type: "time-picker",
        label: "Time of Purchase",
        required: false,
    },
    {
        key: "preview",
        type: "button",
        text: "Preview the form here",
        label: "View",
    },
];

const stateValues = {
    "give-feedback::satisfaction-level::block": {
        "give-feedback::satisfaction-level::action": {
            "type": "static_select",
            "selected_option": {
                "text": {
                    "type": "plain_text",
                    "text": "Very Satisfied",
                    "emoji": true
                },
                "value": "very-satisfied"
            }
        }
    },
    "give-feedback::feedback-about::block": {
        "give-feedback::feedback-about::action": {
            "type": "multi_conversations_select",
            "selected_conversations": [
                "U06NRHQ018B"
            ]
        }
    },
    "give-feedback::selected-channel::block": {
        "give-feedback::selected-channel::action": {
            "type": "multi_conversations_select",
            "selected_conversations": [
                "C06NRM48QKU"
            ]
        }
    },
    "give-feedback::feedback-text::block": {
        "give-feedback::feedback-text::action": {
            "type": "plain_text_input",
            "value": "Good product delivery."
        }
    },
    "give-feedback::product-quality::block": {
        "give-feedback::product-quality::action": {
            "type": "radio_buttons",
            "selected_option": {
                "text": {
                    "type": "plain_text",
                    "text": "Excellent",
                    "emoji": true
                },
                "value": "excellent"
            }
        }
    },
    "give-feedback::issues-faced::block": {
        "give-feedback::issues-faced::action": {
            "type": "checkboxes",
            "selected_options": []
        }
    },
    "give-feedback::date::block": {
        "give-feedback::date::action": {
            "type": "datepicker",
            "selected_date": "2024-03-14"
        }
    },
    "give-feedback::time::block": {
        "give-feedback::time::action": {
            "type": "timepicker",
            "selected_time": "05:00"
        }
    }
};

const form = {
    id: "feedback-form",
    blocks: feedbackForm,
    optionValues: {
        "satisfaction-level": [
            { text: "Very Satisfied", value: "very-satisfied" },
            { text: "Satisfied", value: "satisfied" },
            { text: "Neutral", value: "neutral" },
            { text: "Dissatisfied", value: "dissatisfied" },
            { text: "Very Dissatisfied", value: "very-dissatisfied" },
        ],
        "product-quality": [
            { text: "Excellent", value: "excellent" },
            { text: "Good", value: "good" },
            { text: "Average", value: "average" },
            { text: "Poor", value: "poor" }
        ],
        "issues-faced": [
            { text: "Late Delivery", value: "late-delivery" },
            { text: "Wrong Product", value: "wrong-product" },
            { text: "Damanged Product", value: "damanged-product" },
            { text: "Billing Error", value: "billing-error" },
            { text: "Other", value: "other" }
        ]
    }
}

const { setErrors, addBlocks, renderForm, setFormValues, getFormValues } = SlackFormManager.create(form, stateValues);

setErrors({});

setFormValues({});

// console.log(JSON.stringify(renderForm(), null, 2))
console.log(getFormValues());