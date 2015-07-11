---
title: type = 'thumbnail'
category: tag
subCategory: editable
template: default.html
---

# type = 'thumbnail'

Editable region of type _thumbnail_, as the name suggests, is used to automatically create thumbnail images.

_Thumbnail_ type is different from all other types of editable regions in that the user does not directly edit anything within it. Instead it is attached to an existing editable region of type _image_ which then becomes the source for the thumbnail. Any time the content of the _image_ type is edited, the thumbnail attached to it also gets automatically updated.

Once the thumbnail has been created, this editable region then holds its fully qualified URL.

<p class="notice">The thumbnail gets created in the same folder as that of the main image.</p>

Suppose we have an editable region, named _my\_image_, of type _image_ -

```
<cms:editable name='my_image' label='Image' desc='Upload main image here' type="image" />
```

To create a thumbnail automatically for any image that gets selected into it, we can define a new editable region of type _thumbnail_ and associate it with the region above by using the _assoc\_field_ parameter -

```
<cms:editable
    name='my_image_thumb'
    label='Image Thumbnail'
    desc='Thumbnail of main image'
    width='100'
    show_preview='1'
    assoc_field='my_image'
    type='thumbnail'
/>
```

The code above will result in something like this below the parent _image_ type editable region -

![](../../../../assets/img/contents/editable-thumbnail-1.jpg)

Once the user selects an image into the main image region (and saves the page), the thumbnail gets created automatically -

![](../../../../assets/img/contents/editable-thumbnail-2.jpg)

Anytime the user changes the main image (and saves the changes), the thumbnail automatically reflects the changes.

<p class="success">To create multiple thumbnail images of the same image (one might be square, the other rectangular, perhaps), define multiple regions and associate them all with the same parent image.</p>

The contents of this region can be accessed, as with all other editable regions, by using the variable named after it -

```
<img src="<cms:show my_image_thumb />" />
```

## Parameters

Apart from the parameters common to all types of editable regions, the regions of _thumbnail_ type can take the following parameters -

*   width
*   height
*   enforce\_max
*   quality
*   show\_preview
*   preview\_width
*   preview\_height

### width

### height

Parameters _width_ and _height_ specify the dimensions of the thumbnail.<br/>
If neither _width_ nor _height_ are specified, the resulting thumbnail is of exactly the same dimensions as the associated image.

Specifying a single dimension only will create a thumbnail with that dimension of the specified value and the other dimension of a value that retains the original proportion of the image. e.g.

```
<cms:editable name='my_image_thumb' label='Image Thumbnail' desc='Thumbnail of main image'
    width='100'
    show_preview='1'
    assoc_field='my_image'
    type='thumbnail' />
```

| Parent Image (200 x 300) | Thumbnail (100 x 150) | Remarks |
| :----------------------- | :-------------------- | :------ |
| ![](../../../../assets/img/contents/editable-thumbnail-3.jpg) | ![](../../../../assets/img/contents/editable-thumbnail-4.jpg) | The width was made 100px and the height was proportionately scaled to 150px so that the original proportion between the dimensions is retained. |

Specifying both the dimensions will create a thumbnail with each dimension of the specified values. The original proportion between the dimensions is preserved and hence this could lead to cropping off of any dimension that overshoots the specified value in the attempt to retain proportion. e.g.

```
<cms:editable name='my_image_thumb' label='Image Thumbnail' desc='Thumbnail of main image'
    width='100'
    height='80'
    show_preview='1'
    assoc_field='my_image'
    type='thumbnail' />
```

| Parent Image (200 x 300) | Thumbnail (100 x 80) | Remarks |
| :----------------------- | :------------------- | :------ |
| ![](../../../../assets/img/contents/editable-thumbnail-5.jpg) | ![](../../../../assets/img/contents/editable-thumbnail-6.jpg) | The width was made 100px and the height was proportionately scaled resulting in a dimension of 150px. Since a height of only 80px was asked for, the surplus 70px were cropped off (35px equally from both sides with the two images aligned in the center). |

As is obvious from the second example above, if both the dimensions are specified and the thumbnail's ratio does not match that of the parent image, the cropping that inevitably occurs can sometimes lead to unacceptable results. In the thumbnail above the most important part of the image has been cropped off. This can be rectified by asking Couch to recreate the thumbnail but this time aligning it to the top of the parent image instead of the default center.

![](../../../../assets/img/contents/editable-thumbnail-7.jpg)

The following is the resulting thumbnail -

![](../../../../assets/img/contents/editable-thumbnail-8.jpg)

### enforce_max

Setting this parameter will cause Couch to simply scale (instead of cropping as in the example above) the thumbnail, ensuring that none of its two dimensions exceed those specfied by the _width_ and _height_ parameters.

### quality

```
<cms:editable name='my_image_thumb' label='Image Thumbnail' desc='Thumbnail of main image'
    width='100'
    show_preview='1'
    quality='50'
    assoc_field='my_image'
    type='thumbnail' />
```

You can set _quality_ from 0 (worst quality, smaller file) to 100 (best quality, biggest file). The default value is 80\.

### show_preview

```
<cms:editable name='my_image_thumb' label='Image Thumbnail' desc='Thumbnail of main image'
    width='100'
    show_preview='1'
    assoc_field='my_image'
    type='thumbnail' />
```

Setting show\_preview to '1' makes Couch display a preview of the created thumbnail (as visible in the examples above). Omitting this parameter or explicitly setting it to '0' will make Couch display only a link to the thumbnail instead of the preview image.

![](../../../../assets/img/contents/editable-thumbnail-9.gif)

### preview_width

### preview_height

As noted above, setting _show\_preview_ to '1' causes a preview of the thumbnail to appear. The dimensions of this preview can be set by using _preview\_width_ and _preview\_height_ (needless to say, these two parameters take effect only with _show\_preview_ set to '1').

```
<cms:editable name='my_image_thumb' label='Image Thumbnail' desc='Thumbnail of main image'
    width='100'
    show_preview='1'
    preview_width='80'
    assoc_field='my_image'
    type='thumbnail' />
```

<p class="success">If both _preview\_width_ and _preview\_height_ are omitted, the thumbnail preview is of exactly the same dimensions as the thumbnail. Usually this is what you'd want and you won't find yourself setting _preview\_width_ or _preview\_height_ too often.</p>

## Related Tags

*   [editable](../../../editable.html)
*   [editable (text)](../../text.html)
*   [editable (password)](../../password.html)
*   [editable (textarea)](../../textarea.html)
*   [editable (richtext)](../../richtext.html)
*   [editable (image)](../../image.html)
*   [editable (file)](../../file.html)
*   [editable (radio)](../../radio.html)
*   [editable (checkbox)](../../checkbox.html)
*   [editable (dropdown)](../../dropdown.html)
*   [editable (group)](../../group.html)
*   [editable (message)](../../message.html)
*   [editable (nicedit)](../../nicedit.html)
*   [editable (relation)](../../relation.html)
