'use strict';

window.RS = window.RS || {};

RS.Application = (function() {

    var appInstance;

    var Application = function() {
        this.sliders = {};

        this.breakpoints = {
            xxs: 0,
            xs: 480,
            sm: 768,
            md: 992,
            lg: 1200
        };

        this.fancyboxOptions = {};
        this.fancyboxOptions.popup = {
            infobar: false,
            buttons: false,
            slideShow: false,
            fullScreen: false,
            thumbs: false,
            //modal: true,
            ajax: {
                settings: {
                    data: {
                        fancybox: true
                    }
                }
            },
            touch: false,
            keyboard: true,
            btnTpl: {
                smallBtn: 'Hello'
            },
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-inner">' +
            '{{BUTTONS}}' +
            '<div class="fancybox-stage"></div>' +
            '</div>' +
            '</div>',
            afterLoad: function(instance, slide) {
                this.$content.wrapAll('<div>');
                var $wrapper = this.$content.parent();

                $wrapper.prepend('<button data-fancybox-close class="fancybox-close-small"></button>');

                if (this.$content.find('.rsform--crm').length) {
                    $wrapper.addClass('is-crm-form');
                } else {
                    var title = !!slide.opts.title && slide.opts.title.length ?
                        slide.opts.title :
                        !!instance.opts.title && instance.opts.title.length ?
                            instance.opts.title :
                            !!slide.opts.$orig ?
                                slide.opts.$orig.data('fancybox-title') || slide.opts.$orig.attr('title') || this.opts.$orig.text() :
                                undefined;

                    if (title !== undefined) {
                        this.$content.parent().prepend('<div class="fancybox-title fancybox-title-inside-wrap">' + title + '</div>');
                    }
                }
            }
        };

    };

    Application.prototype.ready = function(callFunction) {
        if (window.frameCacheVars !== undefined) {
            BX.addCustomEvent("onFrameDataReceived", function(json) {
                callFunction();
            });
        } else {
            $(document).ready(function() {
                callFunction();
            });
        }
    }

    Application.prototype.addSlider = function(name, elem, options) {
        if (!this.sliders[name]) {
            this.sliders[name] = new RS.Slider(name, elem, options);
        }
    }

    Application.prototype.initAllSliders = function() {
        $.each(this.sliders, function(name, slider) {
            slider.init();
        });
    }

    Application.prototype.setProductCart = function(id) {
        if (window.Basket == undefined) {
            return;
        }

        var inbasket = Basket.inbasket(),
            $jsBuy = $('.js-buy');

        $jsBuy.removeClass('is-incart');
        inbasket.forEach(function(id) {
            $jsBuy.filter('[data-productid=' + id + ']').addClass('is-incart');
        });

    };

    Application.prototype.getWidth = function() {
        return $(window).outerWidth();
    }

    Application.prototype.inBreakpoint = function(breakpoint) {
        if (!this.breakpoints[breakpoint] || this.getWidth() < this.breakpoints[breakpoint]) {
            return false;
        }

        return true;
    }

    Application.prototype.initPopups = function() {
        $('[data-type="ajax"]').fancybox(this.fancyboxOptions.popup);
    }
    Application.prototype.initAjaxNavigation = function() {
        $('[data-type="ajax-nav"]').off('click.ajax-nav').on('click.ajax-nav', function(event) {
            event.preventDefault();

            var $button = $(this),
                options = $button.data('nav-options'),
                data = {},
                url = $button.attr('href');

            if ($button.hasClass('is-loading')) {
                return;
            }

            $button.addClass('is-loading');

            data['PAGEN_' + options['NAV_NUM']] = ++options['NAV_PAGE_NOMER'];
            RS.loadMore(url, $button.data('load-to'), data)
                .always(function() {
                    $button.removeClass('is-loading')
                })
                .done(function() {
                    $button.data('options', options);

                    if (options['NAV_PAGE_NOMER'] >= options['NAV_PAGE_COUNT']) {
                        $button.hide();
                    }
                });
        });
    }

    Application.prototype.init = function() {
        // Popups
        this.initPopups();

        // Sliders
        this.initAllSliders();

        // Navigation
        this.initAjaxNavigation();

        // Cart
        /*
        this.setProductCart();
        BX.addCustomEvent('add2basket.rs_lightbasket', function() {
          this.setProductCart();
        }.bind(this));
        BX.addCustomEvent('clear.rs_lightbasket', function() {
          this.setProductCart();
        }.bind(this));
        BX.addCustomEvent('delete.rs_lightbasket', function() {
          this.setProductCart();
        }.bind(this));
        BX.addCustomEvent('OnBasketChange', function() {
          this.setProductCart();
        }.bind(this));
        */
    }

    Application.prototype.refresh = function() {
        this.initPopups();
        this.setProductCart();
        this.initAllSliders();
    }

    return function() {
        if (!appInstance) {
            appInstance = new Application();
        }

        return appInstance;
    };

}());
