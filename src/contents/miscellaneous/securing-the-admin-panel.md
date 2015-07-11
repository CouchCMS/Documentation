---
title: Securing the Admin Panel
category: miscellaneous
template: default.html
---

# Securing the Admin Panel

The 'couch' folder placed within your site is the sole entry into the admin panel.<br/>
Understandably, access to the 'couch' folder should be restricted to dissuade malicious users from trying to break into it (although there are steps in place to prevent this from happening).

Prior to version 1.1, one way of doing so was renaming the 'couch' folder to anything else.<br/>
The idea is to make it difficult for non-welcome users to figure out the entry into the admin panel.<br/>
This method is still valid, and you are strongly recommended to do so, but unfortunately is not bullet-proof. The problem is that there are some URLs that have the admin folder's name contained within them and hence inadvertently 'leak' the changed name out. Thus someone who knows what he is looking for can find it out.

Strictly speaking it is not the 'couch' folder that is the sole gateway to the admin panel. It is in fact the 'index.php' that is present within it.<br/>
Couch 1.1 advances the method one step ahead and allows you to change the name of the 'index.php' to anything else.

It is a powerful way of securing your Couch installation from unwanted access and you are strongly exhorted to do so by taking the following steps -

**1\.** Rename 'index.php' to whatever you wish (retaining the php extension of course). For our example, let us suppose that we rename it to 'prada78.php'

**2\.** Open up 'config.php' and find the following lines

```
// 1b.
// For security purpose, the 'index.php' file of Couch can be renamed to anything else.
// If you do so, uncomment the following line and enter the new name.
//define( 'K_ADMIN_PAGE', 'kachua.php' )
```

Uncomment the 'define' after adding our new name to it. Thus it will now become

```
// 1b.
// For security purpose, the 'index.php' file of Couch can be renamed to anything else.
// If you do so, uncomment the following line and enter the new name.
define( 'K_ADMIN_PAGE', 'prada78.php' )
```

(notice how we have removed the two slashes from the beginning of the 'define').

From now on, your admin panel will be accessible only through _http&#58;//www.yoursite.com/couch/prada78.php_

**3\.** The two steps given above should be enough but anyone accessing _http&#58;//www.yoursite.com/couch/_ will be shown a 'File not found' error.<br/>
This is not bad at all but will give a clue to someone looking for gaining entry that the index file has been renamed.<br/>
To make our defense complete, you'll find a file named '\_index.php' (that is an underscore before the 'index'). Make a copy of it and rename the copy to 'index.php' (i.e. remove the underscore). Upon accessing _http&#58;//www.yoursite.com/couch/_ the usual login box will be shown, however this 'index.php' is a specially crafted one and will NEVER allow a login to be successful. So any one trying to get in can try for as long as he wishes but will never be able to get it in.<br/>
This completes the illusion and will make someone trying to get in to bark up a different tree altogether

<p class="success">Be sure to remember yourself that the admin panel is now accessed through _http&#58;//www.yoursite.com/couch/prada78.php_ and not _http&#58;//www.yoursite.com/couch/_ lest you find yourself wondering why you are unable to login :).</p>
