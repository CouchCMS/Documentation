---
title: cloak_email
category: tag
template: default.html
---

# cloak_email

The **cloak\_email** tag can be used to hide email addresses from spambots (email harvesters).<br/>
This tag creates a JavaScript encrypted mailto link that remains inaccessible to spambots.

```
<cms:cloak_email 'johndoe@gmail.com' />
```

The code above will produce the following HTML but only if accessed using JavaScript -

```
<a href="mailto:johndoe@gmail.com">johndoe@gmail.com</a>
```

When accessed with JavaScript disabled, a message prompting the visitor to enable JavaScript is shown instead.

## Parameters

*   email
*   title
*   msg

### email

The email address to cloak.

```
<cms:cloak_email email='johndoe@gmail.com' />
```

### title

The visible text of the mailto link. If skipped, the _email_ parameter is used for the title too.

```
<cms:cloak_email email='johndoe@gmail.com' title='Contact Me!' />
```

### msg

Message to display if this email is accessed with JavaScript disabled. If skipped, the default text shown is -<br/>
'_(Please enable JavaScript to view this email address)_'

```
<cms:cloak_email email='johndoe@gmail.com' title='Contact Me!' msg='No JavaScript ?!!' />
```

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [cloak\_url](../cloak_url.html)
