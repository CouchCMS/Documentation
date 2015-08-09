---
title: date
category: tag
template: default.html
---

# date

The **date** tag outputs a string according to the given _format_ parameter using the given _date_ parameter. If no _date_ provided, the current time is used.

```
<cms:date />
```

```
<cms:date k_page_date />
```

```
<cms:date k_page_date format='jS M, Y' />
```

## Parameters

*   date
*   format
*   gmt
*   locale
*   charset

### date

The date to be formated.<br/>
This parameter is expected to be in '_Y-m-d H:i:s_' format (e.g. 2010-05-30 21:35:54). All date related variables set by Couch tags, e.g. *k\_page\_date* etc., are in this format.

### format

The **date** tag supports two different types of format characters - locale-aware and non locale-aware.<br/>
With locale-aware characters, you can specify that the date is to formatted according to, for example, _french_ locale or _italian_ locale by setting the _locale_ parameter.<br/>
The locale-aware characters all have a % sign prefixed to them.

<p class="error">The locale-aware and the non locale-aware characters cannot be intermixed.</p>

#### Non Locale-aware format characters

<br/>

| Format character | Description | Example returned values |
| ---------------- | ----------- | ----------------------- |
| <span style="display:block; text-align:center;">_**Day**_</span> | \--- | \--- |
| _d_ | Day of the month, 2 digits with leading zeros | _01_ to _31_ |
| _D_ | A textual representation of a day, three letters | _Mon_ through _Sun_ |
| _j_ | Day of the month without leading zeros | _1_ to _31_ |
| _l_ (lowercase&nbsp;'L') | A full textual representation of the day of the week | _Sunday_ through _Saturday_ |
| _S_ | English ordinal suffix for the day of the month, 2 characters | _st_, _nd_, _rd_ or _th_. Works well with _j_ |
| _w_ | Numeric representation of the day of the week | _0_ (for Sunday) through _6_ (for Saturday) |
| _z_ | The day of the year (starting from 0) | _0_ through _365_ |
| <span style="display:block; text-align:center;">_**Week**_</span> | \--- | \--- |
| _W_ | ISO-8601 week number of year, weeks starting on Monday | Example: _42_ (the 42nd week in the year) |
| <span style="display:block; text-align:center;">_**Month**_</span> | \--- | \--- |
| _F_ | A full textual representation of a month, such as January or March | _January_ through _December_ |
| _m_ | Numeric representation of a month, with leading zeros | _01_ through _12_ |
| _M_ | A short textual representation of a month, three letters | _Jan_ through _Dec_ |
| _n_ | Numeric representation of a month, without leading zeros | _1_ through _12_ |
| _t_ | Number of days in the given month | _28_ through _31_ |
| <span style="display:block; text-align:center;">_**Year**_</span> | \--- | \--- |
| _L_ | Whether it's a leap year | _1_ if it is a leap year, _0_ otherwise. |
| _Y_ | A full numeric representation of a year, 4 digits | Examples: _1999_ or _2003_ |
| _y_ | A two digit representation of a year | Examples: _99_ or _03_ |
| <span style="display:block; text-align:center;">_**Time**_</span> | \--- | \--- |
| _a_ | Lowercase Ante meridiem and Post meridiem | _am_ or _pm_ |
| _A_ | Uppercase Ante meridiem and Post meridiem | _AM_ or _PM_ |
| _B_ | Swatch Internet time | _000_ through _999_ |
| _g_ | 12-hour format of an hour without leading zeros | _1_ through _12_ |
| _G_ | 24-hour format of an hour without leading zeros | _0_ through _23_ |
| _h_ | 12-hour format of an hour with leading zeros | _01_ through _12_ |
| _H_ | 24-hour format of an hour with leading zeros | _00_ through _23_ |
| _i_ | Minutes with leading zeros | _00_ to _59_ |
| _s_ | Seconds, with leading zeros | _00_ through _59_ |
| <span style="display:block; text-align:center;">_**Timezone**_</span> | \--- | \--- |
| _I_ (capital&nbsp;'i') | Whether or not the date is in daylight saving time | _1_ if Daylight Saving Time, _0_ otherwise. |
| _O_ | Difference to Greenwich time (GMT) in hours | Example: _+0200_ |
| _T_ | Timezone abbreviation | Examples: _EST_, _MDT_&hellip; |
| _Z_ | Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. | _-43200_ through _50400_ |
| <span style="display:block; text-align:center;">_**Full&nbsp;Date/Time**_</span> | \--- | \--- |
| _r_ | [» RFC 2822](http://www.faqs.org/rfcs/rfc2822) formatted date | Example: _Thu, 21 Dec 2000 16:01:07 +0200_ |
| _U_ | Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT) | |

