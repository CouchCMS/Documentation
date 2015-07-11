---
title: Setting a Tag's Parameters
category: concept
template: default.html
---

# Setting a Tag's Parameters

There are three ways a tag's parameter may be set -

**1\. By using an explicit value** - e.g.

```
<cms:show "Hello World" />
```

or

```
<cms:repeat count='4'>
    This line gets repeated
</cms:repeat>
```

In the snippets above, "Hello World" and '4' are literal values being used as parameters.<br/>
Please notice that **an explicit value is ALWAYS enclosed within quotes (either single or double)**.

**2\. By using a variable** - e.g.

```
<cms:show k_template_name />
```

or

```
<cms:set my_count='4' />
<cms:repeat count=my_count>
    This line gets repeated
</cms:repeat>
```

In the snippets above, _k\_template\_name_ and _my\_count_ are variables that are used as parameters.<br/>
Please notice that **any value that is NOT enclosed by quotes is considered by Couch to be a variable**.

**3\. By using the output of another tag** -

We know that while rendering a template, every tag gets replaced by its output (which might be a blank).<br/>
This feature can be utilized to set a tag's parameter by using the output of another tag.

```
<cms:set message="<cms:show 'Hello World' />" />
<cms:show message />
```

In the snippet above, message will be set to 'Hello World' which was the output of the nested [_**show**_](../../tags-reference/show.html) tag.<br/>
Please notice that **the nested tag is ALWAYS enclosed within DOUBLE quotes**.

<p class="notice">
    **V.IMP -**<br/>
    **If single quotes are used, Couch considers the parameter's value to be an explicit value.<br/>
    If double quotes are used, Couch considers the value to be either an explicit value OR the output from a nested tag.<br/>
    If no quotes are used, Couch considers the value to be a variable.**<br/>
    <br/>
    This is a very important point because it is very easy to forget the quotes while setting a parameter, e.g.<br/><br/>
    ```
<cms:repeat count=4></cms:repeat>
    ```
    \- in the snippet above the value being passed to _count_ is not enclosed within quotes and thus Couch, instead of considering it to be an explicit value '4', will consider it to be a variable named 4 and try and use the value of a variable named '4' as the parameter. Incidently, it is illegal to begin a variable's name with a number and so Couch will throw an error. But had this value been a text string e.g.<br/><br/>
    ```
<cms:show var=Hello />
    ```
    Couch would have used the value of an non-existent variable _Hello_ as parameter for [_**show**_](../../tags-reference/show.html), which would then have printed nothing.
</p>

### NESTING PARAMETERS

There is no limit to how deeply tags may be thus nested. That is to say that a tag being used as a parameter of another tag can itself have another tag as its own parameter and so on. Thus -

```
<cms:set message="<cms:show "<cms:show 'hello' />" /> world" />
```

Don't be confused by seeing a Couch tag being used as the parameter for another Couch tag.<br/>
Begin from the innermost nested tag and try mentally replacing it with its output -

```
<cms:set message="<cms:show "<cms:show 'hello' />" /> world" />
<cms:set message="<cms:show "hello" /> world" />
<cms:set message="hello world" />
```

and everything should make sense.

The example given above is rather extreme and futile but using the output of one tag as input for another is a very powerful mechanism and we'll be using it very often to solve some otherwise very sticky problems.

<p class="error">**ADVANCED** (skip the following section if you are not keen to delve any deeper into nested tags):</p>

As a more practical example consider the following very useful snippet -

```
<cms:if "<cms:exists "<cms:show k_page_name/>.inc" />" >
    <cms:embed "<cms:show k_page_name/>.inc" />
</cms:if>
```

Don't worry, we'll replace the tags by their outputs and everything will start making perfect sense.<br/>
The above snippet uses three new tags - [_**if**_](../../tags-reference/if.html), [_**exists**_](../../tags-reference/exists.html) and [_**embed**_](../../tags-reference/embed.html).<br/>
You can find more about them in the documentation but for now a brief word about these tags will do.

If the parameter passed to [_**if**_](../../tags-reference/if.html) tag is '1', it outputs anything contained between its start\_tag and end\_tag else it does not.<br/>
[_**exists**_](../../tags-reference/exists.html) expects the parameter passed to it to be a file's (or folder's) name. It tests if the given file/folder is actually present and if it is, it outputs '1', else it outputs '0'.<br/>
Finally, the [_**embed**_](../../tags-reference/embed.html) tag expects the parameter passed to it to be a file's name. It then simply reads the file and returns back its contents as its own output.

With this background, let us try replacing the tags with their respective outputs.<br/>
Always begin from the innermost tag, which here happens to be the [_**show**_](../../tags-reference/show.html) tag.<br/>
We are already familiar with the [_**show**_](../../tags-reference/show.html) tag.

```
<cms:show k_page_name/>
```

\- the parameter being passed to it has no quotes around it so it must be a variable.<br/>
The _k\_page\_name_ variable is set by Couch everytime a page (see [**pages**](../cloned-pages.html)) is executed to hold the page's name. Thus if the page being currently executed is _about-us_, the value of _k\_page\_name_ will be _about\_us_ while if the page being executed is _contact-us_, _k\_page\_name_ will be set to _contact-us_.

Assuming that the current page is _about-us_, substituting [_**show**_](../../tags-reference/show.html) tag with its output will result in -

```
<cms:if "<cms:exists "about-us.inc" />" >
    <cms:embed "<cms:show k_page_name/>.inc" />
</cms:if>
```

Assume that file named 'about-us.inc' does exist. In this case the output of [_**exists**_](../../tags-reference/exists.html) tag will be '1'. Substituting exists with its output results in -

```
<cms:if "1" >
    <cms:embed "<cms:show k_page_name/>.inc" />
</cms:if>
```

Since the parameter being passed to _if_ is '1', it will go ahead and execute the contents within it and return the output.<br/>
\- Resolve the contents of [_**if**_](../../tags-reference/if.html), using our substitution method -

```
<cms:if "1" >
    <cms:embed "about-us.inc" />
</cms:if>
```

Suppose the sole content of _about-us.inc_ is -<br/>
&lt;h1&gt;Hello I am About Us&lt;/h1&gt;,<br/>
this will be the output of the [_**embed**_](../../tags-reference/embed.html) tag, so we end up being -

```
<cms:if "1" >
    <h1>Hello I am About Us</h1>
</cms:if>
```

and finally the output of _if_ -

&lt;h1&gt;Hello I am About Us&lt;/h1&gt;

With the information we have had so far, we are ready to move on to the [**Editable Regions**](../editable-regions.html).
