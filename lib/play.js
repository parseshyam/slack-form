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
        watch: false,
    },
    {
        key: "feedback-about",
        type: "user-select",
        label: "Sales Representative(s)",
        placeholder: "Choose recipient(s)",
        required: true,
        multiselect: true,
        watch: false,
    },
    {
        key: "selected-channel",
        type: "channel-select",
        label: "Select Channel(s)",
        placeholder: "Choose channel(s)",
        required: false,
        multiselect: true,
        watch: false,
    },
    {
        key: "feedback-text",
        type: "text-input",
        label: "Your feedback",
        placeholder: "Type your feedback here",
        hint: "Public",
        required: true,
        multiline: true,
        watch: false,
    },
    {
        key: "product-quality",
        type: "radio",
        label: "How was the Product quality ?",
        required: true,
        watch: false,
    },
    {
        key: "issues-faced",
        type: "checkbox",
        label: "Select any Issue(s) faced by you",
        required: false,
        watch: false,
    },
    {
        key: "date",
        type: "date-picker",
        label: "Date of Purchase",
        required: true,
        watch: false,
    },
    {
        key: "time",
        type: "time-picker",
        label: "Time of Purchase",
        required: false,
        watch: false,
    },
    {
        key: "preview",
        type: "button",
        text: "Preview the form here",
        label: "View",
    },
];

const form = {
    id: "feedback-form",
    blocks: feedbackForm,
    optionValues: {
        "satisfaction-level": [
            { text: "Very Satisfied", value: "very-satisfied", description: "Higest Rank" },
            { text: "Satisfied", value: "satisfied" },
            { text: "Neutral", value: "neutral" },
            { text: "Dissatisfied", value: "dissatisfied" },
            { text: "Very Dissatisfied", value: "very-dissatisfied", description: "Lowest Rank" },
        ],
        "product-quality": [
            { text: "Excellent", value: "excellent", description: "Higest Rank" },
            { text: "Good", value: "good" },
            { text: "Average", value: "average" },
            { text: "Poor", value: "poor", description: "Lowest Rank" }
        ],
        "issues-faced": [
            { text: "Late Delivery", value: "late-delivery" },
            { text: "Wrong Product", value: "wrong-product" },
            { text: "Damanged Product", value: "damanged-product" },
            { text: "Billing Error", value: "billing-error" },
            { text: "Other", value: "other", description: "Please specify an issue" }
        ]
    }
};

const stateValues = {
    "feedback-form::satisfaction-level::block": {
        "feedback-form::satisfaction-level::action": {
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
    "feedback-form::feedback-about::block": {
        "feedback-form::feedback-about::action": {
            "type": "multi_conversations_select",
            "selected_conversations": [
                "U06NRHQ018B"
            ]
        }
    },
    "feedback-form::selected-channel::block": {
        "feedback-form::selected-channel::action": {
            "type": "multi_conversations_select",
            "selected_conversations": []
        }
    },
    "feedback-form::feedback-text::block": {
        "feedback-form::feedback-text::action": {
            "type": "plain_text_input",
            "value": "Hey nice delivery... Very much on time."
        }
    },
    "feedback-form::product-quality::block": {
        "feedback-form::product-quality::action": {
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
    "feedback-form::issues-faced::block": {
        "feedback-form::issues-faced::action": {
            "type": "checkboxes",
            "selected_options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Other",
                        "emoji": true
                    },
                    "value": "other"
                }
            ]
        }
    },
    "feedback-form::date::block": {
        "feedback-form::date::action": {
            "type": "datepicker",
            "selected_date": "2024-03-24"
        }
    },
    "feedback-form::time::block": {
        "feedback-form::time::action": {
            "type": "timepicker",
            "selected_time": "07:00"
        }
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

const formValues = getFormValues();

if (formValues['issues-faced'].includes('other')) {
    const otherIssueTextBlock = {
        key: "other-issue",
        type: "text-input",
        label: "Your feedback",
        placeholder: "Describe the issue you faced",
        required: true,
        multiline: true,
    }
    addBlock(otherIssueTextBlock, `after::issues-faced`);
}
console.log(JSON.stringify(renderForm(), null, 2))
// console.log(getFormValues());