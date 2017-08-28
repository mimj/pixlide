class Slider {

    constructor(options) {

        this.sliderId = options.sliderId;

        this.time = options.autoLoopTime;
        this.widthHeights = options.sliderHeights;
        this.hasDots = (options.hasDots !== false ) ? true : options.hasDots; // If not deactivated by user default is true

        this.slides = document.querySelectorAll("#" + this.sliderId + " [class^='slideWrapper'] .slide");

        this.activeSlide = 0;
        this.nextAndPrevButtons = options.nextAndPrevButtons;


        this.loop.bind(this);

    }

    init() {
        if (this.widthHeights) {
            this.sortedWidths = this.sortWidths(this.widthHeights);
            this.sortedWidths.reverse();

            this.setSliderHeight();
            this.correctTheHeight(this.setSliderHeight.bind(this));
        }
        if (this.time) {
            this.autoLoop = setInterval(this.loop.bind(this), this.time);
        }

        if (this.hasDots) {
            this.addDots();
        }

        if (this.nextAndPrevButtons !== false) {
            this.nextButton = document.querySelector("#" + this.sliderId + " .next");
            this.prevButton = document.querySelector("#" + this.sliderId + " .prev");

            this.nextButton.onclick = this.nextSlide.bind(this);
            this.prevButton.onclick = this.prevSlide.bind(this);
        }
    }

    correctTheHeight(func) {
        func();
        var oldResize = window.onresize;
        window.onresize = function () {
            func();
            if (typeof oldResize === 'function') {
                oldResize();
            }
        }
    }

    sortWidths(widthHeights) {
        var widths = Object.keys(widthHeights);
        widths = (widths.sort((a, b)=> a - b));
        return widths;

    }

    setSliderHeight() {
        this.sortedWidths.some(w=> {
            if (document.documentElement.clientWidth > w) {
                document.querySelector("#" + this.sliderId).style.height = this.widthHeights[w] + "px";
                return true
            }
        });
    };

    addDots() {
        /*Adding dots into bottom of the slider*/
        var self = this;
        this.dotsWrapper = document.querySelector("#" + this.sliderId + " .dotsWrapper");
        this.dots = [];
        this.slides.forEach(function (s, i) {
            var el = document.createElement("div");
            el.className = "dot";
            self.dotsWrapper.appendChild(el);
            self.dots[i] = el;
            self.dots[i].onclick = function () {
                self.showSlide(i);
            }
        });
        this.dots[this.activeSlide].className = "active dot"
    }

    showSlide(i) {
        var oldActiveSlide = this.activeSlide;
        this.slides[this.activeSlide].className = "slide";
        this.slides[(this.activeSlide = i)].className = "active slide";

        if (this.hasDots) {
            this.dots[oldActiveSlide].className = "dot";
            this.dots[this.activeSlide].className = "active dot";
        }

        if (this.time) {
            clearInterval(this.autoLoop);
            this.autoLoop = setInterval(this.loop.bind(this), this.time);
        }
    };

    /*Auto loop every "this.time" Second*/
    loop() {
        var self = this;
        var oldActiveSlide = this.activeSlide;
        if (self.activeSlide == (self.slides.length - 1)) {
            self.slides[self.activeSlide].className = "slide";
            self.slides[(self.activeSlide = 0)].className = "active slide";

            if (this.hasDots) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }

        } else {
            self.slides[self.activeSlide].className = "slide";
            self.slides[++self.activeSlide].className = "active slide";
            if (this.hasDots) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }
        }
    };


    nextSlide() {
        var self = this;
        var oldActiveSlide = this.activeSlide;

        if (this.activeSlide == (this.slides.length - 1)) {
            this.slides[this.activeSlide].className = "slide";

            this.slides[(this.activeSlide = 0)].className = "active slide";

            if (this.hasDots) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }

            if (self.time) {
                clearInterval(this.autoLoop);
                this.autoLoop = setInterval(this.loop.bind(this).bind(this), this.time);
            }
        } else {
            this.slides[this.activeSlide].className = "slide";

            this.slides[++this.activeSlide].className = "active slide";

            if (this.hasDots) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }

            if (self.time) {
                clearInterval(this.autoLoop);
                this.autoLoop = setInterval(this.loop.bind(this).bind(this), this.time);
            }
        }
    };

    prevSlide() {
        var self = this;
        var oldActiveSlide = this.activeSlide;

        if (this.activeSlide == (0)) {
            this.slides[this.activeSlide].className = "slide";

            this.slides[(this.activeSlide = (this.slides.length - 1))].className = "active slide";


            if (this.hasDots) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }

            if (self.time) {
                clearInterval(this.autoLoop);
                this.autoLoop = setInterval(this.loop.bind(this).bind(this), this.time);
            }
        } else {
            this.slides[this.activeSlide].className = "slide";

            this.slides[--this.activeSlide].className = "active slide";

            if (this.hasDots) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }

            if (self.time) {
                clearInterval(this.autoLoop);
                this.autoLoop = setInterval(this.loop.bind(this).bind(this), this.time);
            }
        }
    };

}

exports.Slider = Slider;
