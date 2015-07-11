---
title: exists
category: tag
template: default.html
---

# exists

The **Exists** tag can be used to confirm the presence of a file or a folder on the server.<br/>
It returns '1' if the object file/folder exists. Otherwise it returns a '0'.<br/>
For example -

```
<cms:exists "contact.inc" />
```

will output either '1' or '0' depending on whether the file 'contact.inc' is present or not within the 'couch/snippets' folder.

<p class="notice">
    Exactly like the [**embed**](../embed.html) tag, the **exists** tag considers the file/folder provided to be relative to the 'couch/snippets' folder.<br/>
    For example<br/>
    <br/>
    ```
<cms:exists "common/contact.inc" />
    ```
    will look for 'contact.inc' file within a folder named 'common' that resides within the 'couch/snippets' folder. Whereas<br/>
    <br/>
    ```
<cms:exists "../../common/contact.inc" />
    ```
    will move up through the folder hierarchy (the first '../' will move into the 'couch' folder while the next '../'  will move into the website folder within which 'couch' folder resides) and search for the file within a folder named 'common' residing in the main website folder.
</p>

Combined with the [**If**](../if.html) tag and [**Embed**](../embed.html) tag, the **Exists** tag provides a very powerful method of choosing the right template to display while showing a particular page.<br/>
For example, let us say we have a template 'index.php' that is clonable and several pages have been made out of it - e.g. 'about-us', 'services',  'contact-us' etc.. The template has defined one editable richtext area named 'my\_content' and, as usual, every page has its own data in this area. The code within this template to display the data for each cloned page might go somewhat like this

```
<cms:if k_is_page >
   <cms:show my_content />
</cms:if>
```

This is perfect for all pages but for 'contact-us', we do not want to display 'my\_content'. We wish to display a form (created by using [**Form**](../form.html) tag). One way to do this would be to make 'contact-us' a separate template in itself. However a better method would be to check in the code snippet above whether the page being displayed is 'contact-us' or not and if it is, instead of displaying the usual 'my\_content', display the form instead.<br/>
Let us say we have saved the code for the form in a snippet called 'contact-us.inc' within 'couch/snippets' folder. The modified code will be -

```
<cms:if k_is_page >
   <cms:if k_page_name=='contact-us' >
      <cms:embed 'contact-us.inc' />
   <cms:else />
       <cms:show my_content />
   </cms:if>
</cms:if>
```

This will do the trick.<br/>
However, suppose there is one other page, 'testimonials', where we wish to use the [**Pages**](../pages.html) tag to iterate through and display excerpts from pages created through some other template (or any other logic). Once again, instead of creating a separate template, we decide to check for 'testimonials' page and execute some different code. We'll assume that the code for this page has been saved in a snippet named 'testimonials.inc' within snippets folder.<br/>
The code above can be modified to fit in the new condition -

```
<cms:if k_is_page >
   <cms:if k_page_name=='contact-us' >
      <cms:embed 'contact-us.inc' />
   <cms:else />
        <cms:if k_page_name=='testimonials' >
            <cms:embed 'testimonials.inc' />
        <cms:else />
            <cms:show my_content />
        </cms:if>
   </cms:if>
</cms:if>
```

This works but it is now becoming painfully evident that this technique is crumbling under its own weight and the addition of few more pages will make it too complex to handle.

Employing **Exists** tag for the above task makes it a snap. Here is how -

```
<cms:if k_is_page >
    <cms:if "<cms:exists "<cms:show k_page_name/>.inc" />" >
        <cms:embed "<cms:show k_page_name/>.inc" />
    <cms:else />
        <cms:show my_content />
    </cms:if>
</cms:if>
```

Notice how we are checking for the existence of a snippet that is named the same as the page being displayed (but with a '.inc' appended).<br/>
If such a file exists, it gets embedded, else the usual logic is folllowed.<br/>
The beauty of this method is that if you decide to add more pages that will require custom logic, you simply have to place the code in a snippet named the same as the page (and a '.inc' extension) and put the snippet in the 'couch/snippets' folder.<br/>
You'll never need to modify the code given above.

## Parameters

*   unnamed

Takes one unnamed parameter (only the value is required).<br/>
It is considered to be a path to a file or folder. The path is always relative to the 'couch/snippets' folder.<br/>
See above for a discussion on relative path.

## Variables

This tag does not set any variables of its own.

## Related Tags

*   [page\_exists](../page_exists.html)
