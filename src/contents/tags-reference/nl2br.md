---
title: nl2br
category: tag
template: default.html
---

# nl2br

The **nl2br** tag stands for 'newline to BR' and can be used to convert all newline characters in a string to HTML &lt;BR&gt; tags.

It comes in handy in situations where you have an editable region of _textarea_ type and while displaying the data contained within it, you wish to replace all the newlines entered by the user with &lt;BR&gt; tags.

```
<cms:nl2br><cms:show some_variable /></cms:nl2br>
```

## Parameters

This tag takes no parameters. All content enclosed within its opening and closing tags serve as its input.

## Variables

This tag does not set any variables of its own.
