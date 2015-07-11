---
title: Photo Gallery
category: concept
template: default.html
---

# Photo Gallery

One of the most demanded features in Couch has been the image gallery.

In all fairness, it has always been possible to create functional image galleries using the native features of Couch.

The workflow could go something like this -<br/>
**1\.** Create a clonable template<br/>
**2\.** Define (at least) two editable regions - one of type 'image' for the main image and another of type 'thumbnail' that is associated with the main image.<br/>
**3\.** Add images to the gallery by creating a cloned page for each image. The folders may be used to create individual albums.<br/>
**4\.** Finally display the gallery on the website by using the cms:pages tag.

The method outlined above works but the step number 3 of manually creating a page each for every gallery item is what quickly proves to be tedious. This is especially so for albums those are required to be created by adding a large number of images at the same time.

To take the tedium out of creating such galleries, version 1.2.5 of Couch introduces the feature of automated creation of photo galleries using multiple images upload. Simply drag-n-drop a bunch of images and Couch uploads them one by one while automatically creating a cloned page for each of the uploaded image.

## How to use it

This new feature is built upon the existing functionality of Couch and requires only minimal modifications to the usual method described above in order to use it. Let us walk through all the steps leading up to the creation of a full-featured gallery. I'll point out the parts where something new is required to be done.

#### 1. Create a clonable template

The process begins, as is the norm, by creating a cloned template for the gallery. For our example, let us assume the name of our template is 'gallery.php'.<br/>
We use the regular method of declaring the template as clonable -

```
<cms:template title='Gallery' clonable='1' dynamic_folders='1'>

</cms:template>
```

Notice that we are also declaring the template as using dynamic folders because those will be used for creating albums.

Now comes the new part in this step. We add a new parameter to this declaration -

```
<cms:template title='Gallery' clonable='1' dynamic_folders='1' gallery='1'>

</cms:template>
```

By adding **gallery='1'**, we inform Couch that template will require special consideration.

#### 2. Define editable regions

As mentioned before, any template meant to be used for a gallery will require at least two editable regions - one for the main image and another for the thumbnail.

Let us add the following declarations to the code above -

```
<cms:template title='Gallery' clonable='1' dynamic_folders='1' gallery='1'>

   <cms:editable
      name="gg_image"
      label="Image"
      desc="Upload your main image here"
      width="500"
      show_preview='1'
      preview_height='200'
      type="image"
   />

   <cms:editable
      name="gg_thumb"
      assoc_field="gg_image"
      label="Image Thumbnail"
      desc="Thumbnail of image above"
      width='115'
      height='115'
      enforce_max='1'
      type="thumbnail"
   />

</cms:template>
```

As you can see, we are using the regular way to define the two editable regions.<br/>
The only new part in this step is that **the gallery module expects the two regions to have specific names**.<br/>
It is mandatory to name the region of type 'image' as **gg\_image** while the region of type 'thumbnail' is required to be named as **gg\_thumb**.<br/>
This is necessary because later on while automatically creating the cloned pages, Couch will populate these regions without requiring any user intervention. To do so, it will need to know the names of the regions.

You can tweak all other parameters of the two regions to your fill but the names cannot be changed if Couch is to recognize them.<br/>
You can, of course, also create as many other editable regions as you wish (e.g. a region for 'description' is a usual addition).

<p class="success">The thumbnail region **gg\_thumb** is used by Couch for displaying the image thumbnails in the admin panel as such it is not advised to modify the dimensions of it. You can always create another associated thumbnail region if you wish to use thumbnails of other dimensions.</p>

To persist the changes made to the template, make the mandatory visit to the template using your browser while being logged on as the super-admin.<br/>
This will add the template to Couch admin. We are now all set to begin adding images to our gallery.

#### 3. Creating cloned pages

This is the step where everything is now very different.<br/>
The first thing that you'll notice is that there is no 'add new' button in the admin-panel of this template (this is the 'gallery' parameter in action).<br/>
Instead you have an 'Upload' button

![](../../assets/img/contents/photo-gallery-1.gif)

<p class="notice">Also notice the 'Default page' that Couch creates for all cloned templates. For a gallery, this default page is really not needed and you should 'unpublish' it. It gets shown to only the super-admin. The site-owner will never see it.</p>

Clicking on this 'Upload' button will bring up the following window

![](../../assets/img/contents/photo-gallery-2.gif)

This is the new mass uploader that ships with Couch.<br/>
Click on the 'Add images' button at the bottom of it and select multiple images from your local machine (you can also drag-n-drop if your browser supports the facility).<br/>
Once all the images are queued up, click 'Start upload'

![](../../assets/img/contents/photo-gallery-3.gif)

You'll see Couch uploading and processing the images one after another.

<p class="success">Errors that might occur in the process will be reported as they are encountered - one common error is trying to upload an image that is too large. For now only a **maximum size of 2MB** is supported.</p>

