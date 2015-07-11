---
title: type = 'nicedit'
category: tag
subCategory: editable
template: default.html
---

# type = 'nicedit'

Editable region of type nicedit can be used as a light-weight alternative to editable region of type [**richtext**](../../richtext.html).<br/>
It is primarily meant to be used with [**repeatable regions**](../../../../concepts/repeatable-regions.html) (as type 'richtext' does not support being repeated), however it can be used as an independent editable region too.

Unlike 'richtext' that uses CKEditor - a full fledged Wysiwyg editor, 'nicedit' is somewhat limited in the wysiwyg features it offers but is perfect for situations where only basic HTML editing capability is required.

![](../../../../assets/img/contents/editable-nicedit.png)

A region of this type may either be defined like this :

```
<cms:editable type='nicedit' label='Description' name='my_desc' />
```

or

```
<cms:editable type='nicedit' label='Description' name='my_desc' >
This enclosed text will appear as the default value of the editor
</cms:editable>
```

## Parameters

In addition to the parameters common to all the types of editable regions, nicedit accepts the following parameters

*   width
*   height
*   maxheight
*   buttons

### width

### height

### maxheight

The dimensions of the editor can be changed by setting the **width**, **height**, and **maxheight** parameters. For example, the following will make it 400px wide and 200px high (and expand to 600px high as content is entered) -

```
<cms:editable type='nicedit' label='Description' name='my_desc'
    width='400'
    height='200'
    maxheight='600' />
```

### buttons

This parameter can be used to specify which buttons are displayed in the toolbar of the editor.

```
<cms:editable type='nicedit' label='Description' name='my_desc'
    buttons='italic, bold' />
```

This parameter takes a comma seperated string containing the names of the buttons.<br/>
Following are the values that can be used:

*   bold
*   italic
*   underline
*   left
*   center
*   right
*   justify
*   ol
*   ul
*   subscript
*   superscript
*   strikethrough
*   removeformat
*   indent
*   outdent
*   hr
*   fontsize
*   fontfamily
*   fontformat
*   link
*   unlink
*   forecolor
*   bgcolor
*   image
*   source

If the 'buttons' parameter is not specified, the following set of buttons is used as the default:<br/>
bold, italic, underline, ol, ul, link, unlink, image, removeformat, source

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
*   [editable (message)](../../message.html)
*   [editable (relation)](../../relation.html)
