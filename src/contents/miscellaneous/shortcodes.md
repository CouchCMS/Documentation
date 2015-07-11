---
title: Shortcodes
category: miscellaneous
template: default.html
---

# Shortcodes

Shortcodes are little pieces of text that look like these

```
[adsense]
[youtube video="1aBSPn2P9bg" /]
[mailto]johndoe@nowhere.com[/mailto]
```

These codes can be inserted by the end user within the content that he enters into any editable region e.g. into the richtext box or the textarea.

When a webpage containing this content gets output to the browser, Couch **expands** these shortcodes to replace them with whatever markup has been configured by the developer/designer who created these shortcodes. This could be, for example, the _adsense code_, code that creates a _Google map_, the embed code for _Youtube video_ or simply a &lt;DIV&gt; element with a particular background color that encloses the content entered by the user. In a way, shortcodes function as **macros**.

Shortcodes provide a handy way for the designer to grant his client (the end user) the ability to inject arbitrary code anywhere within his content. This couldn't have otherwise been possible or would have been too difficult for the user.

To summarize, a shortcode is a little label enclosed by square brackets. This is created by the designer/developer who can associate any arbitrary length of HTML code to it. The shortcode is meant to be used by the client of the designer/developer who can insert that label anywhere he desires within his content. When the web page gets displayed, Couch simply replaces the shortcode label with the HTML code that is associated with it.

Simple? Let's move on to see how to create one.

## How to create a shortcode

Creating shortcodes requires three distinct steps.

#### 1. Find a place where Couch can get your PHP code from

