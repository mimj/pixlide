class Slider {

    constructor(options) {

        this.sliderId = options.sliderId;

        this.time = options.autoLoopTime;
        this.widthHeights = options.sliderHeights;
        this.hasDotNav = (options.hasDotNav !== false ) ? true : options.hasDotNav; // If not deactivated by user default is true

        this.slides = document.querySelectorAll("#" + this.sliderId + " [class^='slideWrapper']");

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

        if (this.hasDotNav) {
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

        var slides = [];

        for (var i = 0; i < self.slides.length; i++) {
            slides[i] = self.slides[i];
        }

        slides.forEach((s, i) => {
            var el = document.createElement("div");
            el.className = "dot";
            self.dotsWrapper.appendChild(el);
            self.dots[i] = el;
            self.dots[i].onclick = function () {
                self.showSlide(i);
            }
        });
        this.dots[this.activeSlide].className = "active dot";
    }

    showSlide(i) {
        var oldActiveSlide = this.activeSlide;

        this.slides[this.activeSlide].classList.remove("active");
        this.slides[(this.activeSlide = i)].classList.add("active");

        if (this.hasDotNav) {
            this.dots[oldActiveSlide].className = "dot";
            this.dots[this.activeSlide].className = "active dot";
        }

        if (this.time) {
            clearInterval(this.autoLoop);
            this.autoLoop = setInterval(this.loop.bind(this), this.time);
        }
    };

    /*Auto loop every 5 Second*/
    loop() {
        var self = this;
        var oldActiveSlide = this.activeSlide;
        var length = self.slides.length - 1;
        if (self.activeSlide == length) {
            // self.activeSlide = 0;
            self.slides[oldActiveSlide].classList.remove("active");
            self.slides[self.activeSlide = 0].classList.add("active");

            if (this.hasDotNav) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }

        } else {
            self.slides[self.activeSlide].classList.remove("active");
            self.slides[++self.activeSlide].classList.add("active");

            if (this.hasDotNav) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }
        }
    };


    nextSlide() {
        var self = this;
        var oldActiveSlide = this.activeSlide;

        if (this.activeSlide == (this.slides.length - 1)) {

            this.slides[this.activeSlide].classList.remove("active");
            this.slides[(this.activeSlide = 0)].classList.add("active");

            if (this.hasDotNav) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }

            if (self.time) {
                clearInterval(this.autoLoop);
                this.autoLoop = setInterval(this.loop.bind(this).bind(this), this.time);
            }
        } else {
            this.slides[this.activeSlide].classList.remove("active");
            this.slides[++this.activeSlide].classList.add("active");

            if (this.hasDotNav) {
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
            this.slides[this.activeSlide].classList.remove("active");
            this.slides[(this.activeSlide = (this.slides.length - 1))].classList.add("active");

            if (this.hasDotNav) {
                this.dots[oldActiveSlide].className = "dot";
                this.dots[this.activeSlide].className = "active dot";
            }

            if (self.time) {
                clearInterval(this.autoLoop);
                this.autoLoop = setInterval(this.loop.bind(this).bind(this), this.time);
            }
        } else {
            this.slides[this.activeSlide].classList.remove("active");
            this.slides[--this.activeSlide].classList.add("active");

            if (this.hasDotNav) {
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

