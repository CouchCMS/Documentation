---
title: paypal_button
category: tag
template: default.html
---

# paypal_button

Please see [**Core Concepts - PayPal**](../../concepts/paypal.html) for a detailed discussion about this tag and its usage.

## Parameters

*   image
*   processor
*   show\_shipping

### image

This parameter is used to set the image used as the button.<br/>
You can either choose to use an image of your own or you may use one of the buttons made available by PayPal.

**Using your own image -**

```
<cms:paypal_button image="<cms:show k_site_link />/images/my_button.gif" />
```

**Using PayPal provided images -**

To use these images, set the _image_ parameter to a number ranging from 0 to 8\.

```
<cms:paypal_button image='3' />
```

The numbers represent the folllowing images -

![](../../assets/img/contents/paypal_button.png)

### processor

The generated button provides PayPal with a link to the page that will process the IPN sent by it. By default this will be the link of the page the button is located on. If you have placed the **paypal\_processor** tag, that handles the IPN, on some other page, set that pages link as this parameter.

### show_shipping

If the product being sold is not downloadable and requires a shipping address, set this parameter to '1'. This will make PayPal prompt the buyer for a shipping address.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [paypal\_processor](../paypal_processor.html)
