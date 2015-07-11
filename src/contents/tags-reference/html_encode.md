---
title: html_encode
category: tag
template: default.html
---

# html_encode

Certain characters have special significance in HTML, and should be represented by HTML entities if they are to preserve their meanings. This function returns a string with some of these conversions made.

The translations performed are:

*   '&' (ampersand) becomes '&amp;amp;'
*   '"' (double quote) becomes '&amp;quot;'
*   ''' (single quote) becomes '&amp;\#039;'
*   '&lt;' (less than) becomes '&amp;lt;'
*   '&gt;' (greater than) becomes '&amp;gt;'

As an example, the following snippet has been taken from [**Core Concepts - RSS Feeds**](../../concepts/rss-feeds.html), where we are are supplyig the feed with HTML encoded excerpt of our pages -

```
<cms:html_encode>
    <cms:excerptHTML><cms:show my_news_text /></cms:excerptHTML>
</cms:html_encode>
```

## Parameters

This tag does not accept any parameters. Everything enclosed within its opening and closing tags is considered as its input.

## Variables

This tag does not set any variables.
