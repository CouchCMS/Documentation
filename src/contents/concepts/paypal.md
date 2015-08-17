---
title: PayPal
category: concept
template: default.html
---

# PayPal

Couch makes it very easy for you to sell single digital products (ebooks, software, images etc) online using PayPal.

<p class="success">
    Paypal can be used to accept _single-item purchase_ payments (the ones with Buy Now buttons), _contribution_ payments (Donate buttons), _recurring_ payments (Subscribe buttons) and _multi-items purchase_ payments (shopping cart buttons).<br/>
    <br/>
    The current version of Couch supports only accepting _single-item purchase_ payments.<br/>
    <br/>
    Couch currently has no provisions for advanced features like shipping charges, volume/weight based pricing etc. These features are normally required only with physical goods and hence the caveat that this feature of Couch is suitable only for digital goods that can simply be downloaded. However, for such physical goods that do not require these advanced features, there is no reason why Couch's method cannot be used.
</p>

### AN OVERVIEW OF PAYPAL IPN

To understand how Couch makes the process easy, let us first review how PayPal is normally integrated into a website selling several digital products.

*   The process starts by placing a specially coded 'Buy Now' button for each item on the website. The code of each button has to be given data about the item associated with it i.e. the product's name, id, price etc.
*   Clicking on a button takes the visitor to PayPal's website where, after adjusting the number of units he is buying, he makes the payment.
*   PayPal immediately intimates the seller about the payment using IPN (Instant Payment Notification). IPN contains all the relevant data about the transaction, i.e. the item that was paid for, the number of units bought, the payment amount, the buyer's email etc.<br/>
    To receive PayPal's IPN, the seller needs to place a specially coded script on his website that can decipher the incoming IPN and take necessary actions. The URL (address) of this script has to be provided beforehand to PayPal (normally this is placed in the button code mentioned in the first step above).
*   Once the script receives the IPN, it is supposed to first of all verify that the IPN is arriving genuinely from PayPal and has not been spoofed by someone. Once this is verified, the script then goes on to validate the details of the transaction being reported - if the correct amount has been paid for the item sold, the amount has been deposited in the right account etc.
*   Once everything checks out fine, it is now that the product is finally delivered to the buyer. This could be done by using the email.

### HOW COUCH INTEGRATES WITH PAYPAL

As should be evident from the discussion above, the seemingly simple procedure of delivering a digital product to a buyer upon payment requires quite a bit of work. Specifically, out of the steps outlined above, placing the appropriately coded button and (more extensively) handling the incoming IPN require custom coding.<br/>
Couch takes away the complexity from both the steps by making it as simple as placing a Couch tag for each in your template.

In the following paragraphs we'll discuss how we can use Couch to do all the heavy lifting for us - but before we can do that, a little groundwork needs to be done.<br/>
First we need to inform Couch about some of our PayPal details. Open _config.php_ and set the following three values to that of yours.

```
// Set the following if you use PayPal buttons to sell products.
// 17.
// Set this to zero once you are ready to go live
define( 'K_PAYPAL_USE_SANDBOX', 1 );
// 18.
// Email address of your PayPal 'business' account selling the item
define( 'K_PAYPAL_EMAIL', 'seller_3272492192_biz@gmail.com' );
// 19.
// A three letter code for the currency you do your business in
// Some valid values are: AUD (Australian Dollar), CAD (Canadian Dollar), EUR (Euro),
// GBP (Pound Sterling), JPY (Japanese Yen) and USD (U.S. Dollar).
// Please check PayPal to find yours.
define( 'K_PAYPAL_CURRENCY', 'USD' );
```

<p class="notice">
    Usually while testing you'll be using PayPal's Sandbox.<br/>
    Setup a test environment (sandbox) at https&#58;//developer.paypal.com/. Generate and use the fictitious accounts for testing (make sure to set K\_PAYPAL\_USE\_SANDBOX to 1 and K\_PAYPAL\_EMAIL to the fictitious seller's account, in _config.php_ mentioned above).
</p>

