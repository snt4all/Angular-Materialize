angular.module('app', ['ngMaterial', 'ngAnimate']);

window.onscroll = function() {changeNav()}; //Running func to changenav when you scroll down

changeNav = function(){
	if(document.body.scrollTop > 194){
    if(document.getElementById("nav"))
		document.getElementById("nav").id = "fixSmallNav";
	} else {
    if(document.getElementById("fixSmallNav"))
		document.getElementById("fixSmallNav").id = "nav";
	}
}