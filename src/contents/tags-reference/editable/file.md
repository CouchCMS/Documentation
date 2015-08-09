---
title: type = 'file'
category: tag
subCategory: editable
template: default.html
---

# type = 'file'

Editable region of type **file** is primarily used to allow the user to upload a file from his local computer onto the server. The user can also browse and select any of the previously uploaded files.<br/>
Once a file has been selected, this editable region then holds a fully qualified URL of the uploaded file.

<p class="notice">
    **NOTE:** By default, all uploaded files will be saved within the _**couch/uploads/file**_ folder (or any subfolders created by the user within it). You can set the location to any other folder by uncommenting entry number 12 (*K\_UPLOAD\_DIR*) in _config.php_ and changing it to the desired location.<br/>
    <br/>
    ```
// 12.
// Upload folder if not using the default upload folder within 'couch'.
// Should be relative to your site (don't forget to set write permissions on it).
define( 'K_UPLOAD_DIR', 'myuploads' );
    ```
</p>

An editable region of _file_ type can be defined this way -

```
<cms:editable
  name='my_document'
  label='Downloadable File'
  desc='Upload the file here'
  type='file'
/>
```

The code above will result in -

![](../../../../assets/img/contents/editable-file.gif)

Clicking the 'Browse Server' button will bring up a window which can be used to browse previously uploaded files on the server or upload a new file from the local machine.

The contents of this region can be accessed, as with all other editable regions, by using the variable named after it -

```
<a href="<cms:show my_document />" >Download file</a>
```

## Parameters

Apart from the parameters common to all the other types of editable regions, this type does not accept any other parameter.

## Related Tags

*   [editable](../../../editable.html)
*   [editable (text)](../../text.html)
*   [editable (password)](../../password.html)
*   [editable (textarea)](../../textarea.html)
*   [editable (richtext)](../../richtext.html)
*   [editable (image)](../../image.html)
*   [editable (thumbnail)](../../thumbnail.html)
*   [editable (radio)](../../radio.html)
*   [editable (checkbox)](../../checkbox.html)
*   [editable (dropdown)](../../dropdown.html)
*   [editable (group)](../../group.html)
*   [editable (message)](../../message.html)
*   [editable (nicedit)](../../nicedit.html)
*   [editable (relation)](../../relation.html)
