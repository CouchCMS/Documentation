---
title: paypal_processor
category: tag
template: default.html
---

# paypal_processor

The **paypal\_processor** tag can be used to process PayPal IPN.

Please see [**Core Concepts - PayPal**](../../concepts/paypal.html) for an in-depth discussion of this tag.

## Parameters

*   debug
*   logfile

### debug

The processing of IPN by this tag is a background operation which makes it difficult to know what exactly is going on in case things don't work in the expected manner. By setting this parameter to '1', we can make this tag log into a file (specified by the _logfile_ parameter) every step it takes while processing.

### logfile

The log file into which the steps are to be logged. If this parameter is skipped, a log file named 'log.txt' in your site's root is used (created if not already existing) for logging.<br/>
You can specify a path with the file that is relative to the site's root.

```
<cms:paypal_processor debug='1' logfile='paypal.log' />
```

```
<cms:paypal_processor debug='1' logfile='couch/uploads/file/secure/paypal.log' />
```

In the last snippet we are saving the log file in a subfolder of Couch which has a .htaccess file protecting its contents from being directly downloaded.

## Variables

PayPal provides values pertaining to the transaction being handled through the IPN. This tag makes available those values by setting variables for each. The following are the variables that give those values -

*   pp\_item\_name
*   pp\_item\_number
*   pp\_quantity
*   pp\_mc\_gross
*   pp\_mc\_currency
*   pp\_txn\_id
*   pp\_receiver\_email
*   pp\_payer\_email
*   pp\_first\_name
*   pp\_last\_name
*   pp\_payer\_business\_name

Once this tag verifies that the transaction is valid, it sets an additional variable to notify this -

*   k\_paypal\_success

Apart from this variable, all the variables of the page representing the item being sold, which are normally available in the page's [**page-view**](../../concepts/variables-in-views.html), are also made available.

If the transaction is deemed invalid, the following variable is set to notify this -

*   k\_paypal\_error

## Related Tags

*   [paypal\_button](../paypal_button.html)
