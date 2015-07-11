---
title: each
category: tag
template: default.html
---

# each

The **Each** tag, given a string containing values separated by a known separator, splits it up along the separator and returns each value.<br/>
For example, assume we have a variable 'msg' -

```
<cms:set msg='hello|world|how|do|you|do' />
```

Passing variable 'msg' as parameter to **each** like this -

```
<cms:each msg sep='|' >
    <cms:show item /><br>
</cms:each>
```

will make available each of the '|' separated words as variable named 'item' (which is then being displayed using **show** tag).

```
hello
world
how
do
you
do
```

<p class="notice">The above example could have been written without specifying 'sep', because the default separator is '|'.</p>

<p class="success">One real world scenario for using **each** is while handling submission of forms containing multiple checkboxes. If more than one checkbox is selected, the checkbox variable contains a '|' separated string with values for each selected checkbox.</p>

## Parameters

*   var
*   as
*   sep

### var

The string to split. If passed as the first parameter, the name 'var' can be omitted and only the value passed. e.g.

```
<cms:each var=msg >..</cms:each>
```

```
<cms:each msg >..</cms:each>
```

both of the above are same.

### as

Name of the variable as which each of the values obtained after splitting the string will be made available.<br/>
By default, the variable is named 'item'.<br/>
If you wish to use some other name, it can be specified thus -

```
<cms:each msg as='my_var' >
    <cms:show my_var/><br>
</cms:each>
```

### sep

The separator along which the provided string is split.<br/>
By default, the pipe character '|' is assumed as the separator.<br/>
If any other character is being used in the string, it can be specified this way -

```
<cms:each msg sep='@' >..</cms:each>
```

## Variables

*   item

### item

This is the default variable that contains the value obtained.<br/>
If any other variable is specified using the **as** parameter, as explained in parameters, then this variable will not be set.<br/>
The specified variable will be set instead.

## Related Tags

*   [repeat](../repeat.html)
*   [zebra](../zebra.html)
