---
title: Pretty URLS
category: concept
template: default.html
---

# Pretty URLS

Couch supports the use of Pretty URLS (aka search engine friendly - SEF URLs).<br/>
This feature uses URL rewriting to transform the default Couch URLs containing querystrings into URLs that appear more friendly and relevant to the web pages.<br/>
For Example, a URL like this -

```
http://www.mysite.com/blog.php?f=3
```

where 3 is the id of a folder named 'electronics', will get converted to -

```
http://www.mysite.com/blog/electronics/
```

and another URL -

```
http://www.mysite.com/blog.php?p=12
```

where 12 is the id of a cloned page named 'mobile-phones' which is in 'electronics' folder, will get converted to -

```
http://www.mysite.com/blog/electronics/mobile-phones.html
```

It is obvious that the 'pretty' versions of the URLs convey more meaning about the pages they represent.<br/>
Not only do they appear friendlier to the visitors but they also offer immense benefit from the SEO (Search Engine Optimization) perspective - something that cannot be ignored if you wish your pages to rank high in Google search.

<p class="notice">
    For Pretty URLS to work in Couch, the Apache server it is hosted on must have the 'mod\_rewrite' module enabled.<br/>
    To make sure this module is indeed available at your server, [please use this utility available at our forums](http://www.couchcms.com/forum/viewtopic.php?p=11832#p11832).
</p>

### ENABLING PRETTY URLS

In Couch Pretty URLS apply only to clonable templates.<br/>
By default, Pretty URLS are not enabled. It is strongly advised that you turn this feature on only after you have configured all your clonable templates.

Enabling Pretty URLS is a two step process -

**1\.** Find and modify the following line in _config.php_ -

```
// 8.
// Set the following to '1' if you wish to enable Pretty URLS.
// After enabling it, use gen_htaccess.php to generate an .htaccess file and place it in the root folder of your site.
define( 'K_PRETTY_URLS', 0 );
```

Set the K\_PRETTY\_URLS to 1\.

**2\.** Fire up your browser and visit the following page (substitute the domain name with that of yours) -<br/>
*http&#58;//www.yoursite.com/couch/gen\_htaccess.php*

A list of rewrite rules should appear on the page.<br/>
Select and copy the ENTIRE content of the page (press Ctrl + A) and paste it into a file named '.htaccess' and place this file in your website's root.

<p class="notice">
    If you are on a Windows machine, your OS might not allow you to create a file which only has an extension and no name. For such cases name the file temporarily to anything e.g. 'dummy.htaccess', upload it to your server and then rename it to remove the name.<br/>
    <br/>
    **EDIT:** You can also use Notepad to create a new file and when asked for a name while saving it, enclose the name with **double-quotes**.
</p>

Try visiting your cloned pages from the Admin Panel and the pretty urls should be now seen in action.

The rules that are copied and pasted into the .htaccess file pertain to all your clonable templates. If you happen to add other clonable templates after you have taken the steps outlined above, you'll have to regenerate the rewrite rules (using *gen\_htaccess.php*) and replace the former contents of the _.htaccess_ file with these new rules.

This is the reason why it is advisable to turn on Pretty URLS after all the clonable templates are already in place.

<p class="error">The rewrite rules created by *gen\_htaccess.php* use PCRE flavor of Regular Expressions instead of the now deprecated (and much slower) POSIX type. Unfortunately, some very old versions of Apache 1.x have been reported to still be using POSIX and as such the PrettyURLs feature might not work on them. Placing the generated .htaccess file on such servers will usually result in an '_HTTP 500: Internal Server Error_'.</p>

### TROUBLESHOOTING

There are two problems very commonly encountered once prettyURLs are turned on:

#### 1. The pages throw 'Internal Server Error'.

Please make sure that your server has the required *mod\_rewrite* module enabled. As mentioned above, [you can use this utility for testing it](http://www.couchcms.com/forum/viewtopic.php?p=11832#p11832).

#### 2. The pages do come up but all the CSS, JS or image links are broken.

This happens if the links are 'relative'. Please convert them to 'absolute' to rectify this problem.<br/>
For example, a link such as the follows

```
<link href="css/lightbox.css" rel="stylesheet" />
```

should be made either the following (notice the added leading slash)

```
<link href="/css/lightbox.css" rel="stylesheet" />
```

or, better still, the following

```
<link href="<cms:show k_site_link />css/lightbox.css" rel="stylesheet" />
```
