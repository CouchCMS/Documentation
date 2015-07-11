---
title: editable
category: tag
template: default.html
---

# editable

Please see [**Core Concepts - Editable Regions**](../../concepts/editable-regions.html) for an introduction to the Editable tag.

## Parameters

The following are the parameters that are **common** to all the _types_ of editable regions. The parameters that are **specific** to individual _types_ are discussed along with that _type_ of editable region.

*   name
*   label
*   desc
*   type
*   order
*   group
*   searchable
*   search\_type
*   hidden
*   required
*   validator
*   validator\_msg
*   separator
*   val\_separator

### name

The only attribute that is mandatory. It needs to be unique amongst all the editable regions within the same template. Only lowercase\[a-z\] alphabets, numerals\[0-9\] hyphen and underscore are permitted to be used within a name. For usage see discussion above.

### label

Label instructs Couch to display a more user friendly name than the _name_ attribute above. Unlike _name_, it has no limitation of the type of characters that can be used within it. If _label_ attribute is not supplied, Couch by default uses the _name_ as the _label_. For usage see discussion above.

### desc

This can be used to provide the user some more information about the editable region. For usage see discussion above.

### type

The following are the different types of editable regions that can be created (_click for full details_).

*   [text](../editable/text.html)
*   [password](../editable/password.html)
*   [textarea](../editable/textarea.html)
*   [richtext](../editable/richtext.html)
*   [image](../editable/image.html)
*   [thumbnail](../editable/thumbnail.html)
*   [file](../editable/file.html)
*   [radio](../editable/radio.html)
*   [checkbox](../editable/checkbox.html)
*   [dropdown](../editable/dropdown.html)
*   [group](../editable/group.html)
*   [message](../editable/message.html)
*   [nicedit](../editable/nicedit.html)
*   [relation](../editable/relation.html)

### order

By default, the order in which the editable regions appear in the Admin panel matches the order in which they have been created. This order can be tweaked by setting the _order_ parameter. For example -

```
order='3'
```

The higher the order number, the lower the editable region appears on the page (think about it as the higher number being _**heavier**_). Thus a region with an order number of '-2' will appear above that with an order number of '0' which in turn will appear higher on the page than a region with an order number of '2'.

The default order number given to all editable regions is '0'.

### group

Related editable regions can be grouped together by setting the _group_ parameter of each region to the name of an another editable region of type [**group**](../editable/group.html). For example -

```
group='paypal_group'
```

\- where paypal\_group is the name of an editable region of type [**group**](../editable/group.html).

### searchable

```
searchable='0'
```

Setting the _searchable_ parameter to '0' for an editable region will exclude its contents from search results.

### search_type

```
search_type='decimal'
```

_search\_type_ parameter determines how the values contained within an editable region are _sorted_ and _compared_. Couch recognizes three different search\_types -

*   text
*   integer
*   decimal

The default _search\_type_ of all editable regions is _text_. For editable regions of type [**text**](../editable/text.html), [**radio**](../editable/radio.html) and [**dropdown**](../editable/dropdown.html), the _search\_type_ can be changed to _integer_ or _decimal_ if the values contained within them would be numeric.

