---
title: Rebranding (White-Label)
category: miscellaneous
template: default.html
---

# Rebranding (White-Label)

Purchasing a commercial license permits you to replace CouchCMS logo and copyright information in the admin-panel with your own. This is white-labeling or rebranding. Your clients will never even know that you are using CouchCMS.

Once you have received our email confirming your purchase, there are two places where you need to make slight modifications to effect this white-labeling:

**1\.** In **couch/config.php**, scroll down and find the following line. Change the **0** to **1**.

```
define( 'K_PAID_LICENSE', 0 );
```

Immediately below the above setting you'll find the following lines.<br/>
Uncomment the ones containing 'define' (i.e. remove the '//' prefixed to 'define') and add your own info -

```
// Rebranding. Uncomment the following defines and add your info.

// 99a. Company Logo on light background  (Max. 171 x 64 pixels. Needs to be placed within 'couch/theme/images/' folder)
//define( 'K_LOGO_LIGHT', 'couch.gif' );

// 99b. Company Logo on dark background  (Max. 171 x 64 pixels. Needs to be placed within 'couch/theme/images/' folder)
//define( 'K_LOGO_DARK', 'couch_dark.gif' );

// 99c. Footer content (Company name and link)
//define( 'K_ADMIN_FOOTER', '<a href="http://www.yourcompany.com">COMPANY NAME</a>' );
```

**2\.** In the **language file** being used by your site (default being **EN.php**) found in the 'couch/lang' folder, find the following lines and modify them to suit your needs. This will change the title of the admin-panel and login box.

```
// Addendum to Version 1.1 /////////////////////////////////////
// Admin Panel
$t['admin_panel'] = 'Admin Panel';
$t['login_title'] = 'CouchCMS';
```

<p class="error">
    **IMP.** Rebranding **DOES NOT** however permit you to remove copyright notices in the source code of the Software.<br/>
    These copyright notices must remain intact **under any circumstances**.
</p>
