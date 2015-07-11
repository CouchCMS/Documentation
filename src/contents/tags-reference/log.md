---
title: log
category: tag
template: default.html
---

# log

The **log** tag can be used to save arbitrary text into a log file. This may be useful for debugging or for actually keeping a log of events.

```
<cms:log 'Just a test message' />
```

```
<cms:log some_msg />
```

## Parameters

*   msg
*   file

### msg

The string to be logged.

### file

The log file into which the _msg_ is to be logged. If this parameter is skipped, a log file named 'log.txt' in your site's root is used (created if not already existing) for logging.<br/>
You can specify a path with the file that is relative to the site's root.

```
<cms:log some_msg file='mylog.txt' />
```

```
<cms:log k_page_title file='couch/uploads/file/secure/mylog.txt' />
```

In the last snippet we are saving the log file in a subfolder of Couch which has a .htaccess file protecting its contents from being directly downloaded.

## Variables

This tag is self-closing and does not set any variables of its own.
