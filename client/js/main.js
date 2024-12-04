(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);



////////////////////////////////////////////////////
/////////////////// ON Fleet////////////
//////////////////////////////////////////////////
// function changeContentFleet(section) {
//     const contentData = {
//         'courier': {
//             image: '/client/images/onfleet/industry-courier.png',
//             subtitle: 'Courier',
//             features: [
//                 'Gain up to 40% efficiency with route optimization',
//                 'Simplify driver onboarding',
//                 'Provide clients real-time updates on all deliveries'
//             ]
//         },
//         'grocery': {
//             image: '/client/images/onfleet/industry-grocery.png',
//             subtitle: 'Grocery',
//             features: [
//                 'Manage grocery deliveries effectively',
//                 'Ensure freshness with real-time tracking',
//                 'Optimize delivery routes for efficiency'
//             ]
//         },
//         'restaurant': {
//             image: '/client/images/onfleet/industry-courier.png',
//             subtitle: 'Restaurant',
//             features: [
//                 'Deliver food hot and fresh',
//                 'Real-time order tracking for customers',
//                 'Optimize delivery routes to reduce time'
//             ]
//         },
//         'coffee': {
//             image: '/client/images/onfleet/industry-courier.png',
//             subtitle: 'coffee',
//             features: [
//                 'Deliver coffee hot and fresh',
//                 'Real-time order tracking for customers',
//                 'Optimize delivery routes to reduce time'
//             ]
//         },
//     };

//     const content = contentData[section];
//     const contentImage = document.getElementById('content-image');
//     const contentSubtitle = document.getElementById('content-subtitle');
//     const contentList = document.getElementById('content-list');

//     contentImage.classList.remove('slide-in');
//     contentSubtitle.classList.remove('slide-in');
//     contentList.classList.remove('slide-in');

//     contentImage.src = content.image;
//     contentSubtitle.innerText = content.subtitle;
    
//     contentList.innerHTML = '';
//     content.features.forEach(feature => {
//         const li = document.createElement('li');
//         li.innerText = feature;
//         contentList.appendChild(li);
//     });
    

//     contentImage.offsetHeight; 

//     setTimeout(() => {
//         contentImage.classList.add('slide-in');
//         contentSubtitle.classList.add('slide-in');
//         contentList.classList.add('slide-in');
//     }, 50);


//     const items = document.querySelectorAll('.item');
//     items.forEach(item => item.classList.remove('selected-item')); // Remove 'selected-item' class from all items
//     document.querySelector(`[onclick="changeContentFleet('${section}')"]`).classList.add('selected-item'); // Add 'selected-item' class to the clicked item
// }

//  changeContentFleet('courier');


//////////////////////////////////////////////////////////
//////////////////////FAQ////////////////////////////////
/////////////////////////////////////////////////////

