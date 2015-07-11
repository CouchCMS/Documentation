---
title: Editable Regions
category: concept
template: default.html
---

# Editable Regions

With the introduction to the tags over, let us now take a look at, arguably, the most important tag in Couch - the [_**Editable**_](../../tags-reference/editable.html) tag.<br/>
You can use it to define areas within your HTML template that you wish to make editable.

As an example, suppose the following is a chunk of HTML from a template named _property.php_ -

```
<div class="prop_desc">
    <b>Property Description:</b>
    <span class="gray">
        Condo pricing starts at just under $700,000.
        Waterfront Private Residences.
        Jack Nicklaus Signature Golf Course.
    </span>
    <br class="clear"/>
</div>
```

The highlighted part is the description of some property. Suppose you wish to allow the user to edit this part himself.<br/>
To do so, simply enclose this part by an [_**editable**_](../../tags-reference/editable.html) tag -

```
<div class="prop_desc">
    <b>Property Description:</b>
    <span class="gray">
        <cms:editable name='prop_desc' >
        Condo pricing starts at just under $700,000.
        Waterfront Private Residences.
        Jack Nicklaus Signature Golf Course.
        </cms:editable>
    </span>
    <br class="clear"/>
</div>
```

[_**Editable**_](../../tags-reference/editable.html) tag accepts several parameters but only one is mandatory - _name_. It has to be unique within a template.

Now, while being logged in as the super-admin, visit the template in your browser.<br/>
For example, if the template was _property.php_, visit _http&#58;//www.yoursite.com/property.php_

<p class="notice">At the risk of repeating ourselves - for your changes to show up in the admin panel, you'll always need to run the modified template in the browser while being logged in as the super-admin.</p>

Now visit the admin panel and access _property.php_ and you'll find that Couch has created a textarea for the editable region.

<p class="success">
    If you enclose some text between the opening and closing [_**Editable**_](../../tags-reference/editable.html) tags, this will cause Couch to display the text as default text within the editable region. Sometimes you do not wish have any default text displayed at all. For such cases, you can use the [_**Editable**_](../../tags-reference/editable.html) tag as a self closing tag.<br/>
    <br/>
    ```
<cms:editable name='prop_desc' />
    ```
</p>

Input or edit the text within this textarea and save your changes.<br/>
Visiting the template in your browser again should show up the edited text on the webpage.

### TYPES OF EDITABLE REGIONS

In the example above, the type of the editable region that Couch created to allow editing was a textarea.<br/>
You have a choice of several other types of editable regions that you can ask Couch to create, depending on the kind of data that will be inputted into it.<br/>
For example, the textarea created above is suitable when you wish the users to input only plain text (i.e. not formatted by HTML tags). However, when the type of text that will be inputted requires HTML formatting, you can get Couch to create a richtext editor instead.<br/>
Similarly, sometimes a single line of text input is all that is needed.<br/>
The _type_ parameter of Editable text can bet set to the kind of editable region you wish to create.

e.g. setting the type to 'richtext' -

```
<cms:editable name='prop_desc' type='richtext'>..</cms:editable>
```

\- will result in Couch now displaying a WYSIWYG editor instead of the plain textarea.

The followng are the different types of editable regions currently supported by Couch -

*   [text](../../tags-reference/editable/text.html)
*   [password](../../tags-reference/editable/password.html)
*   [textarea](../../tags-reference/editable/textarea.html)
*   [richtext](../../tags-reference/editable/richtext.html)
*   [image](../../tags-reference/editable/image.html)
*   [thumbnail](../../tags-reference/editable/thumbnail.html)
*   [file](../../tags-reference/editable/file.html)
*   [radio](../../tags-reference/editable/radio.html)
*   [checkbox](../../tags-reference/editable/checkbox.html)
*   [dropdown](../../tags-reference/editable/dropdown.html)
*   [group](../../tags-reference/editable/group.html)
*   [message](../../tags-reference/editable/message.html)
*   [nicedit](../../tags-reference/editable/nicedit.html)
*   [relation](../../tags-reference/editable/relation.html)

