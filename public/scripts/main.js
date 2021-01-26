(function () {
    'use strict';

    let owl = $(".owl-carousel");

    if ($(window).width() < 768) {
        owl.owlCarousel({
            items: 1,
            loop: true,
            dotsClass: 'advantages__dots',
            dotClass: 'advantages__dot',
        });
    }


    $(window).on('resize', () => {
        if ($(window).width() >= 768) {
            owl.trigger('destroy.owl.carousel');
            return;
        }

        owl.owlCarousel({
            items: 1,
            loop: true,
            dotsClass: 'advantages__dots',
            dotClass: 'advantages__dot',
        });
    });

}());
