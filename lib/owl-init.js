function CallStack() {
    var instance = this, slidersObjects = {};
    this.initSliders = function (sliders) {
        sliders.forEach(function (slider) {
            slidersObjects[slider.selector] = {'obj': $(slider.selector).owlCarousel(slider.config)};
        });
        sliders.forEach(function (slider) {
            if (slider.hasOwnProperty("linkControlTo") && slidersObjects.hasOwnProperty(slider.linkControlTo) && slidersObjects.hasOwnProperty(slider.selector)) {
                slidersObjects[slider.selector].obj.on("change.owl.carousel", function (event) {
                    if (event.namespace && event.property.name === 'position') {
                        var target = event.relatedTarget.relative(event.property.value, true);
                        slidersObjects[slider.linkControlTo].obj.owlCarousel('to', target, 300);
                    }
                });
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    var run = new CallStack();
    var owlSliders = [{
        selector: '.owl-carousel-top',
        linkControlTo: '.loop.rewie',
        autoHeight: true,
        config: {nav: true,  items: 1, loop: true}
    }, {
        selector: '.loop.rewie',
        config: {
            center: true,
            touchDrag: false,
            mouseDrag: false,
            autoHeight: true,
            loop: true,
            responsive:{
                0:{
                    items:1
                },
                767:{
                    items:3
                },
                1024:{
                    items:7
                }
            }
        }
    },
        {
        selector: '.owl-min-slide',
        config: {
            loop:false,
            nav:true,
            touchDrag: false,
            mouseDrag: false,
            autoHeight: true,
            margin:20,
            responsive:{
                0:{
                    items:1,
                    touchDrag: true,
                    mouseDrag: true
                },
                600:{
                    items:2,
                    touchDrag: true,
                    mouseDrag: true
                },
                1000:{
                    items:3
                }
            }

        }
    },
        {
            selector: '.owl-b-areas',
            config: {
                loop:true,
                // margin: 35,
                dots: false,
                nav: true,
                responsive:{
                    0:{
                        items:1
                    },
                    480:{
                        items:3
                    },
                    768:{
                        items:4
                    },
                    980:{
                        items:5
                    },
                    1023:{
                        items:7
                    }
                }

            }
        },
        {
            selector: '.owl-b-faq',
            config: {
                loop:true,
                margin: 30,
                dots: false,
                nav: true,
                items: 3,
                responsive:{
                    0:{
                        margin: 20,
                        items:1
                    },
                    768:{
                        items:2
                    },
                    1024:{
                        items:3
                    }
                }

            }
        }
    ];


    run.initSliders(owlSliders);
});
