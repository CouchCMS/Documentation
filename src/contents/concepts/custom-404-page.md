---
title: Custom 404 Page
category: concept
template: default.html
---

# Custom 404 Page

When a visitor to your site requests a page that does not exist or no longer exists, he is shown a generic error message which is not very intuitive of friendly (something like 'HTTP 404 Not Found').

It is considered a good practice to display your own custom 404 page to the visitor when the page he is looking for cannot be found.

In Couch, there are two kinds of pages that cannot be found -

1.  A template or a file which cannot be found (i.e. the file requested does not physically exist)
2.  A cloned page which cannot be found (i.e. the physical template does exist but the requested cloned page does not).

For the first scenario mentioned above, the .htaccess file needs to be used while Couch can take care of the second scenario with a little help from you.

Setting up your custom 404 page requires two steps -

1.  Create a template named _404.php_ and place it in your web-site's root (i.e. couch folder's parent). If you wish, this template can be dynamically managed by Couch - follow the usual steps but make sure the template is NOT made clonable.
2.  In the .htaccess file generated by using _gen\_htaccess.php_ \[see [**Pretty URLS**](../pretty-urls.html)\], find and uncomment the last line from the following -

```
#If you wish to use a custom 404 page, place a file named 404.php in your website's root and uncomment the line below.
#If your website is installed in a subfolder, change the line below to reflect the path to the subfolder.
#e.g. for http://www.example.com/subdomain1/subdomain2/ make it ErrorDocument 404 /subdomain1/subdomain2/404.php
#ErrorDocument 404 /404.php
```

The _404.php_ file you create above will now be used for all the kinds of non-existent files that are requested.<br/>
Customize it to suit your needs. Make sure all links and image sources within it are defined absolutely. You can prefix **&lt;cms:show k\_site\_link /&gt;** to all the paths to make them absolute e.g.

```
<img src="<cms:show k_site_link />images/logo.jpg" />
```

<p class="success">**TIP:** Internet Explorer (IE) has a frustrating 'feature' where it will ignore any custom 404 file that happens to be less than 512 bytes in size. Make sure your 404.php template is larger than 512 bytes (though this might require padding it with unneccessary fluff).</p>