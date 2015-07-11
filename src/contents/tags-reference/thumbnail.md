---
title: thumbnail
category: tag
template: default.html
---

# thumbnail

Tag **thumbnail** can be used as an alternative to editable region of type [**thumbnail**](../editable/thumbnail.html).<br/>
Unlike the editable region, this method is a simple tag and does not create anything to edit within the admin-panel and thus might (in certain situations) prove to be more flexible and dynamic than the former.

The immediate reason for the introduction of this tag is to use it with [**repeatable regions**](../../concepts/repeatable-regions.html) as its editable region counterpart does not support being repeated.

### Usage

Given the full path of an image, as in the following snippet

```
<cms:thumbnail src='http://www.mysite.com/couch/uploads/image/test.jpg' width='150' />
```

this tag will create a thumbnail of the specified image (in the same folder) and output the thumbnail's path.

The proper way to use this tag's output in a template would be in tandem with the HTML 'img' tag - something like this

```
<img src="<cms:thumbnail src='http://www.mysite.com/couch/uploads/image/test.jpg' width='150' />" />
```

Instead of hardcoding the source image's path, as we did above, we are more likely to provide the output of an editable region of type [**image**](../editable/image.html) as this tag's source.

If, for example, the name of an [**image**](../editable/image.html) type region is 'my\_image', this is how we would output the image on the front-end

```
<img src="<cms:show my_image />" />
```

and this is how we create and output the above image's thumbnail

```
<img src="<cms:thumbnail my_image width='150' />" />
```

## Parameters

*   src
*   width
*   height
*   enforce\_max

```
<img src="<cms:thumbnail my_image width='150' height='150' enforce_max='1' />" />
```

These parameters work exactly the same way as the parameters with the same names work for editable region of type [**thumbnail**](../editable/thumbnail.html).<br/>
Please see [**Editable region - thumbnail**](../editable/thumbnail.html#parameters) for details of the parameters.

## Variables

This tag does not set any variables of its own.
