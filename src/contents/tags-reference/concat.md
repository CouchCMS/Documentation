---
title: concat
category: tag
template: default.html
---

# concat

The **Concat** tag is a utility tag that can be used to concatenate several values together into a single variable.

For example, suppose we have two variables 'first\_name' and 'last\_name'.

```
<cms:set first_name = 'John' />
<cms:set last_name = 'Doe' />
```

To set a variable, 'welcome\_message' to 'Hello John Doe! We welcome you!', using both the variables, we can do either this -

```
<cms:set welcome_message="Hello <cms:show first_name/> <cms:show last_name/>! We welcome you!" />
```

or use **concat** as follows -

```
<cms:set welcome_message="<cms:concat 'Hello ' first_name ' ' last_name '! We welcome you!' />" />
```

Here we supply **concat** with all parts of the string as unnamed parameters separated by spaces (i.e. 'Hello ', first\_name, ' ', last\_name, and '! We welcome you!' with space between each as separator) and **concat** simply returns back the concatenated string.

<p class="success">
    If many values are supplied to **concat**, the code sometimes becomes a little difficult to comprehend (as might be the case in the snippet above) because the only demarcation between the parameters is the space.<br/>
    <br/>
    In such cases, we can try naming the parameters (any arbitrary names can be used). Thus the above snippet could be written as -<br/>
    <br/>
    ```
<cms:set welcome_message="<cms:concat p1='Hello ' p2=first_name p3=' ' p4=last_name p5='! We welcome you!' />" />
    ```
    Hopefully that should make the snippet more legible.
</p>

<p class="notice">
    One benefit of **concat** over the first method is that it avoids using '&lt;cms:show /&gt;' with all variables used within the string.<br/>
    <br/>
    Another is that we can use '\\n' and '\\t' for inserting newline and tab characters in the string. For example -<br/>
    <br/>
    ```
<cms:set msg = "<cms:concat 'item_name: ' pp_item_name '\n'
    'item_number: ' pp_item_number '\n'
    'quantity: ' pp_quantity />" />
    ```
    In the snippet above, 'msg' variable is being set in response to a successful PayPal transaction and will then be emailed.
</p>

## Parameters

Concat takes any number of unnamed parameters (either literal strings or variables) and returns back a single string containing the concatenated values.

## Variables

This tag does not set any variables of its own.
