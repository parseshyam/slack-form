# Slack Block Form SDK: Streamlining Form Development for Slack Apps

Welcome to the Slack Block Form SDK, a tool designed to simplify the creation of interactive forms for Slack apps. Our SDK empowers developers to effortlessly build forms, enhancing productivity within Slack teams.

## Motivation

Developing forms for Slack apps often involves navigating complex configurations and repetitive tasks. Our SDK aims to alleviate these hurdles by abstracting away the complexities, allowing developers to focus on core functionality.

### Features

- Effortlessly create Slack blocks for forms with minimal code.
- Supports all basic form elements including text, text inputs, option selectors, checkboxes, radio buttons, user(s) selection, and channel(s) selection.
- Customizable options for each form element.
- Render Slack Modals with ease using the `renderModal` method.
- Set initial form values using the `setFormValues` method.
- Retrieve all form values at once with the `getFormValues` method.
- Easily handle custom errors with the `setErrors` method.
- Dynamically add or remove blocks based on conditions using `addBlock(s)` and `removeBlocks` methods.

#### Will explore all the above-mentioned methods later in this section

### Currently Supported Form Element Types

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

### Form Generation

Generate forms by defining an array of form elements and passing it as the `form` object.

```javascript

// Main array for your form.
const feedbackFormElements = [
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
    blocks: feedbackFormElements,
    optionValues: { // Option values are required for type " "select" | "radio" | "checkbox"

        // Here "satisfaction-level" is the key defined in our feedbackForm array which is of type "select"
        "satisfaction-level": [
            { text: "Very Satisfied", value: "very-satisfied", description: "Highest Rank" },
            { text: "Satisfied", value: "satisfied" },
            { text: "Neutral", value: "neutral" },
            { text: "Dissatisfied", value: "dissatisfied" },
            { text: "Very Dissatisfied", value: "very-dissatisfied", description: "Lowest Rank" },
        ],

        // Here "product-quality" is the key defined in our feedbackForm array which is of type "radio"
        "product-quality": [
            { text: "Excellent", value: "excellent", description: "Highest Rank" },
            { text: "Good", value: "good" },
            { text: "Average", value: "average" },
            { text: "Poor", value: "poor", description: "Lowest Rank" }
        ],

        // Here "issues-faced" is the key defined in our feedbackForm array which is of type "checkbox"
        "issues-faced": [
            { text: "Late Delivery", value: "late-delivery" },
            { text: "Wrong Product", value: "wrong-product" },
            { text: "Damaged Product", value: "damaged-product" },
            { text: "Billing Error", value: "billing-error" },
            { text: "Other", value: "other", description: "Please specify an issue" }
        ]
    }
};
```

### Usage

```javascript
const { SlackFormManager } = require("slack-block-form");

const {
    renderModal,
    renderForm,
    getFormValues,
    setFormValues,
    setErrors,
    addBlock,
    addBlocks,
    removeBlocks
} = SlackFormManager.create(form, stateValues);
```

`SlackFormManager.create` accepts two arguments

1. Actual **form** object which we create in the previous section **Form Generation**
2. **stateValue (payload.view.state.values)** is the form data Slack sent to the server when any dispatch action or form is submitted.

#### Now you have access to these powerful methods to make your job easy

1. `renderModal`
2. `renderForm`
3. `getFormValues`
4. `setFormValues`
5. `setErrors`
6. `addBlock`
7. `addBlocks`
8. `removeBlocks`

#### Let's see the usage one by one

##### 1. `renderModal`

When you want to render a form in Slack's modal format,
In your event action handler use this method `renderModal`

```javascript
const { renderModal } = SlackFormManager.create(form, stateValues);
const modal = renderModal();
openView(modal);
console.log(JSON.stringify(modal));
```

##### 2. `renderForm`

`renderForm` is same as `renderModal`. The only difference is it returns the Slack blocks instead of the entire Slack modal.

```javascript
const { renderForm } = SlackFormManager.create(form, stateValues);
const slackBlocks = renderForm();
```

##### 3. `getFormValues`

Getting form values is as easy as calling this method,
You'll directly get the form submitted values as key-value pairs with the **"key"** you defined in your actual form blocks array.

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

##### 4. `setFormValues`

You can set your initial form values before you render your modal with this method,
Here keys will be the **"key"** you defined in your actual form blocks array.

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

##### 5. `setErrors`

Slack has error handling, but it's not that customizable.With setErrors, you can define your custom errors as Markdown texts at each form element. Here keys will be the **"key"** you defined in your actual form blocks array.

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

##### 6. `addBlock`

Based on any conditions you can add form element dynamically anywhere you want.
Here's the thing you should know about `addBlock`
Add block accepts 2 arguments

1. The actual element object you want to add dynamically in your form
2. Location, Where you want to actually add in the form ?
  
  > - If you don't pass anything it'll be by default added at the end of the form
  > - If you pass **`start`** it'll be added at the start of the form
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
updateView(modal); // now you can re-render your modal, you'll notice the new block dynamically got added
```

##### 7. `addBlocks`

`addBlocks` is same as `addBlock` but unlike adding a single form element,
it accepts an array of form elements to add them in bulk.

Sill what will be location of form elements to be added ?

  > - Each form element will have one optional key **`"location"`** with values like **`after::"key"`**, **`before::"key"`** and **`start`**
  > - If you don't key **`"location"`** pass anything it'll be by default added at the end of the form.

```javascript
const {
    renderModal,
    getFormValues,
    addBlocks,
} = SlackFormManager.create(form, stateValues);

const formValues = getFormValues();
if (formValues['issues-faced'].includes('other')) {
    const blocksToBeAdded = [
      {
        key: "product-quality-feedback",
        type: "text-input",
        label: "Your feedback",
        placeholder: "Any comments on product Quality?",
        required: false,
        multiline: true,
        location: `after::product-quality` // This block be added after the form element with the key "product-quality"
      },
      {
          key: "other-issue-feedback",
          type: "text-input",
          label: "Your feedback",
          placeholder: "Describe the issue you faced",
          required: true,
          multiline: true,
          location: `after::issues-faced`  // This block be added after the form element with the key "issues-faced"
      }
    ];
    addBlocks(blocksToBeAdded);
}
const modal = renderModal();
updateView(modal); // now you can re-render your modal, you'll notice the new block(s) dynamically got added
```

##### 8. `removeBlocks`

`removeBlocks` let's you remove the form element(s).
Accepts array of form element **"keys"**

```javascript
const {
    renderModal,
    removeBlocks,
} = SlackFormManager.create(form, stateValues);

removeBlocks([
  "product-quality",
  "issues-faced"
]);

const modal = renderModal();
updateView(modal); // now you can re-render your modal, you'll notice the new block(s) dynamically got added
```
