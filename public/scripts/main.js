(function () {
    'use strict';

    let owl = $(".owl-carousel");
    let waterImgElem = `<img class="advantages__big-img advantages__center" src="./img/ball.png"
alt="Почему стоит заказать воду у нас?">`;

    if ($(window).width() < 768) {
        $('.advantages__big-img').remove();
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
            $('.advantages__big-img').remove();

            if ($('.advantages__big-img').length == 0) {
                $(waterImgElem).insertAfter('.advantages__left');
            }
            return;
        }

        $('.advantages__big-img').remove();

        owl.owlCarousel({
            items: 1,
            loop: true,
            dotsClass: 'advantages__dots',
            dotClass: 'advantages__dot',
        });



    });

}());
