---
title: dump
category: tag
template: default.html
---

# dump

The **dump** tag is used to output all variables (system or otherwise) that are present in the immediate context of the location it is invoked from.

As an example, the following snippet is using the **pages** tag nested within the **folders** tag to create a list of all folders and a list of pages that are present within each folder -

```
<cms:folders masterpage='news.php' hierarchical='1'>
    <H3><cms:show k_folder_title /></H3>
    <cms:if k_folder_pagecount >
        <UL>
        <cms:pages masterpage="news.php" folder=k_folder_name include_subfolders='0'>
            <LI><a href="<cms:show k_page_link />"><cms:show k_page_title /></a></LI>
        </cms:pages>
        </UL>
    </cms:if>
</cms:folders>
```

If we place three dump tags at the following locations -

```
<cms:dump />
<cms:folders masterpage='news.php' hierarchical='1'>
    <H3><cms:show k_folder_title /></H3>
    <cms:dump />
    <cms:if k_folder_pagecount >
        <UL>
        <cms:pages masterpage="news.php" folder=k_folder_name include_subfolders='0'>
            <cms:dump />
            <LI><a href="<cms:show k_page_link />"><cms:show k_page_title /></a></LI>
        </cms:pages>
        </UL>
    </cms:if>
</cms:folders>
```

\- the first **dump** tag will output global variables (said to be in the _root context_) set for the executing page by Couch, the second **dump** tag will output variables set for each iteration by the **folders** tag while the third tag will output variables that are set by the **pages** tag.

Compare this with the **dump\_all** tag that will output variables belonging to all the contexts that are a part of the hierarchy leading to the current location. Thus for the same example using **dump\_all**. instead of **dump**, the first tag would have output global variables belonging to the root context, the second tag would have output variables of the root context followed by the variables set for the current iteration by the **folders** tag and finally the third tag would have output the global variables, the variables set by folders followed by the variables set for the iteration by the **pages** tag.

Since, unless specified otherwise, when we use a variable anywhere (e.g. with **show** tag), Couch looks up through the tags hierarchy starting from the tag within the context of which the variable was used, **dump\_all** is a very useful tag to visually confirm if the variable is actually set and available anywhere in the hierarachy.

The **dump** tag is very useful to quickly see which variables (along with their current values) are set by a particular tag.

## Parameters

Takes no parameters

## Variables

Is a self-closing tag and sets no variables of its own.

## Related Tags

*   [dump\_all](../dump_all.html)
