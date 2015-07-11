---
title: Templates
category: concept
template: default.html
---

# Templates

To start working with Couch, you need to have a regular HTML coded site in hand.<br/>
As an example, your site could consist of several HTML pages e.g. _index.html_, _services.html_, _about-us.html_, _contact-us.html_ etc. along with the associated media, CSS and JavaScript files.<br/>
**Each of the above mentioned HTML files, for Couch, is a template.**

Couch works by retrofitting into these templates.<br/>
Since the templates used by Couch are regular HTML files, any of your existing static HTML sites too can be easily ported to Couch with minimal effort.

### INSTALLING COUCH

Please see the following tutorial, where we use Couch to build a full fledged site, for a step-by-step illustrated guide on how to install Couch - [Building a real-world site](../../tutorials/portfolio-site/building-a-real-world-site.html).

### HOOKING UP COUCH INTO THE TEMPLATES

<p class="error">**IMP.** To make the following changes you need to be logged in as the super-admin (the first account created by Couch during its installation). If you are not already logged in as super-admin, do so now else the following procedure will not work.</p>

Once Couch is installed, the next step is to hook it up into the templates.<br/>
Three steps are required to accomplish this -

1.  Since Couch is a PHP application, in order to make to your HTML templates compatible with it you need to change their extensions from '.html' or '.htm' to '.php'.<br/>
    For example, if _about-us.html_ is a template that you wish to be managed by Couch, rename it as _about-us.php_.<br/>
    Accessing _http&#58;//www.yoursite.com/about-us.php_ should show up the page just the way it was when it had a '.html' extension.
2.  Once the template has been made a '.php' file, two lines of PHP code need to be added to it.<br/>
    Open the template in a text editor (any plain text editor will do fine. We recommend using Notepad++. It is free and awesome).<br/>
    At the very top of the page, add the following line -<br/>
    <br/>
    ```<?php require_once( 'couch/cms.php' ); ?>```
    \[IMP. It is important that you place it at the very top so that it becomes the first line of your template.\]<br/>
    <br/>
    Add the following as the LAST line of your template -<br/>
    <br/>
    ```<?php COUCH::invoke(); ?>```
    That is it. That is all the PHP that you'll ever need to write for using Couch.
3.  As the final step, you'll need to execute the template - i.e. access it through the browser.<br/>
    For example, if _about-us.php_ was the template, upload it back to your server and access _http&#58;//www.yoursite.com/about-us.php_ through a browser.<br/>
    <br/>
    \[IMP. This is something you'll come across often - for your changes to show up in the admin panel, you'll need to run the modified template in the browser while being logged in as the super-admin\]<br/>
    <br/>
    If everything goes right, nothing should appear to have changed. The page should look exactly the same in the browser as it did before. However, now when you visit Couch's Admin Panel (_http&#58;//www.yoursite.com/couch/_) you should see that _about-us.php_ has been added to the list of templates that are managed by Couch.

### WHAT NEXT?

Once we have Couch hooked into the template, we can place Couch [**Tags**](../tags.html) in the template to make Couch work its magic.
