const stateValues = {
    "test-form::multiSelectInput::block": {
        "test-form::multiSelectInput::action": {
            "type": "multi_static_select",
            "selected_options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "dropdown-1",
                        "emoji": true
                    },
                    "value": "dropdown-1"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "dropdown-2",
                        "emoji": true
                    },
                    "value": "dropdown-2"
                }
            ]
        }
    },
    "test-form::singleSelectInput::block": {
        "test-form::singleSelectInput::action": {
            "type": "static_select",
            "selected_option": {
                "text": {
                    "type": "plain_text",
                    "text": "dropdown-1",
                    "emoji": true
                },
                "value": "dropdown-1"
            }
        }
    },
    "test-form::multiSelectUserInput::block": {
        "test-form::multiSelectUserInput::action": {
            "type": "multi_conversations_select",
            "selected_conversations": [
                "U06NRHQ018B"
            ]
        }
    },
    "test-form::singleSelectUserInput::block": {
        "test-form::singleSelectUserInput::action": {
            "type": "conversations_select",
            "selected_conversation": "U06NRHQ018B"
        }
    },
    "test-form::multiSelectChannelInput::block": {
        "test-form::multiSelectChannelInput::action": {
            "type": "multi_conversations_select",
            "selected_conversations": [
                "C06NRM48QKU",
                "C06NRM48WN6"
            ]
        }
    },
    "test-form::singleSelectChannelInput::block": {
        "test-form::singleSelectChannelInput::action": {
            "type": "conversations_select",
            "selected_conversation": "C06NRM48QKU"
        }
    },
    "test-form::textInput::block": {
        "test-form::textInput::action": {
            "type": "plain_text_input",
            "value": "input text"
        }
    },
    "test-form::radioInput::block": {
        "test-form::radioInput::action": {
            "type": "radio_buttons",
            "selected_option": {
                "text": {
                    "type": "plain_text",
                    "text": "radio-1",
                    "emoji": true
                },
                "value": "radio-1"
            }
        }
    },
    "test-form::checkboxInput::block": {
        "test-form::checkboxInput::action": {
            "type": "checkboxes",
            "selected_options": [
                {
                    "text": {
                        "type": "plain_text",
                        "text": "checkbox-2",
                        "emoji": true
                    },
                    "value": "checkbox-2"
                },
                {
                    "text": {
                        "type": "plain_text",
                        "text": "checkbox-1",
                        "emoji": true
                    },
                    "value": "checkbox-1"
                }
            ]
        }
    },
    "test-form::dateInput::block": {
        "test-form::dateInput::action": {
            "type": "datepicker",
            "selected_date": "2024-04-20"
        }
    },
    "test-form::timeInput::block": {
        "test-form::timeInput::action": {
            "type": "timepicker",
            "selected_time": "10:00"
        }
    },
    "test-form::dateTimeInput::block": {
        "test-form::dateTimeInput::action": {
            "type": "datetimepicker",
            "selected_date_time": 1713551968
        }
    }
}

module.exports = { stateValues };

