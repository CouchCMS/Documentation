---
title: gravatar
category: tag
template: default.html
---

# gravatar

Given an email address, the **gravatar** tag outputs an HTML &lt;img&gt; tag (or link only). The source of this image is set to the Gravatar image registered for this email at _gravatar.com_. If the email is not registered, the default image is output.

```
<cms:gravatar email="johndoe@gmail.com" size="60" />
```

## Parameters

*   email
*   size
*   default
*   link_only

### email

The email for the Gravatar.

### size

Specifies the desired width and height of the Gravatar. Valid values are from 1 to 512 inclusive. If skipped, value of 48 is used.

### default

If no Gravatar found for the email, by default the Gravatar of _unknown@gravatar.com_ is used. You can specify some other image to be used instead by setting this parameter to the URL of the alternative image.

### link_only

If set to '1', output the image link only (i.e. not the &lt;img&gt; tag).

## Variables

This tag is self-closing and does not set any variables of its own.
