---
title: get
category: tag
template: default.html
---

# get

The **get** tag is used to output the value of the variable the name of which is supplied to it as its parameter.<br/>
For example -

```
<cms:set my_var='10' />
<cms:get 'my_var' />
```

In the snippet given above,  'my\_var' is the name of the variable the value of which is output by the **get** tag.<br/>
The output of the snippet is '10'.

Compare the **get** tag with the **show** tag that takes a value (not the name) as its parameter.

In the snippet given above, if we substitute the **get** tag with the **show** tag -

```
<cms:set my_var='10' />
<cms:show 'my_var' />
```

\- the output would be 'my\_var' and not '10'.

The snippet has to be written in the following manner to make it show the value contained within variable _my\_var_ -

```
<cms:set my_var='10' />
<cms:show my_var />
```

Notice how the absence of the quotes in the parameter which signifies that it is a variable. This time the output is '10'.

Consider what would happen with the **get** tag if we forgot the quotes around the first parameter -

```
<cms:set my_var='10' />
<cms:get my_var />
```

The **get** tag will try and fetch the value of a variable named '10', which would be non-existent.

The **get** tag is useful in the cases where we have to fetch the values of variables the names of which are generated dynamically.

## Parameters

*   var
*   local\_only

### var

Name of the variable the value of which is to be output.

### local_only

If this parameter is set to '1', **get** will search for the variable only in the local scope.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [show](../show.html)
*   [set](../set.html)
*   [get\_custom\_field](../get_custom_field.html)
*   [pages](../pages.html)
