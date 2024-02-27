const formId = "give-feedback";
const { manageForm } = require("./generate");

const giveFeedbackForm = [
    {
        key: "description",
        type: "text",
        value: "Take feedback notes or send feedback to your teammates."
    },
    {
        key: "feedbackType",
        type: "select",
        label: " ",
        placeholder: "Select type of feedback",
        required: true,
        multiselect: true,
    },
    {
        key: "feedbackFor",
        type: "user-select",
        label: " ",
        placeholder: "Who is this feedback for",
        required: true,
        multiselect: true,
    },
    {
        key: "competency",
        type: "select",
        label: " ",
        placeholder: "What is this feedback about ?",
        required: true,
        multiselect: true,
    },
    {
        key: "focusAreas",
        type: "button",
        text: "Select",
        label: "Highlight :muscle: Strengths and :dart: Development Areas",
    },
    {
        key: "template",
        type: "select",
        label: ":mag: Use a template:",
        placeholder: "Select",
        required: true,
        multiselect: true,
    },
    {
        key: "feedback",
        type: "text-input",
        label: "Feedback",
        placeholder: "Give some feedback",
        hint: "public",
        required: true,
        multiline: true
    },
    {
        key: "radioQuestion",
        type: "radio",
        label: "choose",
        required: true,
    },
    {
        key: "checkboxQuestion",
        type: "checkbox",
        label: "select multi",
        required: true,
    }
];

const stateValues = {
    "give-feedback::feedbackType::block": {
        "give-feedback::feedbackType::action": {
            "type": "multi_static_select",
            "selected_options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Direct Feedback",
                        "emoji": true
                    },
                    "value": "direct-feedback"
                }
            ]
        }
    },
    "give-feedback::feedbackFor::block": {
        "give-feedback::feedbackFor::action": {
            "type": "multi_conversations_select",
            "selected_conversations": [
                "U02RCS9R4NN"
            ]
        }
    },
    "give-feedback::template-2::block": {
        "give-feedback::template-2::action": {
            "type": "multi_static_select",
            "selected_options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Free Form",
                        "emoji": true
                    },
                    "value": "free-form"
                }
            ]
        }
    },
    "give-feedback::template-1::block": {
        "give-feedback::template-1::action": {
            "type": "multi_static_select",
            "selected_options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Free Form",
                        "emoji": true
                    },
                    "value": "free-form"
                }
            ]
        }
    },
    "give-feedback::competency::block": {
        "give-feedback::competency::action": {
            "type": "multi_static_select",
            "selected_options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Attitude",
                        "emoji": true
                    },
                    "value": "attitude"
                }
            ]
        }
    },
    "give-feedback::template::block": {
        "give-feedback::template::action": {
            "type": "multi_static_select",
            "selected_options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Free Form",
                        "emoji": true
                    },
                    "value": "free-form"
                }
            ]
        }
    },
    "give-feedback::feedback::block": {
        "give-feedback::feedback::action": {
            "type": "plain_text_input",
            "value": "cooolasd"
        }
    },
    "give-feedback::radioQuestion::block": {
        "give-feedback::radioQuestion::action": {
            "type": "radio_buttons",
            "selected_option": {
                "text": {
                    "type": "plain_text",
                    "text": "Good",
                    "emoji": true
                },
                "value": "free-1"
            }
        }
    },
    "give-feedback::checkboxQuestion::block": {
        "give-feedback::checkboxQuestion::action": {
            "type": "checkboxes",
            "selected_options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Good",
                        "emoji": true
                    },
                    "value": "free-1"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Better",
                        "emoji": true
                    },
                    "value": "free-2"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "Best",
                        "emoji": true
                    },
                    "value": "free-3"
                }
            ]
        }
    }
};

const optionValues = {
    "feedbackType": [{ text: "Direct Feedback", value: "direct-feedback" }],
    "competency": [{ text: "Attitude", value: "attitude" }],
    "template": [{ text: "Free Form", value: "free-form" }],
    "template-1": [{ text: "Free Form", value: "free-form" }],
    "template-2": [{ text: "Free Form", value: "free-form" }],
    "radioQuestion": [
        { text: "Good", value: "free-1" },
        { text: "Better", value: "free-2" },
        { text: "Best", value: "free-3" }
    ],
    "checkboxQuestion": [
        { text: "Good", value: "free-1" },
        { text: "Better", value: "free-2" },
        { text: "Best", value: "free-3" }
    ]
};

const form = {
    id: formId,
    blocks: giveFeedbackForm,
    optionValues,
}

const { getFormValues, renderForm, addBlocks, setErrors } = manageForm(form, stateValues);

addBlocks([
    {
        key: "template-1",
        type: "select",
        label: ":mag: Use a template: 1",
        placeholder: "Select",
        location: "after::feedbackFor",
        required: true,
        multiselect: true,
    },
    {
        key: "template-2",
        type: "select",
        label: ":mag: Use a template: 2",
        placeholder: "Select",
        required: true,
        location: "after::feedbackFor",
        multiselect: true,
    }
]);

setErrors({
    "feedbackFor": "Could have been better",
    "template-1": "Could have been better - 1",
    "template-2": "Could have been better - 2",
    "checkboxQuestion": "What no way man ??"
});


const renderedForm = renderForm();
console.log(JSON.stringify(renderedForm, null, 2))
// console.log(getFormValues());