<br/>

#### Locale-aware format characters

<br/>

| Format Character | Description | Example returned values |
| ---------------- | ----------- | ----------------------- |
| <span style="display:block; text-align:center;">_**Day**_</span> | \--- | \--- |
| _%a_ | An abbreviated textual representation of the day | _Sun_ through _Sat_ |
| _%A_ | A full textual representation of the day | _Sunday_ through _Saturday_ |
| _%d_ | Two-digit day of the month (with leading zeros) | _01_ to _31_ |
| _%e_ | Day of the month, with a space preceding single digits. Not implemented as described on Windows. See below for more information. | _1_ to _31_ |
| _%j_ | Day of the year, 3 digits with leading zeros | _001_ to _366_ |
| _%u_ | ISO-8601 numeric representation of the day of the week | _1_ (for Monday) though _7_ (for Sunday) |
| _%w_ | Numeric representation of the day of the week | _0_ (for Sunday) through _6_ (for Saturday) |
| <span style="display:block; text-align:center;">_**Week**_</span> | \--- | \--- |
| _%U_ | Week number of the given year, starting with the first Sunday as the first week | _13_ (for the 13th full week of the year) |
| _%V_ | ISO-8601:1988 week number of the given year, starting with the first week of the year with at least 4 weekdays, with Monday being the start of the week | _01_ through _53_ (where 53 accounts for an overlapping week) |
| _%W_ | A numeric representation of the week of the year, starting with the first Monday as the first week | _46_ (for the 46th week of the year beginning with a Monday) |
| <span style="display:block; text-align:center;">_**Month**_</span> | \--- | \--- |
| _%b_ | Abbreviated month name, based on the locale | _Jan_ through _Dec_ |
| _%B_ | Full month name, based on the locale | _January_ through _December_ |
| _%h_ | Abbreviated month name, based on the locale (an alias of %b) | _Jan_ through _Dec_ |
| _%m_ | Two digit representation of the month | _01_ (for January) through _12_ (for December) |
| <span style="display:block; text-align:center;">_**Year**_</span> | \--- | \--- |
| _%C_ | Two digit representation of the century (year divided by 100, truncated to an integer) | _19_ for the 20th Century |
| _%g_ | Two digit representation of the year going by ISO-8601:1988 standards (see %V) | Example: _09_ for the week of January 6, 2009 |
| _%G_ | The full four-digit version of %g | Example: _2008_ for the week of January 3, 2009 |
| _%y_ | Two digit representation of the year | Example: _09_ for 2009, _79_ for 1979 |
| _%Y_ | Four digit representation for the year | Example: _2038_ |
| <span style="display:block; text-align:center;">_**Time**_</span> | \--- | \--- |
| _%H_ | Two digit representation of the hour in 24-hour format | _00_ through _23_ |
| _%I_ | Two digit representation of the hour in 12-hour format | _01_ through _12_ |
| _%l_ (lower-case&nbsp;'L') | Hour in 12-hour format, with a space preceeding single digits | _1_ through _12_ |
| _%M_ | Two digit representation of the minute | _00_ through _59_ |
| _%p_ | UPPER-CASE 'AM' or 'PM' based on the given time | Example: _AM_ for 00:31, _PM_ for 22:23 |
| _%P_ | lower-case 'am' or 'pm' based on the given time | Example: _am_ for 00:31, _pm_ for 22:23 |
| _%r_ | Same as "%I:%M:%S %p" | Example: _09:34:17 PM_ for 21:34:17 |
| _%R_ | Same as "%H:%M" | Example: _00:35_ for 12:35 AM, _16:44_ for 4:44 PM |
| _%S_ | Two digit representation of the second | _00_ through _59_ |
| _%T_ | Same as "%H:%M:%S" | Example: _21:34:17_ for 09:34:17 PM |
| _%X_ | Preferred time representation based on locale, without the date | Example: _03:59:16_ or _15:59:16_ |
| _%z_ | Either the time zone offset from UTC or the abbreviation (depends on operating system) | Example: _-0500_ or _EST_ for Eastern Time |
| _%Z_ | The time zone offset/abbreviation option NOT given by %z (depends on operating system) | Example: _-0500_ or _EST_ for Eastern Time |
| <span style="display:block; text-align:center;">_**Time&nbsp;and&nbsp;Date&nbsp;Stamps**_</span> | \--- | \--- |
| _%c_ | Preferred date and time stamp based on local | Example: _Tue Feb 5 00:45:10 2009_ for February 4, 2009 at 12:45:10 AM |
| _%D_ | Same as "%m/%d/%y" | Example: _02/05/09_ for February 5, 2009 |
| _%F_ | Same as "%Y-%m-%d" (commonly used in database datestamps) | Example: _2009-02-05_ for February 5, 2009 |
| _%s_ | Unix Epoch Time timestamp | Example: _305815200_ for September 10, 1979 08:40:00 AM |
| _%x_ | Preferred date representation based on locale, without the time | Example: _02/05/09_ for February 5, 2009 |
| <span style="display:block; text-align:center;">_**Miscellaneous**_</span> | \--- | \--- |
| _%n_ | A newline character ("\n") | \--- |
| _%t_ | A Tab character ("\t") | \--- |
| _%%_ | A literal percentage character ("%") | \--- |

