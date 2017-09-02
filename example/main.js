require('../src/Slider.css');
import {Slider} from "../src/Slider.js";

var s = new Slider({
    sliderId: "slider-container",
    autoLoopTime: 3000,
    hasDotNav: false, /*default is true*/
    nextAndPrevButtons: false /*default is true*/
});
s.init();

var s2 = new Slider({
    sliderId: "slider-container2",

    sliderHeights: {
        "0": "150",
        "600": "200",
        "992": "300",
        "1200": "450"
    },

    autoLoopTime: 4000,
    hasDotNav: true, /*default is true*/
    nextAndPrevButtons: true /*default is true*/
});
s2.init();