A Pen created at CodePen.io. You can find this one at http://codepen.io/mikkokam/pen/PqpZoN.

 PROBLEM 1
Angular Material toolbars: md-scroll-shrink needs a fixed height md-content below to work. No way to use relative measurements.

PROBLEM 2
The fixed height content will be transformed up by the directive, but the height remains unchanged - resulting in the lower border of the content to creep up as the toolbar is hiding.

FIX
Wrap the toolbar and the content in an outer div, set it's height to px or vh.
Now you can set the md-content to be relative (of the outer container, naturally).