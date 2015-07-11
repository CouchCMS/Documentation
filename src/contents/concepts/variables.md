---
title: Variables
category: concept
template: default.html
---

# Variables

Don't get put off by that programming term. Variable is simply a place that can hold different values at different times.

You can use the Couch tag named [_**set**_](../../tags-reference/set.html) to place values within variables. For example the following snippet -

```
<cms:set my_message='Hello World' />
```

\- will place value 'Hello World' within a variable named _my\_message_ (i.e. set _my\_message_ to 'Hello World').<br/>
This variable (_my\_message_) can then be used elsewhere.

For example, in the following snippet -

```
<cms:show 'Hello' />
```

\- we are passing 'Hello' as the parameter for [_**show**_](../../tags-reference/show.html) to display. If instead we do the following -

```
<cms:show my_message />
```

\- instead of explicitly passing 'Hello' as parameter, we are passing the value CONTAINED within _my\_message_ as the parameter. In this case 'Hello World' will get displayed.

Thus we see that variables act as simple containers for values.<br/>
The value can be changed anytime, thus -

```
<cms:set my_message='Salut!' />
<cms:show my_message />
```

\- [_**show**_](../../tags-reference/show.html) will now display 'Salut!'.

In the examples above, we set the variable ourselves manually.<br/>
However, the variables that we'll be dealing with more often are those that we'll find automatically set for us. e.g. -

1.  At the execution of a page, Couch automatically sets certain variables that describe the current page and the context it is being executed in. These variables remain available throughout the page.<br/>
    <br/>
    For example - the following snippet placed in any template will output the name of the template -<br/>
    <br/>
    ```<cms:show k_template_name />```
    and the following will output the link (URL) of the page -<br/>
    <br/>
    ```<cms:show k_page_link />```
    In the examples above, _k\_template\_name_ and _k\_page\_link_ are variables that have been set by Couch.<br/>
    <br/>
    See: [Variables available in Views](../variables-in-views.html)<br/><br/>
2.  A Paired tag usually sets certain variables that pertain to the task the tag does. These variables remain available only within the start-tag and the end-tag.<br/>
    <br/>
    For example - we have already seen how the [_**repeat**_](../../tags-reference/repeat.html) tag simply repeats the contents enclosed within it the number of times specified by the _count_ parameter. At each iteration, the [_**repeat**_](../../tags-reference/repeat.html) tag sets a variable named _k\_count_ that is set to the count of the current iteration.<br/>
    <br/>
    ```
    <cms:repeat count='4'>
        <cms:show k_count /><br>
    </cms:repeat>
    ```
    The snippet above will output -<br/>
    **0**<br/>
    **1**<br/>
    **2**<br/>
    **3**<br/>

Having now seen what variables are, we can move on to complete the previous topic - [**Setting a Tag's Parameters**](../setting-parameters.html).
