'use strict';

/* Directives */


var myApp = angular.module('myApp.directives', ['ngDragDrop']);

myApp.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

myApp.directive("imagecropper", function () {
	  return {
	    restrict: "E",        // the Accordion is an element
	    replace: true,        // replace the original markup with our template
	    scope: {
	    	'src':'@src', 
			'scale':'@scale',
			'scalestep':'@scalestep',
			'left':'@left',
			'top':'@top',
			'mywidth':'=mywidth',
			'myheight':'=myheight'
		},
	    templateUrl:'/app/partials/directives/image-cropper/index.html',
	    link: function (scope, element, attrs) {
	    	scope.scalestep = parseFloat(scope.scalestep);
			/* Action Method Map */
	    	scope.zoomIn = function() { 
	    		if(scope.scale < 1) { 
	    			scope.scale = parseFloat(scope.scale) + parseFloat(scope.scalestep);
	    		}
	    		scope.updateScale();
	    	};

	    	scope.zoomOut = function() {
	    		if(scope.scale > 0.1){
	    			scope.scale = parseFloat(scope.scale) - parseFloat(scope.scalestep);
	    		} 
	    		scope.updateScale();
	    	};

	    	scope.zoomRotate = function() { console.log('zoomRotate'); };
	    	scope.trash = function() { console.log('trash'); };
	    	scope.updateScale = function(){
	    		scope.imageStyle = {
					'max-width': 'none',
					'position': 'relative',
					'zoom':''+scope.scale+'',
					'-moz-transform': 'scale('+scope.scale+')',
					'-webkit-transform': 'scale('+scope.scale+')',
					'-o-transform': 'scale('+scope.scale+')',
					'-moz-transform-origin': 'top left',
					'-webkit-transform-origin': 'top left',
					'-o-transform-origin': 'top left'
				};
	    	}
	    	scope.ondrapstop = function(e,u){
	    		scope.left = u.position.left;
	    		scope.top = u.position.top;
	    	}
	    	/* End Action Method Map */

	    	/* CSS Map */
	    	scope.cropperWrapper = {
	    		'width': scope.mywidth+'px'
	    	}
	    	scope.cropperBtnWrapper = {
	    		'margin-bottom': '10px'
	    	}
	    	scope.imageStyleWrapper = {
				'overflow': 'hidden',
				'width': ""+scope.mywidth + "px",
				'height': ""+scope.myheight + "px",
				'border': 'solid 2px #ccc'
			};
	    	scope.updateScale();
			/* END CSS Map */
			
	    },
	    controller: function () {

	    }
	  };
	});

myApp.directive("jqyiviewer", function () {
	  return {
	    restrict: "E",        // the Accordion is an element
	    replace: true,        // replace the original markup with our template
	    scope: {
			'data':'=data'
		},
		template: '<div class="jqyviewer-wrapper"></div>',
		link: function (scope, element, attrs) {
			scope.debug 		= typeof attrs.debug		!== 'undefined'	? attrs.debug		: false;
			scope.data 			= typeof scope.data 		!== 'undefined' ? scope.data 		: {};
			scope.data.zoom 	= typeof scope.data.zoom 	!== 'undefined' ? scope.data.zoom 	: attrs.zoom;
			scope.data.x 		= typeof scope.data.x 		!== 'undefined' ? scope.data.x		: attrs.x;
			scope.data.y 		= typeof scope.data.y 		!== 'undefined' ? scope.data.y		: attrs.y;
			scope.data.src 		= typeof scope.data.src 	!== 'undefined' ? scope.data.src 	: attrs.src;
			scope.data.width 	= typeof scope.data.width 	!== 'undefined' ? scope.data.width 	: attrs.width;
			scope.data.height 	= typeof scope.data.height 	!== 'undefined' ? scope.data.height : attrs.height;
			scope.data.display_width = '';
			scope.data.display_height = '';
				
			$(element).css({
				'width': scope.data.width+'px',
				'height':scope.data.height+'px',
				'overflow':'hidden',
				'border': '1px solid black',
				'position':'relative'
			});

			$(element).iviewer({
                src: attrs.src,
                zoom: scope.data.zoom
            });

            scope.onZoom 		= function(e, zoom){			/*scope.$apply(scope.updateData);*/		};
            scope.onAfterZoom 	= function(e, zoom){			scope.$apply(scope.updateData);			};
            scope.onStartDrag 	= function(e, point){			/*scope.$apply(scope.updateData);*/		};
            scope.onDrag 		= function(e, point){			/*scope.$apply(scope.updateData);*/		};
            scope.onStopDrag 	= function(e, point){			scope.$apply(scope.updateData);			};
            scope.onMouseMove	= function(e, point){			/*scope.$apply(scope.updateData);*/		};
            scope.onClick		= function(e, point){			/*scope.$apply(scope.updateData);*/		};
            scope.onStartLoad	= function(e, src){				/*scope.$apply(scope.updateData);*/		};
            scope.onFinishLoad	= function(e, src){				scope.myInit();				};
            scope.angle			= function(e, angleObj){		scope.$apply(scope.updateData);			};
            scope.updateData = function(){
            	var coords = $(element).iviewer('info','coords');
            	scope.data.display_width = $(element).iviewer('info','display_width');
            	scope.data.display_height = $(element).iviewer('info','display_height');
            	scope.data.angle = $(element).iviewer('info','angle');
            	scope.data.src = $(element).iviewer('info','src');
            	scope.data.zoom = $(element).iviewer('info','zoom');
            	scope.data.x = coords.x;
            	scope.data.y = coords.y;
            	if(scope.debug == 'true'){
            		console.log(scope.data);
            	}
            };

            scope.myInit		= function(){
            	$(element).iviewer('setCoords', attrs.x, attrs.y);
            }

            $(element).bind('ivieweronzoom', scope.onZoom);
            $(element).bind('ivieweronafterzoom', scope.onAfterZoom);
            $(element).bind('ivieweronstartdrag', scope.onStartDrag);
            $(element).bind('iviewerondrag', scope.onDrag);
            $(element).bind('ivieweronstopdrag', scope.onStopDrag);
            $(element).bind('ivieweronmousemove', scope.onMouseMove);
            $(element).bind('ivieweronclick', scope.onClick);
            $(element).bind('ivieweronstartload', scope.onStartLoad);
            $(element).bind('ivieweronfinishload', scope.onFinishLoad);
            $(element).bind('iviewerangle', scope.angle);
		},
		controller: function(){
		}
	};
});
