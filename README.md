# slack-block-form

A form sdk for slack app development
Slack Blocks Form Builder is a JavaScript library that simplifies the creation of interactive forms using Slack Block Kit. It provides an intuitive interface to generate Slack blocks representing various form elements such as text inputs, checkboxes, radio buttons, and submit buttons.

### The Motivation.

Slack is a popular platform for team communication and collaboration, and building custom apps for Slack can greatly enhance team productivity. However, developing Slack apps often involves repetitive tasks and complex configurations, especially when creating interactive forms.

The motivation behind Slack Blocks Form Builder is to simplify the process of building forms for Slack apps. By providing an easy-to-use library that abstracts away the complexities of Slack Block Kit, developers can focus more on building the core functionality of their apps and less on the intricacies of UI design and block construction.

### Features

- Easily create Slack blocks for forms with minimal code.
- Supports various form elements including text inputs, checkboxes, radio buttons, and submit buttons.
- Customizable options for each form element.
- Retrieve all form values at once using `getFormValues` method.
- Set custom errors for form elements using `setErrors` method.
- Dynamically add or remove blocks based on conditions using `addBlock(s)` and `removeBlocks` methods.

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
