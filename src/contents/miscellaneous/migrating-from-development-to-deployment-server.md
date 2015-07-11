---
title: Migrating from development to deployment server
category: miscellaneous
template: default.html
---

# Migrating from development to deployment server

Two additions have been made to Couch 1.1 that will ease the task of a designer who develops a client's site on his own (usually local) machine and then finally deploys it onto his client's host.

**1.** The first change that has been made is that the editable regions of type 'image', 'thumbnail' and 'file' no longer store the full path of their contents. As an example, suppose the designer sets up a page and uploads an image to show up on it. Prior to version 1.1, Couch would have stored the full path of the image in the database. Since the machine the designer is working on is his local one, this path also references his local machine. It is not difficult to see that after he migrates this site to the deployment server, these paths will still continue to point to his local machine and he'll be required to rectify them all manually.<br/>
With version 1.1, Couch internally stores all the paths relative to the server it is executing from. This completely solves the issue outlined above.

**2.** As a part of developing a client's site, apart from setting up the templates, a designer usually also creates several pages and inputs data within them.<br/>
While deploying the site at the client's server, there was no simple way of recreating the same pages at the new location except doing so manually or using phpMyAdmin.

Couch 1.1 now ships with a small utility named 'gen\_dump.php' within the 'couch' folder (akin to the 'gen\_htaccess.php' that you are already familiar with).<br/>
Once the local site is complete and you are ready to move it, execute this utility (while being logged in as the super-admin of course). It will create a dump of the local data in a file named 'install\_ex.php' and prompt you save it somewhere on your machine.<br/>
Download it and save it within your 'couch' folder (or whatever it has been renamed to).<br/>
Now copy your entire local site (along with the 'couch' folder and the 'install\_ex.php' within it) to the deployment server.

Now proceed with the usual way of installing Couch -<br/>
Make changes to the 'config.php' to reflect the new database information.<br/>
Access the 'couch' folder on the new machine in a browser.<br/>
Couch will sense that installation is required and will prompt you for the admin name etc. (the usual stuff) and will initiate installation.<br/>
The installation routine will detect the presence of the dump file 'install\_ex.php' and will use it to recreate the data from your local machine at the new location.<br/>
Login into the installation and you should find it to be an exact copy of what you configured on your local machine.

To recap, the only new step is to use 'gen\_dump.php' to create the dump file named 'install\_ex.php' and store it within the 'couch' folder for the installation routine to find.
