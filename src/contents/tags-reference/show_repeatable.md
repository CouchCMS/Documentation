---
title: show_repeatable
category: tag
template: default.html
---

# show_repeatable

Please see [**Core Concepts - Repeatable Regions**](../../concepts/repeatable-regions.html#displaying-the-values) for an in-depth discussion about this tag.

## Parameters

*   var (default)
*   startcount

### var

Default parameter (usually left unnamed). The name of the [**repeatable**](../repeatable.html) tag defining the repeatable regions.

```
<cms:show_repeatable 'my_multiple_images' >
   <b>Image: <img src="<cms:show my_image />" /> <br/>
   <b>Desc:</b> <cms:show my_desc />
   <hr>
</cms:show_repeatable>
```

In the snippet above the string 'my\_multiple\_images' is the name of a [**repeatable**](../repeatable.html) tag.

### startcount

One of the variables set by this tag is _k\_count_. The value of this variable increases with each iteration. By default, the first iteration is numbered 1\. The _startcount_ parameter can be used to make _k\_count_ begin from any arbitrary number.

## Variables

*   k\_count
*   k\_total\_records

### k_count

As this tag iterates through the rows of repeated regions, this variable keeps track of the number of current iteration.<br/>
By default, the first iteration is numbered from '1' but the **startcount** parameter mentioned above can be used to change this.

### k_total_records

The total number of rows that will be iterated.
