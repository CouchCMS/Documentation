---
title: Google Maps
category: concept
template: default.html
---

# Google Maps

It is common now to find websites integrating with Google Maps. The 'Contact Us' page usually displays one although maps are often also found associated with individual items being represented by pages e.g. properties, members etc.

Couch abstracts away the complexity of creating a Google map behind a simple tag - the [_**google\_map**_](../../tags-reference/google_map.html) tag.

You'll need a key from Google to use its API. If you don't have one, get one free from the site mentioned below and set it at the following location _config.php_ -

```
// 16.
// Google Maps API Key.
// You'll have to get one for your site from 'http://code.google.com/apis/maps/'
// if your site makes use of Google maps.
define( 'K_GOOGLE_KEY', 'ABQIAAAAD7z_FToS5NSqosnG9No1ABQYPrehWcZJH1ec0SZqipYFbK_nfRT1ryCGKzl5KGpFG3y5jyPe_uClVg' );
```

The following snippet given will quickly create a map showing the given address -

```
<cms:google_map
    name='my_map'
    address='1600 Amphitheatre Parkway, Mountain View, CA'
/>
```

You can use the latitude and the longitude of a place instead of its address -

```
<cms:google_map
    name='my_map'
    latitude='37.423021'
    longitude='-122.083739'
/>
```

For a list of all the parameters supported by the _google\_map_ tag, please see the [**Tags reference - google\_map**](../../tags-reference/google_map.html).
