// Display the number of characters in textarea

(function ($) {

    $.fn.limit = function (elem, limit) {

        var target = this,
            display = $(elem);

        target.on('focus keyup setlimit', function () {
            var len = target.val().length;
            //console.log(len);
            var maxlen = target.attr("maxlength");
            console.log((limit-len) +',' + len);
            //display.text(limit - len);
            $(elem).next('.limit-js').text(len + ' / ' + limit);
            $(elem).attr('maxlength', limit)
        }).trigger('setlimit');

    };

}(jQuery));

$(document).ready(function() {
        // Initializes search overlay plugin.
        // Replace onSearchSubmit() and onKeyEnter() with 
        // your logic to perform a search and display results
        $('[data-pages="search"]').search({
            searchField: '#overlay-search',
            closeButton: '.overlay-close',
            suggestions: '#overlay-suggestions',
            brand: '.brand',
            onSearchSubmit: function(searchString) {
                console.log("Search for: " + searchString);
            },
            onKeyEnter: function(searchString) {
                console.log("Live search for: " + searchString);
                var searchField = $('#overlay-search');
                var searchResults = $('.search-results');
                clearTimeout($.data(this, 'timer'));
                searchResults.fadeOut("fast");
                var wait = setTimeout(function() {
                    searchResults.find('.result-name').each(function() {
                        if (searchField.val().length != 0) {
                            $(this).html(searchField.val());
                            searchResults.fadeIn("fast");
                        }
                    });
                }, 500);
                $(this).data('timer', wait);
            }
        });
        $("textarea").limit("#ads_text_input-js", 50); // и число не строкой
    });