<br/>

### gmt

By setting this parameter to '1', you can get the GMT equivalent of the date provided.

### locale

If you use the locale-aware format characters mentioned above, this parameter can be set to the locale desired for formatting the provided date.

```
<cms:date k_page_date format='%B %d, %Y' locale='french' />
```

```
<cms:date k_page_date format='%B %d, %Y' locale='italian' />
```

<p class="error">This feature depends entirely on the indicated locale being available at your web server. If the locale is not available, the default 'english' locale is used.</p>

### charset

Some locales do not provide their output in UTF8 character set. This causes strange ?? characters to appear in the output.<br/>
The **date** tag can help converting the output to UTF8 if you can provide it with information about the charset used by the locale.

For example -

```
<cms:date k_page_date format='%B %d, %Y' locale='greek' charset='ISO-8859-7' />
```

```
<cms:date k_page_date format='%B %d, %Y' locale='russian' charset='ISO-8859-5' />
```

The following is a rough list of the charset used by different languages -

**ISO-8859-1 - Latin 1**<br/>
Western Europe and Americas: Afrikaans, Basque, Catalan, Danish, Dutch, English, Faeroese, Finnish, French, Galician, German, Icelandic, Irish, Italian, Norwegian, Portuguese, Spanish and Swedish.

**ISO-8859-2 - Latin 2**<br/>
Latin-written Slavic and Central European languages: Czech, German, Hungarian, Polish, Romanian, Croatian, Slovak, Slovene.

**ISO-8859-3 - Latin 3**<br/>
Esperanto, Galician, Maltese, and Turkish.

**ISO-8859-4 - Latin 4**<br/>
Scandinavia/Baltic (mostly covered by 8859-1 also): Estonian, Latvian, and Lithuanian. It is an incomplete predecessor of Latin 6\.

**ISO-8859-5 - Cyrillic**<br/>
Bulgarian, Byelorussian, Macedonian, Russian, Serbian and Ukrainian.

**ISO-8859-6 - Arabic**<br/>
Non-accented Arabic.

**ISO-8859-7 - Modern Greek**<br/>
Greek.

**ISO-8859-8 - Hebrew**<br/>
Non-accented Hebrew.

**ISO-8859-9 - Latin 5**<br/>
Same as 8859-1 except for Turkish instead of Icelandic

**ISO-8859-10 - Latin 6**<br/>
Latin6, for Lappish/Nordic/Eskimo languages: Adds the last Inuit (Greenlandic) and Sami (Lappish) letters that were missing in Latin 4 to cover the entire Nordic area.

## Variables

This tag is self-closing and does not set any variables of its own.

## Related Tags

*   [number\_format](../number_format.html)
