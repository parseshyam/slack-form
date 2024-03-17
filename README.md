# slack-block-form

A form sdk for slack app development
Slack Blocks Form Builder is a JavaScript library that simplifies the creation of interactive forms using Slack Block Kit. It provides an intuitive interface to generate Slack blocks representing various form elements such as text inputs, checkboxes, radio buttons, and submit buttons.

### The Motivation

Slack is a popular platform for team communication and collaboration, and building custom apps for Slack can greatly enhance team productivity. However, developing Slack apps often involves repetitive tasks and complex configurations, especially when creating interactive forms.

The motivation behind Slack Blocks Form Builder is to simplify the process of building forms for Slack apps. By providing an easy-to-use library that abstracts away the complexities of Slack Block Kit, developers can focus more on building the core functionality of their apps and less on the intricacies of UI design and block construction.

### Features

- Easily create Slack blocks for forms with minimal code.
- Supports various form elements including text inputs, checkboxes, radio buttons, and submit buttons.
- Customizable options for each form element.
- Set initial value of form using `setFormValues` method.
- Retrieve all form values at once using `getFormValues` method. setFormValues
- Set custom errors for form elements using `setErrors` method.
- Dynamically add or remove blocks based on conditions using `addBlock(s)` and `removeBlocks` methods.

#### Will explore all the above mentioned methods later this section

### Current Supported form element types

1. **Text**

   - **JSON Object Representation:**

     ```json
     {
       "key": "order-feedback-label",
       "type": "text",
       "textType": "context | header | md", // default is md
       "value": "Feedback form about your recent purchase."
     }
     ```

2. **Select**

   - **JSON Object Representation:**

     ```json
     {
       "key": "satisfaction-level",
       "type": "select",
       "label": "Satisfaction level rating",
       "placeholder": "Select your satisfaction level",
       "required": true,
       "multiselect": false
     }
     ```

3. **User Select**

   - **JSON Object Representation:**

     ```json
     {
       "key": "feedback-about",
       "type": "user-select",
       "label": "Sales Representative(s)",
       "placeholder": "Choose recipient(s)",
       "required": true,
       "multiselect": true
     }
     ```

4. **Channel Select**

   - **JSON Object Representation:**

     ```json
     {
       "key": "channel",
       "type": "channel-select",
       "label": "Select Channel(s)",
       "placeholder": "Choose channel(s)",
       "required": false,
       "multiselect": true
     }
     ```

5. **Text Input:**

   - **JSON Object Representation:**

     ```json
     {
       "key": "feedback-text",
       "type": "text-input",
       "label": "Your feedback",
       "placeholder": "Type your feedback here",
       "hint": "Public",
       "required": true,
       "multiline": true
     }
     ```

6. **Radio**

   - **JSON Object Representation:**

     ```json
     {
       "key": "product-quality",
       "type": "radio",
       "label": "How was the Product quality ?",
       "required": true
     }
     ```

7. **Checkbox**

   - **JSON Object Representation:**

     ```json
     {
       "key": "issues-faced",
       "type": "checkbox",
       "label": "Select any Issue(s) faced by you",
       "required": true
     }
     ```

8. **Date Picker**

   - **JSON Object Representation:**

     ```json
     {
       "key": "date",
       "type": "date-picker",
       "label": "Date of Purchase",
       "required": true
     }
     ```

9. **Time Picker:**

   - **JSON Object Representation:**

     ```json
     {
       "key": "time",
       "type": "time-picker",
       "label": "Time of Purchase",
       "required": false
     }
     ```

10. **Date Time Picker**

    - **JSON Object Representation:**

      ```json
      {
        "key": "dateTime",
        "type": "date-time-picker",
        "label": "Select Date and Time",
        "required": true
      }
      ```

11. **Button**

- **JSON Object Representation:**

  ```json
  {
    "key": "preview",
    "type": "button",
    "text": "Preview the form here",
    "label": "View"
  }
  ```

### Usage

