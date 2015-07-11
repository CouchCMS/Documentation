---
title: capture
category: tag
template: default.html
---

# capture

The **capture** tag can be used to store the output of its enclosed contents within any variable.<br/>
The enclosed contents can be regular HTML code as well as the Couch tags.

```
<cms:capture into='my_variable' scope='global'>
    ...everything executed here will get stored in variable 'my_variable' at the requested scope...
</cms:capture>
```

This tag is very helpful when you want to execute a portion of the code but wish to display the resulting output based on some other condition that is unknown at the point of execution of this code e.g. present in the page somewhere after the block of code in question.

This situation can be tackled by storing the output of the block of code in a variable for the time being. When we reach the required condition and if it evaluates to be true, we can display the output by showing the variable. However, if the condition fails, we can simply ignore the variable.

You'll find an interesting example of this tag's use in [**Sample Portfolio Site - Contact Form**](../../tutorials/portfolio-site/contact-form.html)

## Parameters

*   into
*   scope

### into

Name of the variable to store the output in.

### scope

Scope of the aforesaid variable. Can be either _global_ or _parent_.<br/>
If set to _global_, the variable will be available anywhere throughout the page. If set to _parent_, the variable will only be available only within the  scope of the parent tag (if any) that is nesting the **capture** tag.

## Variables

Sets only the variable specified by the _into_ parameter within the specified scope. Sets no variables of its own that can be used within its opening and closing tags.