You can define any number of editable regions in a template.

<p class="error">**V.IMP:** Editable tags cannot be nested within other editable tags.</p>

### ACCESSING THE CONTENTS OF EDITABLE REGIONS

There are four ways the contents of an editable region defined within a template may be accessed. The first two can be used only within the templates that defined the editable regions while the last two can be used in any template - even those that did not define the regions.

**1\. As the output of the editable tag defining it -**

You might recall from our previous discussion about tags that, every tag after executing its function returns back it output (which could be a blank).

The [_**editable**_](../../tags-reference/editable.html) tag, as its function, checks if the editable region has not already been created in the Admin Panel. If not, it creates one. After executing its function, the [_**editable**_](../../tags-reference/editable.html) tag fetches back the contents of the editable region and returns it as its output.

Thus you can see that in the resulting webpage, the [_**editable**_](../../tags-reference/editable.html) tags are replaced by the current contents of the associated editable regions.

**2\. As variables automatically set by Couch -**

When a page is executed, Couch makes available the current contents of all the editable regions contained within the page as variables of the same names.<br/>
Thus in the example above, since the name of the editable region is _prop\_desc_, a variable by the same name will also be set by Couch during the execution of this page.<br/>
So if you use the following snippet anywhere within your template -

```
<cms:show prop_desc />
```

the current contents of the editable region will be output by show.

\[See: [Variables available in Views](../variables-in-views.html)\]

**3\. As variables set by the [_pages_](../../tags-reference/pages.html) tag -**

The [_**pages**_](../../tags-reference/pages.html) tag is used to list (all or specific) pages cloned from a template. The tag, as it fetches the pages, makes vailable all the variables pertaining to the pages - these include the variables that represent the editables regions defined for the pages.

See also [**Listing Pages**](../listing-pages.html)

**4\. By using the [_get\_custom\_field_](../../tags-reference/get_custom_field.html) tag -**

While the [_**pages**_](../../tags-reference/pages.html) tag mentioned in the previous method can be used to access all the variables of a page (or multiple pages) in a single go, the [_**get\_custom\_field**_](../../tags-reference/get_custom_field.html) tag can be used to access a single variable of a page.

See [_**get\_custom\_field**_](../../tags-reference/get_custom_field.html) tag for more details.

### SEPARATING THE DEFINITION OF EDITABLE REGION FROM ITS DISPLAY

In the examples above we have been creating the editable regions exactly at the spot where we wanted their outputs to appear. In effect we have been using the [_**editable**_](../../tags-reference/editable.html) tag to both define the editable regions as well as to display their contents.

In complex templates (_clonable_ templates, specifically) with several editable regions it is sometimes more manageable to define all the editable regions together at a single place.

For such cases, we can use the [_**editable**_](../../tags-reference/editable.html) tag to only define the editable regions and use the [_**show**_](../../tags-reference/show.html) tag to display the contents.<br/>
A good practice is to define together all editable regions used by the template somewhere at the very top of the template -

```
<cms:template title='Index' clonable='1' >
    <cms:editable name="body" label="Body" type="richtext" />
    <cms:editable name="excerpt" label="Excerpt" type="textarea" />
</cms:template>
```

The editable tags themselves can be enclosed within [_**template**_](../../tags-reference/template.html) tag (more about it in a little while) because this is a key tag in clonable templates and also because this tag has no output of its own and thus it 'swallows up' the default output of the enclosed editable tags, which otherwise would have appeared on the webpage.

If you do not wish to enclose the [_**editable**_](../../tags-reference/editable.html) tags within [_**template**_](../../tags-reference/template.html) tag, set the _hidden_ parameter of each to '1' and this will turn off the output of the tags.

The content of these editable regions can be displayed where ever required by using the [_**show**_](../../tags-reference/show.html) tag -

```
<cms:show body />
<cms:show excerpt />
```