```javascript

// Main array for your form.
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


// Actual form object
const form = {
    id: "feedback-form", // must be unique.
    blocks: feedbackForm,
    optionValues: { // Option values are required for type " "select" | "radio" | "checkbox"

        // Here "satisfaction-level" is the key defined in our feedbackForm array which is of type "select"
        "satisfaction-level": [
            { text: "Very Satisfied", value: "very-satisfied", description: "Higest Rank" },
            { text: "Satisfied", value: "satisfied" },
            { text: "Neutral", value: "neutral" },
            { text: "Dissatisfied", value: "dissatisfied" },
            { text: "Very Dissatisfied", value: "very-dissatisfied", description: "Lowest Rank" },
        ],

        // Here "product-quality" is the key defined in our feedbackForm array which is of type "radio"
        "product-quality": [
            { text: "Excellent", value: "excellent", description: "Higest Rank" },
            { text: "Good", value: "good" },
            { text: "Average", value: "average" },
            { text: "Poor", value: "poor", description: "Lowest Rank" }
        ],

        // Here "issues-faced" is the key defined in our feedbackForm array which is of type "checkbox"
        "issues-faced": [
            { text: "Late Delivery", value: "late-delivery" },
            { text: "Wrong Product", value: "wrong-product" },
            { text: "Damanged Product", value: "damanged-product" },
            { text: "Billing Error", value: "billing-error" },
            { text: "Other", value: "other", description: "Please specify an issue" }
        ]
    }
};

const { SlackFormManager } = require("slack-block-form");

// SlackFormManager.create accepts two arguments
// 1. Your actual form object
// 2. stateValue (payload.view.state.values) is the form data sent to the server when any dispatch action or form is submitted.
const {
    renderModal,
    getFormValues,
    setFormValues,
    setErrors,
    addBlocks,
    renderForm,
} = SlackFormManager.create(form, stateValues);
```

#### Now you have access to these powerful methods to make your job easy

1. `renderModal`
2. `getFormValues`
3. `setFormValues`
4. `setErrors`
5. `addBlock`
6. `renderForm`

#### Let's see the usage one by one

##### 1. `renderModal`

```javascript
const { renderModal } = SlackFormManager.create(form, stateValues);
const modal = renderModal();
openView(modal);
console.log(JSON.stringify(modal));
```

##### 2. `getFormValues`

Getting form value is as easy as just calling this method.
You'll directly get the form submitted values as key value paris with **"key"** you defined in your actual form.blocks array.

```javascript
const { getFormValues } = SlackFormManager.create(form, stateValues);
const formValues = getFormValues();
console.log(formValues);
// output:-
{
  'satisfaction-level': 'very-satisfied',
  'feedback-about': [ 'U06NRHQ018B' ],
  'feedback-text': 'Hey nice delivery... Very much on time.',
  'product-quality': 'excellent',
  'issues-faced': [ 'other' ],
  date: '2024-03-24',
  time: '07:00'
}
```

##### 3. `setFormValues`

You can set your initial formValues with this method,
here keys will be the **"key"** you defined in your actual form.blocks array

```javascript
const { setFormValues, renderModal } = SlackFormManager.create(form, stateValues);
setFormValues({
  'feedback-text': 'Poor product deliveed',
  'product-quality': 'bad',
  'issues-faced': [ 'other' ],
});
const modal = renderModal();
openView(modal); // Will render the modal with initial values provided.
```

##### 4. `setErrors`

Slack have error handling but it's not that customizable :-(
With `setErrors` you can define your own custom errors as a makrdown texts at each form elements
Here keys will be the **"key"** you defined in your actual **form.blocks** array

```javascript
const { setErrors, renderModal } = SlackFormManager.create(form, stateValues);
setErrors({
  date: '⚠️ Date cannot be in the past',
  time: '⚠️ Time cannot be in the past',
  'feedback-text': '📝 Feedback is required',
});
const modal = renderModal();
updateView(modal);
```

##### 4. `addBlock`

Based on any conditions you can add block dynamically anywhere you want.
Here's the thing you should know about `addBlock`
Add block accepts 2 arguments

1. The actual element object you want to add dynamically in your form
2. Location, Where you want to actually add in the form ?
  
  > - If you don't pass anything it'll be added at the end of the form [ By default end]
  > - If you pass like **`after::"key"`** or **`before::"key"`** it'll add before or after the form element whom key you've provided.

```javascript
const {
    renderModal,
    getFormValues,
    addBlock,
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
    addBlock(otherIssueTextBlock,`after::issues-faced`);
}
const modal = renderModal();
updateView(modal); // now you can re-render your modal, you'll notice the new block dynamically added
```
