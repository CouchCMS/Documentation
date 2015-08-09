---
title: RSS Feeds
category: concept
template: default.html
---

# RSS Feeds

Let us first see how a RSS feed is created manually (i.e. without using Couch or any other CMS) and then we'll see how to automate the task by retrofitting Couch into it.

For our example, we'll suppose you publish news items on your website and wish to offer these news items as a RSS feed.<br/>
Place the following snippet within a plain text file and name it, say, _rss.xml_ (make sure there is no space between the beginning of the file and the _&lt;?xml version="1.0"?&gt;_ statement).

```
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
    <channel>
        <title>My Explosive News</title>
        <link>http://www.mysite.com</link>
        <description>News and articles written by me</description>
        <language>en-us</language>
        <pubDate>Fri, 30 Jul 2010 05:49:44 GMT</pubDate>
    </channel>
</rss>
```

In the snippet above, we are declaring one RSS channel that will carry your news items. You'll need to modify the title, link and description tags to match your channel.

Now add the individual news items to this channel -

```
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
    <channel>
        <title>My Explosive News</title>
        <link>http://www.mysite.com</link>
        <description>News and articles written by me</description>
        <language>en-us</language>
        <pubDate>10 Jul 2007</pubDate>

        <item>
            <title>My Second News</title>
            <link>http://www.mysite.com/breaking/my-second-news.html</link>
            <description>This is my second news item.</description>
            <pubDate>10 Jul 2007</pubDate>
        </item>

        <item>
            <title>My First News</title>
            <link>http://www.mysite.com/my-first-news.html</link>
            <description>This is my first news item.</description>
            <pubDate>10 Jul 2007</pubDate>
        </item>
    </channel>
</rss>
```

We have added two recent news items that were published.<br/>
Try visiting this _rss.xml_ page in your browser or a news aggregator and the feed should come up without a hitch.

RSS (Really Simple Syndication) seems to be really simple after all.<br/>
However, manually adding every new news item published to the feed will be a painful chore.<br/>
We'll now retrofit Couch into this feed to publish news items automatically.

We'll suppose that the news items are cloned pages of a _news.php_ template in Couch.<br/>
Rename the _rss.xml_ file to _rss.php_ and add the usual PHP code that hooks Couch into this template.

This conversion of the xml file to a php file is essential for Couch but it will raise two problems that we'll need to solve before going ahead -

1.  The '&lt;?' and '?&gt; in the line &lt;?xml version="1.0"?&gt; will cause PHP to throw a parsing error because those characters mislead PHP into believing that the line is a php statement, which it is not.
2.  The web server always sends back to the browser the mime-type of any file that it is serving to fulfill the browser's request. The mime-type of an XML file should be _text/xml_ but the new '.php' extension causes the web server to send back the default _text/html_ mime-type, which will be rejected by the browser.

The first problem can be rectified by breaking up the XML statement in a way that it does not confuse PHP.<br/>
The following snippet using Couch's [__*concat*__](../../tags-reference/concat.html) tag will output exactly the same statement but because the '&lt;?' characters are now split up, PHP will have no problems.

```
<cms:concat '<' '?xml version="1.0" encoding="' k_site_charset '"?' '>' />
```

<p class="notice">The *k\_site\_charset* variable contains the value set in _config.php_ for the character set used by your web-site.</p>

The second problem can be rectified by using the Couch's [__*content\_type*__](../../tags-reference/content_type.html) tag. This tag instructs the web server to output the desired mime-type. We'll use it to output _text/xml_.

The modified snippet should now look like this -

```
<?php require_once( 'couch/cms.php' ); ?>
<cms:content_type 'text/xml' /><cms:concat '<' '?xml version="1.0" encoding="' k_site_charset '"?' '>' />
<rss version="2.0">
  <channel>
    <title>My Explosive News</title>
    <link>http://www.mysite.com</link>
    <description>News and articles written by me</description>
    <language>en-us</language>
    <pubDate>10 Jul 2007</pubDate>

    <item>
        <title>My Second News</title>
        <link>http://www.mysite.com/breaking/my-second-news.html</link>
        <description>This is my second news item.</description>
        <pubDate>10 Jul 2007</pubDate>
    </item>

    <item>
        <title>My First News</title>
        <link>http://www.mysite.com/my-first-news.html</link>
        <description>This is my first news item.</description>
        <pubDate>10 Jul 2007</pubDate>
    </item>
  </channel>
</rss>
<?php COUCH::invoke(); ?>
```

<p class="notice">**IMP.** Do not split the [__*content\_type*__](../../tags-reference/content_type.html) statement and the [__*concat*__](../../tags-reference/concat.html) statement into separate lines. This will cause an empty line to be output before the xml declaration and will invalidate the feed.</p>

We can now fetch the news items from the _news.php_ template by using [__*pages*__](../../tags-reference/pages.html) tag and add it to our feed to make it dynamic -

```
<?php require_once( 'couch/cms.php' ); ?>
<cms:content_type 'text/xml' /><cms:concat '<' '?xml version="1.0" encoding="' k_site_charset '"?' '>' />
<rss version="2.0">
  <channel>
    <title>My News Channel</title>
    <link><cms:show k_site_link /></link>
    <description>Description of this channel.</description>
    <language>en-us</language>
    <pubDate><cms:date format='D, d M Y H:i:s' gmt='1'/> GMT</pubDate>
    <generator>Couch CMS</generator>

    <cms:pages masterpage='property.php' limit="10">
    <item>
        <title><cms:show k_page_title /></title>
        <link><cms:show k_page_link /></link>
        <description>
            <cms:html_encode>
                <cms:excerptHTML><cms:show my_news_text /></cms:excerptHTML>
            </cms:html_encode>
        </description>

        <pubDate><cms:date k_page_date format='D, d M Y H:i:s' gmt='1'/> GMT</pubDate>
    </item>
    </cms:pages>
 </channel>
</rss>
<?php COUCH::invoke(); ?>
```

We are assuming that an editable field named *my\_news\_text* contains the news text.<br/>
The [__*excerptHTML*__](../../tags-reference/excerpthtml.html) tag can be used to output only an excerpt of your page.<br/>
We need to wrap the output within [__*html\_encode*__](../../tags-reference/html_encode.html) to encode certain characters that are not valid in XML.

And that is it. Your automated RSS feed is ready.<br/>
Modify the snippet to suit your web-site's needs.
