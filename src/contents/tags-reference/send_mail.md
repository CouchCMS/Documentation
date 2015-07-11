---
title: send_mail
category: tag
template: default.html
---

# send_mail

The **send\_mail** tag, as the name suggests, can be used to send emails.

```
<cms:send_mail from='admin@mysite.com' to='johndoe@gmail.com' subject='Feedback from your site'>
Anything here (between the opening and closing tags of send_mail)
will form the body of the email that will be sent.
</cms:send_mail>
```

Anything enclosed within the opening and closing tags will form the body of the message to be sent.<br/>
Each line should be separated with a LF (\\n). Lines should not be larger than 70 characters.

<p class="notice">There is no provision (yet) for attachments.</p>

## Parameters

*   from
*   to
*   cc
*   bcc
*   subject
*   debug
*   logfile
*   html

### from

Sender's email address.

### to

Receiver, or receivers of the mail.

The formatting of this string must comply with [» RFC 2822](http://www.faqs.org/rfcs/rfc2822). Some examples are:

user@example.com<br/>
user@example.com, anotheruser@example.com<br/>
User &lt;user@example.com&gt;<br/>
User &lt;user@example.com&gt;, Another User &lt;anotheruser@example.com&gt;

### cc

Carbon copy receivers.

### bcc

Blind carbon copy receivers.

### subject

Subject of the email.

### debug

If set to '1', all send emails will be logged. The file used for logging can be set by the _logfile_ parameter below.

### logfile

This can be set to the log file used to save all send emails. The file can be given a path relative to the site's root. If skipped, a log file named 'log.txt' in the site's root will be used (will be created if not present).

### html

If set to '1', HTML will be allowed in the body of the message.

## Variables

This tag does not set any variables of its own.
