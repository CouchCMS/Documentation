---
title: Search
template: default.html
---

<script>
    var qs = location.search.substr(1).split('&');

    if (qs[0] !== '') {
        qs.forEach(function(item) {
                var k = item.split('=')[0],
                    v = decodeURIComponent(item.split('=')[1].replace(/\+/g, '%20'));

                if (k === 'q') {
                    document.getElementById('search_input').value = v;
                }
            }
        );
    }

    (function() {
        var cx = '006145326556115505877:jeimmot9ugc';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
            '//cse.google.com/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);
    })();
</script>

<div><gcse:searchresults-only></gcse:searchresults-only></div>
