---
title: embed
category: tag
template: default.html
---

# embed

The **Embed** tag can be used to divide your templates into manageable chunks.<br/>
Parts of the templates that are reused at several places can be placed in discrete files and the files then embedded via this tag.<br/>
e.g. most of the templates share the same header code. This can be cut and pasted into a file named 'header.inc' (the extension does not matter - it can be anything) and the file then saved into 'couch/snippets' folder.

The following code then can be placed where the original code was -

```
<cms:embed 'header.inc' />
```

This will result in exactly the same output as with the original code in place.<br/>
The advantage of using embedding is that if the code snippet is used in several templates, any future modifications will now need to be done only in a single file.

<p class="notice">
    **Embed** tag, when looking for the embedded file, searches along a path relative to the 'couch/snippets' folder. Thus in the example above, the 'header.inc' file should reside directly in 'snippets' folder for Couch to find it. Had the passed parameter been 'common/header.inc', Couch would have looked for the file within a sub-folder named 'common' within 'couch/snippets'. Similarly if the parameter passed was '../../common/header.inc', Couch would have gone up in the folder hierarchy twice (first time landing in the 'couch' folder and next time in the folder where your website resides) and then looked for the embedded file within a subfolder named 'common'.<br/>
    <br/>
    **UPDATE:** From version 1.1.1, the base path relative to which Couch searches for embedded files can be changed from the default 'couch/snippets' folder to any folder **relatve to your main site**. This can be done by setting the _12b. K\_SNIPPETS\_DIR_ configuration item within your _config.php_ file.<br/>
    This is convenient when you choose to use a subfolder within your main site to store embedded snippets instead of storing them within 'couch/snippets' folder. For example if _K\_SNIPPETS\_DIR_ is set to 'common', &lt;cms:embed 'header.inc' /&gt; will now cause Couch to look for 'header.inc' within the 'common' subfolder that resides in the root folder of your website.<br/>
    <br/>
    **IMP.** If you choose to place your snippets in any folder other than the default 'couch/snippets' folder or any of its subfolders, do take care to prevent the snippets from being directly downloadable. 'couch/snippets' folder is protected from this problem by a .htaccess file present within it. You can copy this file into your folder to disallow everybody from directly accessing your snippets.
</p>

<p class="error">**IMP.** If the code snippet you choose to place in a separate embeddable file contains Couch tags (i.e. those that begin with _&lt;cms:_), take care not to truncate any tag block. That is, always make sure that every opening tag also has the associated end tag included within the embedded snippet. Embedding partial tags will cause the  parser to emit parse errors.</p>

To illustrate the concept of embedding we use an ultra-trivial example here. In real life scenarios, the embedded snippets may be of any complexity. Suppose we have this piece of code somewhere in a template

```
<div class="right">
    <b class="title"><cms:show 'Hello World' /></b>
</div>
```

This does nothing except display 'Hello world'. We now cut and paste the bold part into a file named, say, 'greeting.inc' and save the file into 'couch/snippets' folder. The above code is modified thus -

```
<div class="right">
    <cms:embed 'greeting.inc' />
</div>
```

and upon executing the page we get the same output as before.

Embedded snippets can themselves contain other embedded snippets. Thus to stretch our, already contrived, example a little further, open the 'greeting.inc' file, remove the 'Hello world' part and save it into a separate file named 'message.inc'. Embed the new file within 'greeting.inc' thus -

```
<b class="title"><cms:show "<cms:embed 'message.inc' />" /></b>
```

Notice the use of double quotes. Executing the template results in the same output as having the entire string right there within the template instead of embedding it in two separate files (original template embeds 'greeting.inc' which in turn embeds 'message.inc').

<p class="error">**WARNING:** Make sure that none of the children embedded files embeds back a parent file. This will lead to recursion and an infinite loop.</p>

### Passing code directly

Instead of using a physical file, **Embed** tag can be passed code directly to include  (see parameters section below).<br/>
For example, in the template code mentioned above, we can use

```
<div class="right">
    <cms:set my_var="<b class='title'><cms:show 'Hello world' /></b>" />
    <cms:embed code=my_var />
</div>
```

Per se, this does not seem to be of much use, but this ability of **embed** tag to execute code contained within a variable can be a very powerful thing if that variable happens to be a custom field (i.e. an editable area defined by you within a template).<br/>
Clearly we can now store snippets or even complete templates as editable regions that can be tweaked within the browser itself instead of manipulating a physical file and FTP'ing it back to the server.

<p class="error">Make sure that the type of the editable region is _textarea_ and that its _no\_xss\_check_ parameter is set to '1' (this will prevent Couch from mangling up the &lt; and &gt; tags the way it usually does to stop XSS attacks).</p>

## Parameters

*   unnamed or code

If the first parameter is unnamed (i.e. only the value is passed) or it is anything other than 'code', it is considered to be a path to an embedded file. The path is always relative to the 'couch/snippets' folder. e.g.

```
<cms:embed 'message.inc' />
```

However if the parameter is named 'code', the value is considered to be a valid code snippet and is executed thus.<br/>
For example -

```
<cms:embed code="<b class='title'><cms:show 'Hello world' /></b>" />
```

or

```
<cms:set my_var="<b class='title'><cms:show 'Hello world' /></b>" />
<cms:embed code=my_var />
```

## Variables

This tag does not set any variables of its own.
