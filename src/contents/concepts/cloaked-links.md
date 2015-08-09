---
title: Cloaked Links
category: concept
template: default.html
---

# Cloaked Links

Sometimes it is required to conceal the real location of a file while still allowing people to access it.<br/>
This file, for example, could be a digital product that resides on your server. After someone has made the neccessary payment, you'd want to provide him access to this file without disclosing the file's real location to him.<br/>
In such cases, you'd additionaly also wish to make this access temporary i.e. the link provided to the user should be valid for only a limited period of time.

A similar requirement is as follows - You have a eBay affiliate website which lists several eBay products. A visitor upon clicking a product link is redirected to the eBay site. However, you do not wish the links displayed on your website to reveal to anyone, prima-fascie, that they'll lead to eBay.

You can use Couch's [__*cloak\_url*__](../../tags-reference/cloak_url.html) tag to do all the above very easily.

<p class="notice">This feature was added to augment the [**PayPal button**](../paypal.html) functionality by providing secure and controlled access to the downloadable digital products being sold. However it can be used with any other links that have similar needs.</p>

### CLOAKING LINKS TO WEBPAGES

To get a gist of [__*cloak\_url*__](../../tags-reference/cloak_url.html), suppose following is a link in your template -

```
<a href="http://www.google.com" >Visit Site</a>
```

A visitor to your site will only see 'Visit Site' displayed but it cannot be made hidden from him that this link leads to Google (hovering over the link will show Goolgle in the status bar, the source code will have Google's link etc.)

Now consider the following modification made to the link above -

```
<a href="<cms:cloak_url link='http://www.google.com' redirect='1' />" >Visit Site</a>
```

Take a look at the generated url and how clicking it still leads to Google. This is classic 'URL cloaking'.

In the snippet above we set the _redirect_ parameter to '1' because the link being cloaked was that of a webpage and not of a physical file.

### CLOAKING LINKS OF FILES

Let us now see how to make [__*cloak\_url*__](../../tags-reference/cloak_url.html) work with physical files.

<p class="notice">
    **IMP.** - While the use of [__*cloak\_url*__](../../tags-reference/cloak_url.html) with files will hide their real locations by obfuscating the links, you'll also want to ensure that the files are not directly accessible to anyone who happens to know their real locations (e.g. by intelligent guesswork)- one way of doing this would be by using the .htaccess file.<br/>
    Create a file named .htaccess, put the following lines into it and place it within the folder that will house the protected files.<br/>
    <br/>
    ```
Options All -Indexes
deny from all
    ```
    Files uploaded via Couch's editable region of type file, are by default saved in the 'uploads/file' folder within the 'couch' folder. A subfolder named 'secure' is present in this folder and already has the required .htaccess file in it.<br/>
    You can use this folder to store protected files that are uploaded via Couch.
</p>

Suppose an image file _test.jpg_ is stored in the aforesaid 'uploads/file/secure' folder (so that it is not directly downloadable).<br/>
Placing the following snippet in your template -

```
<a href="<cms:cloak_url link='http://yoursite.com/couch/uploads/file/secure/test.jpg' />">Test Link</a>
```

\- will display a link that when clicked should show the (otherwise inaccessible) image in the browser.

<p class="success">
    It is always a good idea to use &lt;cms:show k\_admin\_link/&gt; to output the full URL of the couch folder instead of hard coding it. Thus the above snippet will become
    <br/>
    ```
<a href="<cms:cloak_url link="<cms:show k_admin_link/>uploads/file/secure/test.jpg" />">Test Link</a>
    ```
</p>

### FORCING DOWNLOAD

If the file cloaked above was a zip file, the browser would have displayed the familiar dialog-box prompting for the download location.<br/>
This is because [__*cloak\_url*__](../../tags-reference/cloak_url.html) tries to figure out the mime type of the linked file and accordingly asks the browser to either display the file directly or prompt for download.

If you'd rather have the download box shown for all types of files, set the *force\_download* parameter to '1'.<br/>
Thus the following link will always force the user to download the image file -

```
<a href="
    <cms:cloak_url
    link='http://yoursite.com/couch/uploads/file/secure/test.jpg'
    force_download='1'
    />
">Test Link</a>
```

### SETTING AN EXPIRY TIME FOR THE CLOAKED LINKS

The cloaked links can be made to expire after a fixed period by setting the _expiry_ parameter to the expiry period in seconds.<br/>
Thus to allow a link to be valid for only 24 hours, the following snippet can be used -

```
<a href="
    <cms:cloak_url
    link="http://yoursite.com/couch/uploads/file/secure/test.jpg"
    force_download='1'
    expiry='86400'
    />
">Test Link</a>
```

\- where 86400 is, ofcourse, the number of seconds in 24 hours (24 \* 60 \* 60).

### ALLOWING ONLY REGISTERED USERS TO ACCESS LINKS

If you have gone through the [**Users and Access Control**](../users.html) section, you'll recall that Couch allots every visitor a numeric value denoting his access level. This depends on the group the user belongs to - thus an _Administrator_ will have an access level of 7 while an _Authenticated User (Special)_ will have a value of 4\. Users not logged-in have an access level of 0\.

Links can be configured to be accessible by only users of atleast a particular level by setting the *access\_level* parameter.

```
<a href="
    <cms:cloak_url
    link="http://yoursite.com/couch/uploads/file/secure/test.jpg"
    force_download='1'
    access_level='4'
    />
">Test Link</a>
```

In the snippet above, only authenticated users with access level equal to or higher than 4 will be able to download the image file.<br/>
If unauthenticated users try to access this link, they'll get a blank screen.<br/>
To prompt them to login to download the file, set the *prompt\_login* parameter to '1' -

```
<a href="
    <cms:cloak_url
    link="http://yoursite.com/couch/uploads/file/secure/test.jpg"
    force_download='1'
    access_level='4'
    prompt_login='1'
    />
">Test Link</a>
```
