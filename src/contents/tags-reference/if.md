---
title: if
category: tag
template: default.html
---

# if

The **If** tag is one of the most important tags. It can be used to make decisions based on the presence or absence of a certain condition (or conditions) and then execute or ignore statements enclosed within the opening and closing **If** tags.

```
<cms:if my_var >
   <h3> my_var is present </h3>
</cms:if>
```

In the snippet above, the heading will be outputted only if a variable named 'my\_var' is present and has a value that is not '0'.

<p class="notice">**If** evaluates the condition(s) provided as parameter and executes all the statements enclosed within it **only** if the result of the evaluation is **neither '' (i.e. blank or no value) nor '0'**.</p>

In the above snippet we were checking if the variable has any value at all. We can also check if a variable has a certain value or if that value is greater than or smaller than a certain value -

### Checking if equal

```
<cms:if my_var = 'hello' >
    <h3> Hello </h3>
</cms:if>
```

In the snippet above we are checking if the variable 'my\_var' holds the string 'hello' and output 'Hello' only if it does.

<p class="notice">As noted above, **If** goes ahead with executing statements enclosed within it only if the result of evaluating the condition is neither blank nor '0'. During the comparision above, if my\_var is indeed equal to 'hello', the result of the evaluation is '1', otherwise the result is '0'.</p>

Instead of '=' we can also use 'eq' or '==' -

```
<cms:if my_var eq 'hello'> <h3>Hello</h3> </cms:if>
```

```
<cms:if my_var == 'hello'> <h3>Hello</h3> </cms:if>
```

The above are the same as using '='.

### Checking if not equal

```
<cms:if my_var != 'hello' >
    <h3> Not Hello </h3>
</cms:if>
```

In the snippet above we are checking if the variable 'my\_var' does NOT hold the string 'hello' and output 'Not Hello' only if it is true.<br/>
Instead of '!=' we can instead use 'ne' -

```
<cms:if my_var ne 'hello'> <h3> Not Hello </h3> </cms:if>
```

The above is the same as using '!='.

### Checking if greater than

```
<cms:if my_var gt '100' >
    <h3> Value greater than 100 </h3>
</cms:if>
```

In the snippet above we are checking if the value in variable 'my\_var' is greater than 100\.

### Checking if greater than or equal

```
<cms:if my_var ge '100' >
    <h3> Value greater than or equal to 100 </h3>
</cms:if>
```

In the snippet above we are checking if the value in variable 'my\_var' is greater than or equal to 100\.

### Checking if lesser than

```
<cms:if my_var lt '100' >
    <h3> Value lesser than 100 </h3>
</cms:if>
```

In the snippet above we are checking if the value in variable 'my\_var' is lesser than 100\.

### Checking if lesser than or equal

```
<cms:if my_var le '100' >
    <h3> Value lesser than or equal to 100 </h3>
</cms:if>
```

In the snippet above we are checking if the value in variable 'my\_var' is lesser than or equal to 100\.

### Combining multiple conditions using && (AND), || (OR)

### && (AND)

If multiple conditions are combined by using '&&', the **If** statement will execute only if **ALL** the conditions are true.

```
<cms:if (age gt '18') && (age lt '40')> .. </cms:if>
```

The above will be true only if variable 'age' is greater than 18 and is lesser than 40\. Thus if 'age' is 25, the above **If** statement will execute but if 'age' is 50, it will not because the second condition is false.

### || (OR)

If multiple conditions are combined by using '||', the **If** statement will execute even if **any one** of the conditions is true.

```
<cms:if (age gt '18') || (age lt '40')> .. </cms:if>
```

The above will be true if variable 'age' is greater than 18 or is lesser than 40\. Thus if 'age' is 25, the above **If** statement will execute (both conditions true) but if 'age' is 50, it will still execute because the first condition is true. In fact the above statement will always execute. A better illustration would be

```
<cms:if (age lt '18') || (age gt '40')> .. </cms:if>
```

here an age of 13 will cause the **If** to execute and so will an age of 50 but an age of 25 will not do so. As another example -

```
<cms:if (age gt '18') || (sex == 'M')> .. </cms:if>
```

The statement above will execute if either age of the person is more than 18 or if his sex is male regardless of his age (I know, this is sexist).

### Using && and || together

Both && as well as || can be used together in the same **if** tag

```
<cms:if (age lt '18') || (age gt '40') && (sex == 'M')> .. </cms:if>
```

In the snippet above it seems we are trying to do something only if the sex of a person is male and his age is less than 18 or more than 40\.<br/>
Suppose that the variable 'age' holds a value of '13' while variable 'sex' holds 'F. For example -

```
<cms:set age = '13' />
<cms:set sex = 'F' />

<cms:if (age lt '18') || (age gt '40') && (sex == 'M')>
   <h3>Welcome Gentleman!</h3>
</cms:if>
```

You might be surprised to see the Welcome message appearing although the sex is clearly not 'M'.<br/>
This is because when || and && are used together, the && is given precedence over ||. Implicitly the condition that is being evaluated by **if** above is

```
<cms:if (age lt '18') || ((age gt '40') && (sex == 'M'))>
```

where being lesser than 18 is one condition and the **combined** result of being over 40 and also being a male is the second condition. The two conditions are separated by an || which evaluates to true even if one of the two conditions is true. It should be clear now that in the example above since the age was lesser than 18, the entire condition was evaluated as being true and the **If** block executed.

The right way of using both || and && together is to **always explicitly indicate the precedence**. Thus -

```
<cms:if ((age lt '18') || (age gt '40')) && (sex == 'M')>
```

will make the code behave the way we had originally intended. The Welcome message will dissapear and will only reappear when we set 'sex' as 'M'. Notice how we enclosed the first two conditions that were supposed to be evaluated together within an extra pair of paranthesis.

<p class="error">Always explicitly indicate the evaluation precedence of the conditions by using brackets when you use && and || together.</p>

## Parameters

See discussion above.

## Variables

This tag does not set any variables of its own.

## Related Tags

*   [else](../else.html)