The process of defining a shortcode label and associating HTML code to it (as we'll see in the next step) will require writing some PHP code. But where do we place the code so that Couch runtime could execute it for us?

With version 1.2, Couch has begun opening up its architecture to allow extending it. As a part of this initiative, Couch runtime now searches for a PHP file named **kfunctions.php** within the website managed by it (i.e. the main website folder - **not** the couch installation folder). If the file is found, Couch includes it within its execution flow.

This _kfunctions.php_ file provides an entry into Couch for your custom code.

<p class="error">**CAUTION:** Please remember that since your code gets included into Couch core runtime, any PHP error within it might cause Couch not to execute at all!</p>

So the first step in creating a shortcode is to (if not already present) create a PHP script file named _kfunctions.php_ and place it within your client's site along with the other Couch managed templates.

#### 2. Define the shortcode and associate it with the markup it will be replaced with

This is where the real action lies.<br/>
To explain this step, we'll create an ultra-simple shortcode named **\[hello\]** which when inserted into some content gets expanded to

```
<h1>Hello from a shortcode!</h1>
```

Open up the _kfunctions.php_ file in your favorite editor and after the required **&lt;?php** add the following code

```
$FUNCS->register_shortcode( 'hello', 'hello_handler' );

function hello_handler( $params, $content=null ){
    return '<h1>Hello from a shortcode!</h1>';
}
```

The code above has two parts. First where we register our shortcode with Couch:

```
$FUNCS->register_shortcode( 'hello', 'hello_handler' );
```

By using the code above we are letting Couch know that it will now have to keep a look out for a shortcode named _hello_ and that anywhere it encounters this shortcode, Couch should invoke a function named _hello\_handler_.

```
function hello_handler( $params, $content=null ){
    return '<h1>Hello from a shortcode!</h1>';
}
```

The code above is the _hello\_handler_ function that we instructed Couch to execute anytime it finds our shortcode named _hello_.

Couch upon encountering a shortcode, executes the handler function associated with it and then **replaces the shortcode with the return value** of that function. Thus, in our shortcode the _\[hello\]_ anywhere in the content will be replaced by the return value of _hello\_handler_ function and that is _&lt;h1&gt;Hello from a shortcode!&lt;/h1&gt;_.

This is a trivial example but it illustrates clearly the logic behind shortcodes. You can make the handler function return any HTML code you wish.<br/>
At the end of this page you'll find some serious real world examples of shortcodes that you can use in your code.

#### 3. Finally, make Couch search for the shortcode in any content and replace it with the associated markup

Couch, unlike most other CMSes, can have any number of editable regions. Therefore, it would have been too taxing to make it keep a watch for the registered shortcodes in all of them automatically. For Couch to search and replace any registered shortcode present within an editable region, you'll have to explicitly instruct it to do so.

Suppose a template has an editable region of richtext type named _my\_content_.<br/>
This is how you'd probably be displaying the value contained within _my\_content_ in your template:

```
<cms:show my_content />
```

If the end user is supposed to be inserting shortcodes within this editable region, to effect the final step - that is to actually expand the shortcodes - modify the code above as follows:

```
<cms:do_shortcodes><cms:show my_content /></cms:do_shortcodes>
```

In the code above we are wrapping the **show** tag with the newly introduced **do\_shortcodes** tag. The **do\_shortcodes** tag actually does all the heavy lifting associated with shortcodes. It parses out the content enclosed within it, searches out all registered shortcodes and replaces them with their associated values by executing their handler functions.

And that's it. Now if the user places the following shortcode anywhere within the _my\_content_ editable region:

```
[hello]
```

it gets expanded to:

```
<h1>Hello from a shortcode!</h1>
```

## Creating shortcodes with enclosed contents

The shortcode we created above was a self-enclosing one. We can also create shortcodes that consist of the opening/closing tag pair. Such tags then can be used to enclose contents e.g.

```
[hello]What's up?[/hello]
```

Any enclosed content is made available by Couch to the handler function through the second parameter it passes to it (named _$content_ in examples above).<br/>
The handler function could then act on the passed content, modify it in any way and then return it back. Thus the enclosed content can be made to change the output of the shortcode. The complete block of the shortcode that finally gets replaced extends from its opening tag to the closing tag.

As examples of shortcodes that act on enclosed content, take at look at the following shortcodes that mimic BBcode:

```
$FUNCS->register_shortcode( 'b', 'bold_handler' );
$FUNCS->register_shortcode( 'i', 'italic_handler' );
$FUNCS->register_shortcode( 'u', 'underline_handler' );

function bold_handler( $params, $content=null ){
    if( is_null($content) ) return '';

    return '<strong>' . $content . '</strong>';
}

function italic_handler( $params, $content=null ){
    if( is_null($content) ) return '';

    return '<em>' . $content . '</em>';
}

function underline_handler( $params, $content=null ){
    if( is_null($content) ) return '';

    return '<span style="text-decoration:underline">' . $content . '</span>';
}
```

If the end user was to input something like this:

```
Hello [b]World[/b]
```

the output would be:

```
Hello <strong>World</strong>
```

Input:

```
[i]Hello[/i] [b]World[/b]
```

Output:

```
<em>Hello</em> <strong>World</strong>
```

Input:

```
[u][i]hello[/i] [b]world[/b][/u]
```

Output:

```
<span style="text-decoration:underline"><em>hello</em> <strong>world</strong></span>
```

<p class="notice">The last input above shows that **shortcodes can be nested**. Like Couch tags, the shortcodes get resolved inside out i.e. the most deeply nested shortcode gets expanded first and its output then becomes the input for the shortcode that encloses it.</p>

## Passing parameters to shortcodes

The output of a shortcode can also be customized by using **parameters**.

The parameters are entered like this:

```
[some_shortcode foo="hello" bar='world' baz=hi ]
```

In the code above _foo_, _bar_ and _baz_ are the names of the parameters and _hello_, _world_ and _hi_ are their respective values.

Both the self-closing as well as the shortcodes with enclosed contents can have parameters. A parameter's value may be enclosed using double-quotes or single-quotes or may be without any quotes at all (if there are no spaces in the value).

The name of a parameter can be omitted but then you need to enter the parameters in the strict order that its handler function expects.<br/>
e.g. the following shortcode is exactly the same as above:

    [some_shortcode "hello" 'world' hi ]

<p class="error">If there are multiple parameters, skipping the names makes the shortcode difficult to read hence do this only if there are few, say only a single, parameters.</p>

#### Handling the parameters

Couch delivers all the parameters that are provided to a shortcode to the relevant handler function as its first parameter (the one named _$params_ in all the examples above) in the form of an array.

Instead of dealing directly with the raw array, a helper function provided by Couch - _$FUNCS-\>get\_named\_vars()_ - should be used.<br/>
An example of how the parameters should ideally be handled is as follows:

```
$FUNCS->register_shortcode( 'googlemap', 'googlemap_handler' );

function googlemap_handler( $params, $content=null ){
    global $FUNCS;

    extract( $FUNCS->get_named_vars(array(
       'src' => '',
       'width' => '425',
       'height' => '350'
    ), $params) );

    return '<iframe width="'.$width.'" height="'.$height.'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'.$src.'&output=embed"></iframe>';
}
```

The code given above creates a shortcode named **\[googlemap\]** that can be used to easily insert a Google map anywhere within an editable region's contents.

Notice how by using _$FUNCS-\>get\_named\_vars()_ we are explicitly specifying the parameters our shortcode expects. Also notice how we provide default values for some of the parameters, which effectively makes them optional parameters.

The PHP _extract()_ function creates local variables for us with the same names as that of the parameters we specified. This makes it very easy to use the parameters in the function's logic - usually for constructing the return value. Notice in the code above how PHP variables _$width_, _$height_ and _$src_ become available for our use.

The shortcode described above can be used by the end user in any of the following ways:

```
[googlemap src="http://maps.google.com/?ll=23.250652,77.402072&spn=0.019912,0.038581&z=15"]
[googlemap src="http://maps.google.com/?ll=23.250652,77.402072&spn=0.019912,0.038581&z=15" width='600']
[googlemap src="http://maps.google.com/?ll=23.250652,77.402072&spn=0.019912,0.038581&z=15" width='600' height='480']
```

<p class="success">If you are wondering where that URL given as _src_ came from, you can get it from http&#58;//maps.google.com/ by navigating to the desired geographical location and then clicking the 'link' button available at the top.</p>

That wraps up all that is there for you to know about shortcodes in Couch.<br/>
We end this section by providing some very useful (and real world) examples of shortcodes that you can use as guides for your own shortcodes or use them as-is in your projects.

## Ready to use examples of shortcodes

Following is a sample _kfunctions.php_ file, defining some useful shortcodes, which you can use directly within your projects:<br/>
\[[**Download kfunctions.php**](http://www.couchcms.com/docs/code/kfunctions.zip)\]

```
<?php

   // 1.
   // Adsense shortcode
   // Usage: [adsense]
   $FUNCS->register_shortcode( 'adsense', 'adsense_handler' );
   function adsense_handler( $params, $content=null ){
      return '<script type="text/javascript"><!--
         google_ad_client = "pub-XXXXXXXXXXXXXXXX"; /* Put your own value here */
         google_ad_slot = "XXXXXXXXXX"; /* Put your own value here */
         google_ad_width = 468;
         google_ad_height = 60;
         //-->
      </script>
      <script type="text/javascript"
         src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
      </script>';
   }

   // 2.
   // IFrame shortcode
   // Usage: [iframe src="http://www.somesite.com/" width="100" height="100" scrolling="yes" frameborder="1" marginheight="2"]
   $FUNCS->register_shortcode( 'iframe', 'iframe_handler' );
   function iframe_handler( $params, $content=null ){
      global $FUNCS;

      extract( $FUNCS->get_named_vars(array(
         'src' => '',
         'width' => '100%',
         'height' => '500',
         'scrolling' => 'no',
         'frameborder' => '0',
         'marginheight' => '0'
      ), $params) );

      $html =<<<EOS
      <iframe src="$src" title="" width="$width" height="$height" scrolling="$scrolling" frameborder="$frameborder" marginheight="$marginheight">
         <a href="$src" target="_blank">$src</a>
      </iframe>
EOS;
       return $html;
   }

   // 3.
   // Google map shortcode
   // Usage: [googlemap src="http://maps.google.com/?ll=23.250652,77.402072&spn=0.019912,0.038581&z=15"]
   $FUNCS->register_shortcode( 'googlemap', 'googlemap_handler' );
   function googlemap_handler( $params, $content=null ){
      global $FUNCS;

      extract( $FUNCS->get_named_vars(array(
         'src' => '',
         'width' => '425',
         'height' => '350'
      ), $params) );

      return '<iframe width="'.$width.'" height="'.$height.'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'.$src.'&output=embed"></iframe>';
   }

   // 4.
   // YouTube Shortcode
   // Usage:   [youtube video="http://www.youtube.com/watch?v=5PsnxDQvQpw"]
   //          [youtube https://www.youtube.com/watch?v=1aBSPn2P9bg]
   //          [youtube 1aBSPn2P9bg]
   $FUNCS->register_shortcode( 'youtube', 'youtube_handler' );
   function youtube_handler( $params, $content=null ){
      global $FUNCS;

      extract( $FUNCS->get_named_vars(array(
         'video' => 'http://',
         'width' => '475',
         'height' => '350',
      ), $params) );

      // Video parameter is link or ID?
      if ( (substr($video, 0, 7) == 'http://') || (substr($video, 0, 8) == 'https://') ){
         /*
         Example links that can be handled:
         http://www.youtube.com/watch?v=5PsnxDQvQpw
         http://youtube.com/watch?v=5PsnxDQvQpw
         http://youtube.com/watch?gl=US&hl=en-US&v=5PsnxDQvQpw
         https://youtube.com/v/5PsnxDQvQpw&rel=1
         */
         if( !preg_match('#https?://(?:[^\.]+\.)?youtube.com.*(?:\?v=|&v=|/v/)([\w_-]+)#i', $video, $matches) ) return;
         $video = $matches[1];
      }

      // Sanitize parameters
      $video = htmlspecialchars( $video, ENT_QUOTES );
      $width = (int)$width;
      $height = (int)$height;

      // Output HTML
      $html =<<<EOS
      <iframe class="youtube-player" type="text/html" width="$width" height="$height" src="//www.youtube.com/embed/$video" frameborder="0"></iframe>
EOS;
      return $html;
   }

   // 5.
   // PayPal Donate Button shortcode
   // Usage:   [donate]
   //          [donate]Donate Now[/donate]
   //          [donate account="you@yoursite.com" onHover="Thanks" for="Title"]
   //          [donate account="you@yoursite.com" onHover="Thanks" for="Title"]Donate Now[/donate]
   $FUNCS->register_shortcode( 'donate', 'donate_handler' );
   function donate_handler( $params, $content=null ){
      global $FUNCS, $CTX;

      extract( $FUNCS->get_named_vars(array(
         'account' => 'your-paypal-email-address',
         'for' => $CTX->get( 'k_page_title' ),
         'onHover' => ''
      ), $params) );

      if( empty($content) ) $content='Make A Donation';
      return '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business='.$account.'&item_name=Donation for '.$for.'" title="'.$onHover.'">'.$content.'</a>';
   }

   // 6.
   // Obfuscate email
   // Usage: [mailto]email@mydomain.com[/mailto]
   $FUNCS->register_shortcode( 'mailto', 'mailto_handler' );
   function mailto_handler( $params, $content=null ){
      global $FUNCS;

      // Create Couch script.. we'll use the 'cloak_email' tag to encrypt email
      $html = "<cms:cloak_email email='{$content}' />";

      // Pass on the code to Couch for execution using the 'embed' function
      return $FUNCS->embed( $html, $is_code=1 );
   }

   // 7.
   // Embed SWF
   // Usage: [swf http://www.youtube.com/v/5PsnxDQvQpw&hl=en_GB&fs=1]
   //        [swf src="http://www.youtube.com/v/5PsnxDQvQpw&hl=en_GB&fs=1" width="640" height="480"]
   $FUNCS->register_shortcode( 'swf', 'swf_handler' );
   function swf_handler( $params, $content=null ){
      global $FUNCS;

      extract( $FUNCS->get_named_vars(array(
         'src' => '',
         'width' => '480',
         'height' => '385'
      ), $params) );

      // Sanitize parameters
      $src = htmlspecialchars( $src, ENT_QUOTES );
      $width = (int)$width;
      $height = (int)$height;

      $html =<<<EOS
      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="$width" height="$height">
         <param name="movie" value="$src"></param>
         <param name="allowFullScreen" value="true"></param>
         <param name="allowscriptaccess" value="always"></param>
         <param name="wmode" value="opaque"></param>
         <embed
            src="$src"
            type="application/x-shockwave-flash"
            allowscriptaccess="always"
            allowfullscreen="true"
            width="$width"
            height="$height"
            wmode="opaque">
         </embed>
      </object>
EOS;
       return $html;

   }
```