For the next step, it is necessary to understand that each saleable item in Couch is represented by a separate cloned page.<br/>
For our example, let us say we use a template named _product.php_ for this purpose.<br/>
Make this template clonable and define in it all [**editable regions**](../editable-regions.html) that are relevant to your products (e.g. ISBN number, Author, Link to the downloadable file etc.)

Two fields are mandatory and need your special attention -

1.  **Item's name** - every saleable item needs to have a name. However, you don't have to create a separate editable region for this because Couch expects the _Title_ field (present by default in all clonable pages and accessible via *k\_page\_title* variable) to be the item's name. Hence always input the item's name as the title of the page representing the item.
2.  **Item's price** - this is an important one.<br/>
    PayPal does not allow zero value transactions, hence it is mandatory for each saleable item to have a non-zero price.<br/>
    We'll have to create an editable region to hold the item's price.<br/>
    The important point is that - Couch requires this editable region to be named *pp\_price*.

As an example, the following snippet can be used to create such a field (as a good practice, we have added the vaiidations normally required for a price field) -

```
<cms:editable name='pp_price' label='Price' desc='Amount in USD (correct upto 2 decimal points)'
    maxlength='10'
    search_type='decimal'
    validator='non_negative_decimal'
    type='text' />
```

With the groundwork behind us, the rest is easy.

#### CREATING PAYPAL BUTTON

To create the PayPal 'Buy Button' simply place the following Couch tag in your _product.php_ template -

```
<cms:paypal_button />
```

The image used as the button can be changed by setting the _image_ parameter of the tag (See [**Tags Reference - PayPal Button**](../../tags-reference/paypal_button.html)).

<p class="error">Remember: If the **paypal\_button** tag fails to find a variable named *pp\_price*, that we mentioned in the previous section, it will not display any button at all.</p>

Create a few items and visit their pages to try out the buttons.<br/>
Clicking any item's button should lead to PayPal's site with the item's name and price correctly supplied.<br/>
Clicking the return link on PayPal's site should lead one back to the item's page.

Now we only need to handle the incoming IPN notification.

#### PROCESSING PAYPAL IPN

[__*paypal\_processor*__](../../tags-reference/paypal_processor.html) is the tag that will handle IPNs for you.

To see how it works, place the following snippet somewhere at the top of your _product.php_ template -

```
<cms:paypal_processor debug='1' />
```

In the snippet above we have set the _debug_ parameter to '1'. This causes this tag to output all the steps it takes, while handling a notification, into a log file placed within your website's root.

<p class="success">
    By default the name of the log file is _log.txt_. However you can set it to any other by setting the _logfile_ parameter -<br/>
    <br/>
    ```
<cms:paypal_processor debug='1' logfile='paypal.log' />
    ```
    The snippet given above will make *paypal\_processor* use a log file named _paypal.log_.
</p>

Try clicking an item's 'Buy Now' button and upon reaching the PayPal's site, complete the transaction by logging in and buying the item. Once the transaction completes, check in your website's root for the aforesaid log file.

<p class="notice">
    If you cannot find the log file, either something is wrong and PayPal's IPN is not reaching your website or perhaps Couch was unable to create the log file on your server due to permission issues.<br/>
    Try creating a file named _log.txt_ (or whatever you have set using _logfile_ parameter) manually, make it writable and try once again.
</p>

You'll find something like this in the log file -

