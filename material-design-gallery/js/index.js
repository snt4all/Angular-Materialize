angular
	.module( "MyApp" )
	.config( function( $mdThemingProvider ) {
  	$mdThemingProvider
			.theme( "default" )
    	.primaryPalette( "teal" );
	})
	.controller( "AppCtrl", function( $scope, $timeout, $mdSidenav, $mdUtil, $log ) {
		function buildToggler( navID ) {
			var debounceFn = $mdUtil.debounce( function() {
				$mdSidenav( navID ).toggle().then( function () {
					$log.debug( "toggle " + navID + " is done" );
				});
			}, 300);
			
			return debounceFn;
		}
		
		$scope.toggleLeft = buildToggler( "left" );
	})
	.controller( "LeftCtrl", function( $scope, $timeout, $mdSidenav, $log ) {
		$scope.close = function() {
			$mdSidenav( "left" ).close();
		};
	});


var redrawingLayout = false,
		imgRequests = 0;

var tempUrl = [ "https://ununsplash.imgix.net/photo-1428976343495-f2c66e701b2b?fit=crop&fm=jpg&q=75&w=1050",
							 "https://unsplash.imgix.net/photo-1428976365951-b70e0fa5c551?fit=crop&fm=jpg&h=700&q=75&w=1050",
							 "https://unsplash.imgix.net/photo-1428959249159-5706303ea703?fit=crop&fm=jpg&h=700&q=75&w=1050",
							 "https://ununsplash.imgix.net/photo-1428699190791-2c4f8b144d06?fit=crop&fm=jpg&h=1575&q=75&w=1050",
							 "https://ununsplash.imgix.net/photo-1428908728789-d2de25dbd4e2?fit=crop&fm=jpg&h=700&q=75&w=1050",
							 "https://ununsplash.imgix.net/photo-1427434846691-47fc561d1179?fit=crop&fm=jpg&h=700&q=75&w=1050",
							 "https://unsplash.imgix.net/photo-1414432667065-fbbcad756703?fit=crop&fm=jpg&h=800&q=75&w=1050",
							 "https://ununsplash.imgix.net/reserve/AXx3QORhRDKAMrbb8pX4_photo%202.JPG?fit=crop&fm=jpg&h=700&q=75&w=1050",
							 "https://unsplash.imgix.net/photo-1428342319217-5fdaf6d7898e?fit=crop&fm=jpg&h=500&q=75&w=1050",
							 "https://ununsplash.imgix.net/reserve/8S64npOgTu2eWTZIXEfy_DSC_0955.JPG?fit=crop&fm=jpg&h=700&q=75&w=1050" ];


// workarounds a bit buggy gallery plugin:
function redrawLayout() {
	//msnry.bindResize(); // alternative redrawing layout approach
	msnry.layout();
	
	if( !redrawingLayout ) {
		redrawingLayout = true;
		
		setTimeout( function() {
			msnry.layout();
		}, 350 );
		
		setTimeout( function() {
			msnry.layout();
		}, 550 );
		
		setTimeout( function() {
			msnry.layout();
			redrawingLayout = false;
		}, 750 );
	};
}

function addNewElement() {
	var temp,
			elem;
	
	/*
	   AJAX for img url here
	*/
	
	var url = tempUrl[ Math.floor( Math.random() * 10 ) ]; // get some random image URL
	
	var newImg = document.createElement( "img" );
	newImg.onload = function() {
		console.log( "img loaded" );
		temp = document.createElement( "div" );
		temp.appendChild( newImg );
		
		elem = document.createElement( "div" );
		elem.setAttribute( "class", "item new" + Math.floor( Math.random() * 3 + 1 ) );
		elem.appendChild( temp );
		
		document.getElementById( "gallery" ).appendChild( elem );
		msnry.appended( elem );
		redrawLayout();
		
		imgRequests -= 1;
		loadElements();
	}
	
	newImg.setAttribute( "src", url );
}

function loadElements() {
	var height = window.innerHeight
	          || document.documentElement.clientHeight
	          || document.body.clientHeight;
	
	var load = document.getElementById( "loading" ).getBoundingClientRect().top < height * 1.25 ? true : false;
	
	if( load ) {
		console.log( "load!" );
		if( imgRequests <= 7 ) {
			imgRequests += 1;
			addNewElement();
		}
	};
}

document.addEventListener( "DOMContentLoaded", function() {
	msnry = new Masonry( "#gallery", {
		percentPosition: "true",
		itemSelector: ".item",
		transitionDuration: 0 // "0.4s" is default
	});
	
	window.onresize = function() {
		redrawLayout();
		loadElements();
	};
	
	document.getElementById( "container" ).onscroll = function() {
		loadElements();
		console.log( imgRequests );
	};
	
	loadElements();
});