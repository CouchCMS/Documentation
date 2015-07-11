---
title: else
category: tag
template: default.html
---

# else

The **Else** tag always occurs within an **If** tag block.<br/>
Often you'd want to execute a certain set of statements when a given condition is met and a different set when the condition is not met.<br/>
**Else** provides this capability by extending the **If** tag. It does so by delimiting statements that will be executed when the condition given to the **if** does not evaluate to true.<br/>
For example -

```
<cms:if my_var == 'hello' >
    <h3> Hello </h3>
<cms:else />
   <h3> Don't know what it is </h3>
</cms:if>
```

In the snippet above, if variable 'my\_var' contains 'hello', all the statements within the **if** tag block upto the **else** tag will be executed. In case 'my\_var' contains any other value, all the statements within the **if** tag block starting from the **else** tag upto the end tag of **if**, will be executed. (In our example there are only single statements for both conditions but there can be any number of them).

<p class="notice">Notice that the **else** tag is a self closing tag.</p>

In cases where there are more than two outcomes of the condition, the **else** block can be made to contain another nested **if** block -<br/>
For example, here is a snippet that shows the stage of life by evaluating the variable 'age'.

```
<cms:if age lt '1' >
    <h3>Infant</h3>
<cms:else />
    <cms:if (age ge '1') && (age lt '3') >
        <h3>Toddler</h3>
    <cms:else />
        <cms:if (age ge '3') && (age lt '5') >
            <h3>Preschooler</h3>
        <cms:else />
            <cms:if (age ge '5') && (age lt '11') >
                <h3>School Age</h3>
            <cms:else />
                <cms:if (age ge '11') && (age lt '13') >
                    <h3>Preteen or Tween</h3>
                <cms:else />
                    <cms:if (age ge '13') && (age lt '20') >
                        <h3>Teen</h3>
                    <cms:else />
                        <h3>Adult</h3>
                    </cms:if>
                </cms:if>
            </cms:if>
        </cms:if>
    </cms:if>
</cms:if>
```

## Parameters

This tag does not take any parameter.

## Variables

This tag does not set any variables of its own.

## Related Tags

*   [if](../if.html)
