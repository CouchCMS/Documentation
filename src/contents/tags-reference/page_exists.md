---
title: page_exists
category: tag
template: default.html
---

# page_exists

The **page\_exists** tag checks whether or not a cloned page, the name of which is given to it as a parameter, exists.<br/>
It returns a '1' if the page exists else it returns a '0'.

```
<cms:page_exists 'contact-us' masterpage='index.php' />
```

The above snippet is checking for the existence of a page named 'contact-us' that has been cloned out of a template named 'index.php'.

## Parameters

*   name
*   masterpage

### name

Name of the cloned page the existence of which is to be checked.

### masterpage

Name of the template out of which the cloned page mentioned above has been cloned.<br/>
If this parameter is skipped, the name of the template of the currently executing page will be used instead.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [exists](../exists.html)
