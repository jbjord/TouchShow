/**
 * A TouchShow is responsible for creating the touch points and adding an 
 * event listener. The touch points then appear and fade out where a person 
 * has touched. 
 * @param {string} [prefix='touch'] - The prefix to add to the elements' ids. 
 * (Can help prevent id collisions.)
 */
function TouchShow(prefix) {
    'use strict';
    var i, styleEl;
    this.radius = 12;
    this.prefix = 'touch';
    if (prefix === undefined && 
    (typeof prefix === 'string' || prefix instanceof String)) {
        this.prefix = prefix;
    }
    /** The displayed touch points. */
    this.points = [];
    for (i=0; i<10; i+=1) { //maximum of 10 touches allowed
        this.points[i] = document.createElement('div');
        this.points[i].textContent = i + 1;
        this.points[i].setAttribute('id', this.prefix + '-point' + i);
        this.points[i].setAttribute('aria-hidden', 'none');
        this.points[i].classList.add(this.prefix + '-point');
        //styles stored in the element itself
        this.points[i].style.position = 'absolute';
        this.points[i].style.display = 'none';
        this.points[i].style.top = 0;
        this.points[i].style.left = 0;
        document.body.appendChild(this.points[i]);
    }
    
    //put required CSS in document -- CSS makes circles around the number    
    this.css = '.' + this.prefix + '-point { border-radius: 50%;' +
    ' width: ' +this.radius+ 'px; height: ' +this.radius+ 'px; padding: 3px;' +
    ' background-color: #CCCCCC; border: 2px solid #333333;' +
    ' text-align: center; font-size: 12px; font-weight: bold; }';
    styleEl = document.createElement('style');
    styleEl.setAttribute('type', 'text/css');
    styleEl.setAttribute('id', this.prefix + '-TouchShow');
    styleEl.appendChild(document.createTextNode(this.css));
    document.head.appendChild(styleEl);
    
    document.addEventListener('touchstart', this.handleTouch.bind(this), false);
}
TouchShow.prototype.handleTouch = function (e) {
    'use strict';
    var i, iend; 
    for (i=0, iend=e.touches.length; i<iend; i+=1) {
        this.points[i].style.top  = (e.touches[i].clientY - this.radius) + 'px';
        this.points[i].style.left = (e.touches[i].clientX - this.radius) + 'px';
        this.animate(this.points[i]);
    }
};
/**
 * Animates the points touched with a fading animation. 
 * @param {HTMLElement} el - The element to animated and fade.
 */
TouchShow.prototype.animate = function (el) {
    'use strict';
    var OPACITY_CHANGE = 0.05; //the change in opacity between frames
    el.style.opacity = '1';
    el.style.display = 'block'; //initially show the el
    
    //Fades the element out automatically
    (function fadeOut() {
        if (el.style.opacity < OPACITY_CHANGE) {
            el.style.display = 'none';
        } else {
            window.requestAnimationFrame(fadeOut);
            el.style.opacity -= OPACITY_CHANGE;
        }
    }());
};
