window.RS = window.RS || {};

RS.Slider = (function() {

    var Slider = function(name, element, options) {

        options = options || {};

        this.defaultOptions = {
            items: 5,
            margin: 30,
            loop: true,
            autoplay: false,
            merge: true,
            nav: true,
            navText: ['<span></span>', '<span></span>'],
            navClass: ['prev', 'next'],
            responsive: {},
            onInitialized: function() {
                this.$element.addClass('owl-carousel owl-theme');
            },
            onChanged: function() {
                this.settings.loop = (this._items.length <= this.settings.items) ? false : this.options.loop;
            }
        };

        this.element = element;
        this.$element = $(element);
        this.name = name;
        this.options = $.extend({}, this.defaultOptions, options, this.parseOptions());
        this.obj = {};
    }

    Slider.prototype.getObj = function() {
        return this.obj;
    }

    Slider.prototype.parseOptions = function() {
        var options = {};

        try {
            var stringOptions = this.$element.data('slider-options');
            if (BX.type.isString(stringOptions)) {
                options = $.parseJSON(stringOptions);
            } else if (BX.type.isPlainObject(stringOptions)) {
                options = stringOptions;
            }
        } catch (err) {
            console.error(err)
        }

        return options;
    }

    Slider.prototype.init = function() {
        this.obj = this.$element.owlCarousel(this.options);
    }

    return Slider;

}());