```
=======================[25-Jul-2010 10:08:22 PM]=======================
Received paypal IPN:

mc_gross = 13.68
protection_eligibility = Ineligible
payer_id = 38UYXKJAJW7VJ
tax = 0.00
payment_date = 22:08:18 Jul 25, 2010 PDT
payment_status = Completed
charset = windows-1252
first_name = Test
mc_fee = 0.70
notify_version = 3.0
custom =
payer_status = verified
business = seller_3272492192_biz@gmail.com
quantity = 3
verify_sign = AFcWxV21C7fd0v3bYYYRCpSSRl31AmmFHoB9fY1YRiGSb9s-pX-wTi.c
payer_email = buyer_3272492155_per@gmail.com
txn_id = 8HA76708L29474809
payment_type = instant
last_name = User
receiver_email = seller_3272492192_biz@gmail.com
payment_fee = 0.70
receiver_id = H2D8CMM9EY86G
txn_type = web_accept
item_name = My First Product
mc_currency = USD
item_number = 1
residence_country = US
test_ipn = 1
handling_amount = 0.00
transaction_subject = My First Product
payment_gross = 13.68
shipping = 0.00


=======================[25-Jul-2010 10:08:23 PM]=======================
Connecting to paypal for verification..

=======================[25-Jul-2010 10:08:23 PM]=======================
Connected

=======================[25-Jul-2010 10:08:23 PM]=======================
VERIFIED

=======================[25-Jul-2010 10:08:23 PM]=======================
Couch validating transaction..

=======================[25-Jul-2010 10:08:23 PM]=======================
Transaction OK

=======================[25-Jul-2010 10:08:23 PM]=======================
Exiting
```

The snippet above shows a successful transaction. If you find any error being reported in the log, you'll need to investigate it further.<br/>
This should give you a fair idea as to what PayPal sends back as details of the transaction and what goes on while processing an IPN.

Once we are sure that the IPN is being handled properly, we can now go ahead and make [__*paypal\_processor*__](../../tags-reference/paypal_processor.html) do whatever is supposed to be done on successfully getting paid for a product. We'll assume we are to send the buyer an email with a link to the item he bought.

Once [__*paypal\_processor*__](../../tags-reference/paypal_processor.html) verifies that the IPN is indeed from PayPal, it sets the following variables for use in your script -

*   pp\_item\_name
*   pp\_item\_number
*   pp\_quantity
*   pp\_mc\_gross
*   pp\_mc\_currency
*   pp\_txn\_id
*   pp\_receiver\_email
*   pp\_payer\_email
*   pp\_first\_name
*   pp\_last\_name
*   pp\_payer\_business\_name

<p class="notice">As should be obvious, these variables represent the values that PayPal provided through the IPN. We can use these values to take further actions.</p>

[__*paypal\_processor*__](../../tags-reference/paypal_processor.html) then validates if the transaction was valid by using the IPN values and comparing them with the values stored in Couch's database. Thus it makes sure that the amount paid is not less than the item's price multiplied by the bought quantity, that the payment has been made in the right currency and that the payment has been made into the right account.<br/>
If the transaction is valid, it sets another variable named *k\_paypal\_success* else it sets a variable named *k\_paypal\_error* and places the error message into it. Additionaly, it also makes available all the variables associated with the page representing the item.

A skeletal snippet will look like the following -

```
<cms:paypal_processor>
    <cms:if k_paypal_success>

        <!-- All PayPal variables and variables of the item's page are available here -->

    </cms:if>

    <cms:if k_paypal_error>

        <!-- All PayPal variables and the error message is available here -->

    </cms:if>
</cms:paypal_processor>
```

A real world example could be -

```
<cms:paypal_processor>
    <cms:if k_paypal_success>
        <cms:send_mail from=pp_receiver_email to=pp_payer_email subject='Thank you for your purchase!' >
            Dear <cms:show pp_first_name /> <cms:show pp_last_name />,

            Thank you for buying <cms:show pp_item_name />.

            You may download your file from the following link:
            <cms:cloak_url link=downloadable_file force_download='1' />"

        </cms:send_mail>
    </cms:if>

    <cms:if k_paypal_error>
        <cms:set msg="ERROR: <cms:show k_paypal_error/>" />
        <cms:log msg />
    </cms:if>
</cms:paypal_processor>
```

In the snippet above, we are sending an email to the buyer on a successful transaction. Note how the variables set by [__*paypal\_processor*__](../../tags-reference/paypal_processor.html) are being used in the [__*send\_mail*__](../../tags-reference/send_mail.html) tag.<br/>
The email contains a link to the downloadable item (the variable *downloadable\_file* is an editable region of type file within the template and contains the item's link).<br/>
The [__*cloak\_url*__](../../tags-reference/cloak_url.html) tag is used to conceal the real path of the item.
