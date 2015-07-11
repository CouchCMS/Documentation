---
title: input
category: tag
template: default.html
---

# input

Please see [**Core Concepts - Form**](../../concepts/forms.html) for an in-depth discussion about this tag.

## Parameters

<p class="success">Apart from the parameters listed below, any parameters given to this tag will be passed on unchanged to the HTML tag generated by it.</p>

*   name
*   type
*   id
*   required
*   validator
*   validator\_msg
*   separator
*   val\_separator
*   opt\_values
*   opt\_selected
*   width
*   height
*   style
*   format
*   reload\_text

### name

Name of the input. This parameter is mandatory.

### type

Type of the input. Valid values are -

*   text
*   password
*   submit
*   hidden
*   textarea
*   radio
*   checkbox
*   dropdown
*   captcha

Please see [**Core Concepts - Form**](../../concepts/forms.html) for details about these types.

### id

Id of the input.

### required

Set this to '1' to make this field mandatory.

### validator

The **input** tag shares this parameter with the **editable** tag. Please see the [**validators**](../editable.html#validator) section of [_**editable**_](../editable.html) tag for a list of all the validators that can be used.

### validator_msg

The **input** tag shares this parameter with the **editable** tag. Please see the [**validators**](../editable.html#validator) section of [_**editable**_](../editable.html) tag for a description of this parameter.

### separator

### val_separator

### opt_values

### opt_selected

The _separator_, _val\_separator_, _opt\_values_ and _opt\_selected_ parameters are valid for only _radio_, _checkbox_ and _dropdown_ input types.<br/>
The **input** tag shares these parameters with the **editable** tag. Please see the parameters of [**radio**](../editable/radio.html#parameters), [**checkbox**](../editable/checkbox.html#parameters) and [**dropdown**](../editable/dropdown.html#parameters) types of editable regions for details of these.

### width

Width in pixels.

### height

Height in pixels.

### style

Inline CSS styling.

### format

### reload_text

The _format_ and _reload\_text_ parameters pertain exclusively to input of _captcha_ type. Please see [**Core Concepts - Form**](../../concepts/forms.html) where the _captcha_ type of input, along with its parameters, is described in detail.

## Variables

This tag does not set any variables of its own.

## Related Tags

*   [form](../form.html)
*   [fieldset](../fieldset.html)