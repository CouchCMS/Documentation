---
title: Tags
category: concept
template: default.html
---

# Tags

In Couch, tags are what make things happen.

The tags have been modeled after XML tags and hence should appear familiar to you.<br/>
Similar to the XML tags, a Couch tag is either _self-closing_ or consists of a _start-tag/end-tag_ pair.

#### Self Closing:

This is how a typical self closing Couch tag looks like -

```
<cms:show 'Hello World' />
```

#### Start-tag/End-tag pair:

This is how a typical paired tag looks like -

```
<cms:repeat count='4'>
    <h3>This heading will be repeated 4 times</h3>
</cms:repeat>
```

Every thing between the start-tag and the end-tag is considered to be the input for the paired tag.

Every Couch tag begins with '**&lt;cms:**' followed by the tag's name (_show_ and _repeat_ in the examples above).<br/>
The name may be followed by zero to any number of parameters (this depends on the tag in question).

Depending upon the parameters and the input, a tag executes some function (e.g. modify the input, create a folder or fetch content from somewhere). If the action results in any displayable output, the tag returns back this output else it returns back a blank.

<p class="notice">
    When a template containing Couch tags gets finally rendered in a browser, each of the tag is replaced by its individual output.<br/>
    Therefore, a Couch tag will never appear in the HTML that is returned to the browser.
</p>

### PARAMETERS

Parameters are used to modify a tag's behaviour. They provide the tag with specific information about what it is supposed to do. In the following example, 'Hello World' is a parameter and is the message that [_**show**_](../../tags-reference/show.html) tag is supposed to display.

```
<cms:show 'Hello World' />
```

In the following example, '4' is the parameter and it is the number of times that the [_**repeat**_](../../tags-reference/repeat.html) tag will repeat the contents enclosed by it.

```
<cms:repeat count='4'>
    <h3>This heading will be repeated 4 times</h3>
</cms:repeat>
```

### NAMED AND UNNAMED PARAMETERS

Please notice that in the second example above, we are explicitly naming the parameter (_count='4'_ - where 'count' is the name and '4' is the value of the parameter), whereas in the first example the parameter was passed unnamed.

In Couch, naming the parameters is entirely optional but then you'll have to make sure that you pass the parameters in the exact sequence the tag expects them in. Thus, for example, [_**repeat**_](../../tags-reference/repeat.html) tag can take two parameters 'count' and 'startcount' where 'startcount' is expected to be the second parameter. If we explicitly name the parameters, e.g. -

```
<cms:repeat count='4' startcount='1'></cms:repeat>
<cms:repeat startcount='1' count='4'></cms:repeat>
```

\- the sequence of the parameters does not matter as there is no ambiguity. However, if we were to pass them unnamed e.g. -

```
<cms:repeat '1' '4'></cms:repeat>
```

\- the above will be interpreted as count=1 and startcount=4, which is not what was meant.

<p class="success">
    It is a good practice to always name the parameters unless the tag takes only one parameter e.g. the [_**show**_](../../tags-reference/show.html) tag above, in which case there can never be any ambiguity. In fact the [_**show**_](../../tags-reference/show.html) tag ignores the name you give to the parameter totally, thus<br/>
    <br/>
    ```
<cms:show 'Hello' />
<cms:show var='Hello' />
<cms:show foobar='Hello' />
    ```
    \- all result in the same output.
</p>

We'll have more to say about the various ways a parameter can be set, but before we can proceed to that, another concept needs to be known - [**variables**](../variables.html).