<p class="notice">It is necessary to set an explicit numeric type on an editable region only when you wish to use the values contained within it to make comparisions (i.e. age &lt; 40) or to sort some output based on these values. See [**Pages**](../pages.html#custom_field).</p>

### hidden

```
hidden='1'
```

_hidden_ parameter can be set to '1' to supress the output of an editable region that has been defined outside the [**Template**](../template.html) tag.

### required

```
required='1'
```

Setting the _required_ parameter to '1' for an editable region will make it mandatory for the user to input something within it. i.e. the region cannot be left empty.

<p class="success">If an editable region marked as required is left empty, the user is not allowed to save his changes and a default error message gets displayed. You can display your custom error message by setting the _validator\_msg_ parameter described below.</p>

### validator

Couch has several built-in validators that can be used to enforce that the user only inputs valid data into an editable region -

#### min_len

```
validator='min_len=6'
```

In the example above the length of the input (i.e. the number of characters in it) cannot be less than 6\.

#### max_len

```
validator='max_len=20'
```

In the example above the length of the input (i.e. the number of characters in it) cannot be more than 20\.

#### exact_len

```
validator='exact_len=10'
```

In the example above the length of the input (i.e. the number of characters in it) has to be exactly 10\. It cannot be less or more than the specified value.

#### alpha

```
validator='alpha'
```

In the example above the only characters allowed in the input would be **a to z** and **A to Z**.

#### alpha_num

```
validator='alpha_num'
```

In the example above the only characters allowed in the input would be **a to z**, **A to Z** and numbers **0 to 9**.

#### integer

```
validator='integer'
```

In the example above only numbers **0 to 9** and the **negative sign** '**-**' are allowed. e.g.

```
-3, -2, -1, 0, 1, 2, 3
```

#### non_negative_integer

```
validator='non_negative_integer'
```

In the example above only numbers **0 to 9** are allowed. e.g.

```
0, 1, 2, 3
```

#### non_zero_integer

```
validator='non_zero_integer'
```

In the example above only numbers **1 to 9** are allowed. e.g.

```
1, 2, 3
```

#### decimal

```
validator='decimal'
```

In the example above only numeric values are allowed. e.g.

```
-3, -2.5, -2, -1, 0, 0.02, 1, 2, 3.45
```

#### non_negative_decimal

```
validator='non_negative_decimal'
```

In the example above only non-negative numeric values are allowed. e.g.

```
0, 0.02, 1, 2, 3.45
```

#### non_zero_decimal

```
validator='non_zero_decimal'
```

In the example above only numeric values larger than 0 are allowed. e.g.

```
0.02, 1, 2, 3.45
```

#### email

```
validator='email'
```

In the example above only a valid email address is allowed.

#### matches_field

This is used to ensure that the user has input identical contents into two ediatble regions (e.g. Password and Confirm Password).

```
validator='matches_field=my_password'
```

In the example above, Couch will allow input only if it matches that in another editable region named _my\_password_.

#### regex

This is a very powerful option and can actually mimic all the validators described above (and much more).<br/>
It requires a little knowledge of Regular Expressions (as understood by PHP), though.

```
validator='regex=/(cat|dog)$/i'
```

In the silly example, the input is considered valid only if it ends in either _cat_ or _dog_.

<p class="success">
    Multiple validators can be applied together by separating them with a '|' (pipe) character. For example -<br/>
    <br/>
    ```
validator='alpha_num | min_len=6 | max_len=14'
    ```
</p>

### validator_msg

When a validator mentioned above fails (this includes the _required_ parameter too) and the input is rejected, the changes made by the user are not saved and a default error message is displayed.

You can display your own custom message instead by setting the _validator\_msg_ parameter. For example, the following is a custom message that is displayed when a _required_ region is left empty -

```
validator_msg='required=What! You think you can get away with leaving this empty?'
```

<p class="success">
    Multiple messages can be applied together by separating them with a '|' (pipe) character. For example -<br/>
    <br/>
    ```
validator_msg='required=Please enter something | min_len=Too short!'
    ```
</p>

### separator

### val_separator

The use of '|' (pipe) character as the default separator between _validators_ and _validator\_msg_ parameters, as well as the use of '=' (equals-to) before a value, is sometimes not possible if the same characters appear elsewhere within the expression. e.g. in the regex example -

```
validator='regex=/(cat|dog)$/i'
```

\- the pipe character appears within the regular expression itself, thus that validator cannot be combined with any other using a pipe.

In such cases, the default separator and value separator can be set to any other character using the _separator_ and _val\_separator_ parameters. For example -

```
separator='#'
val_separator=':'
```

With the _separator_ and the _val\_separator_ having changed, the regex validator can now be combined with other validator thus -

```
validator='regex:/(cat|dog)$/i # min_len:14'
```

The _validator\_msg_ will now become -

```
validator_msg='required:Please enter something # min_len:Too short!'
```

## Variables

A variable by the name of the editable region becomes available in the context the region is being used in.

## Related Tags

*   [editable (text)](../editable/text.html)
*   [editable (password)](../editable/password.html)
*   [editable (textarea)](../editable/textarea.html)
*   [editable (richtext)](../editable/richtext.html)
*   [editable (image)](../editable/image.html)
*   [editable (thumbnail)](../editable/thumbnail.html)
*   [editable (file)](../editable/file.html)
*   [editable (radio)](../editable/radio.html)
*   [editable (checkbox)](../editable/checkbox.html)
*   [editable (dropdown)](../editable/dropdown.html)
*   [editable (group)](../editable/group.html)
*   [editable (message)](../editable/message.html)
*   [editable (nicedit)](../editable/nicedit.html)
*   [editable (relation)](../editable/relation.html)
