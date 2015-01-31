# TouchShow
Simple JavaScript that can be used to display where touches on a touch screen have occurred.

I created this JavaScript in order to visualize where touches on a touch screen occur. I needed this because I was recording the screen directly (screen capture), but it was disorienting to see the interface change and not see where the user had touched.

With this script, a small number is displayed on the screen to enumerate and localize the touches. The numbers quickly fade away.

To use this script, simply create a new TouchShow element:
var touchShow = new TouchShow();