<p class="error">
    You might receive errors at this point stating something like 'Access not allowed' or 'Failed to open stream' etc. This can happen if your server is running under **SAFE MODE restrictions** (this mode has been deprecated but you still might run into some paranoid hosts insisting on using it).<br/>
    To by-pass these restrictions you'll have to lend a helping hand to PHP by creating some folders and setting their permissions manually.<br/>
    This thread of our forum discusses the procedure in detail - [**http&#58;//www.couchcms.com/forum/viewtopic.php?f=4&t=6912&p=8703**](http://www.couchcms.com/forum/viewtopic.php?f=4&t=6912&p=8703).
</p>

Once all the images are successfully uploaded, the admin-panel you were on will refresh and there you have it -

![](../../assets/img/contents/photo-gallery-4.gif)

Couch has not only uploaded en-masse all the images to the server but has also automatically created a cloned page each for every successfully uploaded image.

Click on any thumbnail and you'll reach the familiar 'Edit' panel common to all templates.

![](../../assets/img/contents/photo-gallery-5.gif)

You'll notice that Couch has used the uploaded image's name as the page's title and name fields. If that does not suit you, you can always edit them.

#### 4. Displaying the gallery

With the pages already created, it is time to display them on your site.<br/>
This step is no different to what is used with the regular templates.<br/>
The markup, as always, will be yours and you can use the cms:pages tag to output the list of the images in your gallery the regular way.<br/>
Example -

```
<cms:pages masterpage="gallery.php" include_subfolders='0' >
   <a href="<cms:show gg_image />">
      <img src="<cms:show gg_thumb />" title="<cms:show k_page_title />" />
   </a>
</cms:pages>
```

## New variables

Apart from all the [usual variables pertaining to a page](../variables-in-views.html) made available by Couch, the following new variables are also made available for gallery pages -

*   k\_file\_name
*   k\_file\_ext
*   k\_file\_size

As the names of the variables suggest, they show meta data about the uploaded image.

For gallery pages, the [**cms:pages**](../../tags-reference/pages.html) tag also recognizes the following new values for the **orderby** parameter. These can be helpful in ordering the listing of images according to the meta data of the images.

*   file\_name
*   file\_ext
*   file\_size

## EXIF data

EXIF (Exchangeable image file) format is a specification for image files used by digital cameras to add meta-data to images.<br/>
Couch can extract this data from uploaded images and make it available as simple variables.

<p class="notice">
    As this addition is more likely to be useful to only professional photographers, it is turned off by default. To turn this feature on, please set the following directive in 'config.php' to 1<br/>
    <br/>
    ```
// 25
// Set the following to '1' if you wish to extract EXIF data from images uploaded to Gallery
define( 'K_EXTRACT_EXIF_DATA', 0 );
    ```
</p>

Following is the complete list of variables that may become available (depending on their presence in the image) -

*   exif\_aperture
*   exif\_color
*   exif\_componentconfig
*   exif\_jpegquality
*   exif\_exifcomment
*   exif\_contrast
*   exif\_copyright
*   exif\_customrendered
*   exif\_datetime
*   exif\_datetimedigitized
*   exif\_zoomratio
*   exif\_distancerange
*   exif\_height
*   exif\_width
*   exif\_exifversion
*   exif\_exposurebias
*   exif\_exposuremode
*   exif\_exposure
*   exif\_exposuretime
*   exif\_fnumber
*   exif\_flashused
*   exif\_flashpixversion
*   exif\_focallength
*   exif\_focusdistance
*   exif\_gaincontrol
*   exif\_isoequiv
*   exif\_make
*   exif\_meteringmode
*   exif\_model
*   exif\_orientation
*   exif\_jpegquality
*   exif\_resolution
*   exif\_resolutionunit
*   exif\_saturation
*   exif\_screencapturetype
*   exif\_sharpness
*   exif\_software
*   exif\_whitebalance
*   exif\_ycbcrpositioning
*   exif\_xresolution
*   exif\_yresolution

These variables, however, are not available for direct use.<br/>
To get to them, you need to make use of a new tag named 'exif'. The usage is simply -

```
<cms:pages masterpage="gallery.php" include_subfolders='0' >
   <a href="<cms:show gg_image />"><img src="<cms:show gg_thumb />" title="<cms:show k_page_title />" /></a>
   <cms:exif>
      Dimensions: <cms:show exif_resolution /><br />
      Taken on: <cms:show exif_datetime /><br />
      Camera make: <cms:show exif_make /><br />
      Camera model: <cms:show exif_model /><br />
      Shutter speed: <cms:show exif_exposuretime /><br />
      Aperture: <cms:show exif_aperture /><br />
      Focal length: <cms:show exif_focallength /><br />
   </cms:exif>
</cms:pages>
```

As can be seen, the 'exif' tag makes available all the Exif data within its opening and closing tags.

<p class="error">
    **A note of caution here:**<br/>
    <br/>
    The GD library used on the server side (by Couch as well as most other scripts) for image manipulation has the property of discarding away the Exif data for good from the image being manipulated (resized for example).<br/>
    <br/>
    As such, once the you turn on the setting to capture Exif data from images, Couch will **NOT resize** the uploaded images at all.<br/>
    This is to keep the exif data within the image intact.<br/>
    Please remember that with this setting on, you'll have to upload the images already resized on your local machine using any Exif savvy program (like IrfanView).<br/>
    <br/>
    If this is not possible for the client, a workaround could be to define a new thumbnail associated with the main image that has the proper dimension. The original image will be left untouched however the thumbnail can now be used instead of the original image itself.
</p>

## A working sample Gallery

To jump-start your development, here is a complete sample gallery template that can be used as a guide (or even 'as-is' if you are in a hurry - the markup is neutral enough to go with almost any design).

[**Download the template here**](http://www.couchcms.com/docs/code/gallery.zip).<br/>
[**Download the Slimbox version here**](http://www.couchcms.com/docs/code/gallery_using_slimbox.zip) (this is another version of the same template using JavaScript (Slimbox) to display the images).

![](../../assets/img/contents/photo-gallery-6.jpg)

![](../../assets/img/contents/photo-gallery-7.jpg)

## Summary

To sum up, to use the new gallery feature you are only required making the following changes -<br/>
**1\.** Declare your clonable template with the **gallery** attribute.<br/>
**2\.** Declare an editable region of type 'image' with the name **gg\_image** and an associated editable region of type thumbnail with the name **gg\_thumb**.
