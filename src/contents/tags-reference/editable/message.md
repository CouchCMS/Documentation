---
title: type = 'message'
category: tag
subCategory: editable
template: default.html
---

# type = 'message'

Editable region of _message_ type is used to show arbitrary chunks of HTML to the user in the admin panel (in this sense, this tag is not editable at all). Any HTML enclosed within this tag will be output unchanged which makes it perfect for displaying messages in formatted HTML.

An example of this type -

```
<cms:editable name='banner' type='message'>
<blockquote><p>The "free" distribution of unwelcome or misleading messages to thousands of people is an annoying and sometimes destructive use of the Internet's unprecedented efficiency.<br/>
<span style="color: rgb(51, 51, 51);">Bill Gates, New York Times, 1998</span></p></blockquote>
</cms:editable>
```

## Parameters

Please note that this tag ignores the _label_ and _desc_ parameters used with all other types.

## Related Tags

*   [editable](../../../editable.html)
*   [editable (text)](../../text.html)
*   [editable (password)](../../password.html)
*   [editable (textarea)](../../textarea.html)
*   [editable (richtext)](../../richtext.html)
*   [editable (image)](../../image.html)
*   [editable (thumbnail)](../../thumbnail.html)
*   [editable (file)](../../file.html)
*   [editable (radio)](../../radio.html)
*   [editable (checkbox)](../../checkbox.html)
*   [editable (dropdown)](../../dropdown.html)
*   [editable (group)](../../group.html)
*   [editable (nicedit)](../../nicedit.html)
*   [editable (relation)](../../relation.html)
