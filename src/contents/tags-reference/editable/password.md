---
title: type = 'password'
category: tag
subCategory: editable
template: default.html
---

# type = 'password'

Editable region of _password_ type is very similar to the [_text_](../../text.html) type. As with [_text_](../../text.html) type, for this type too Couch creates a single line textbox for data input. The only difference between the two is that anything being typed into an editable region of type _password_ will appear as '\*' (asterisks). This makes it suitable for entering passwords.

An editable region of _password_ type can be defined this way -

```
<cms:editable
 name='my_password'
 label='Password'
 desc='Enter your password'
 type='password'
/>
```

The code above will result in the following (with some password typed in) -

![](../../../../assets/img/contents/editable-password.gif)

The contents of this region can be accessed, as with all other editable regions, by using the variable named after it -

```
<cms:show my_password />
```

## Parameters

In addition to the parameters common to all the types of editable regions, _password_ accepts the following parameters

*   width
*   maxlength

### width

The width of the generated textbox can be changed by setting this parameter. For example, the following will make the textbox 200px wide -

```
<cms:editable name='my_password' label='Password'
 desc='Enter your password'
 width='200'
 type='password' />
```

### maxlength

The maximum number of characters that can be inputted by the user in this textbox can be constrained by setting this parameter. For example, the following code will prevent the user from entering more than 40 characters -

```
<cms:editable name='my_password' label='Password'
 desc='Enter your password'
 maxlength='40'
 type='password' />
```

## Related Tags

*   [editable](../../../editable.html)
*   [editable (text)](../../text.html)
*   [editable (textarea)](../../textarea.html)
*   [editable (richtext)](../../richtext.html)
*   [editable (image)](../../image.html)
*   [editable (thumbnail)](../../thumbnail.html)
*   [editable (file)](../../file.html)
*   [editable (radio)](../../radio.html)
*   [editable (checkbox)](../../checkbox.html)
*   [editable (dropdown)](../../dropdown.html)
*   [editable (group)](../../group.html)
*   [editable (message)](../../message.html)
*   [editable (nicedit)](../../nicedit.html)
*   [editable (relation)](../../relation.html)
