$(function() {
    // report bug button
    $('.report-bug').attr('href', function() {
        return $(this).attr('href') +
                '?title=' + encodeURIComponent($(this).data('title')) +
                '&body=' + encodeURIComponent("**Page:** ` " + document.location.href + " `\n\n[Describe the issue here]");
    });

    // footer - back to top link
    $('.backtotop').click(function(){
        $('html, body').animate({scrollTop:0}, 'slow');
    });
});
