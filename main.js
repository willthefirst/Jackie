var APP = {

	init: function() {
		APP.paginate();
	},

	/* GENERAL Page turning and transitions */

	paginate: function() {

		/* Navigation */
		var $next_btn = $('.btn-next');
		var $previous_btn = $('.btn-previous');

		/* Page selectors */
		var $page_current, $page_next, $page_previous, scene, previous;


		var newPage = function(current) {
				$page_current = current;

				/* Initiate scene-specific JS */
				scene = $page_current.attr('class').split(' ')[0].replace("-", "_").toString();
				APP[scene].start($page_current);
				$page_next = $page_current.prev();
				$page_previous = $page_current.next();
				previous = $page_previous.attr('class').split(' ')[0].replace("-", "_").toString();
				window.setTimeout(function(){
					APP[previous].reset($page_previous);
				}, 1200);
			};

		var stepForward = function() {
				$page_current.toggleClass('hidden page-current');
				$page_next.toggleClass('page-current hidden');
				newPage($page_next);
			};

		var stepBack = function() {
				$page_current.toggleClass('hidden page-current');
				$page_previous.toggleClass('page-current hidden');
				newPage($page_previous);
			};

		newPage($('.page-current'));
		$next_btn.on('click', stepForward);
		$previous_btn.on('click', stepBack);
	},

	start_1: {
		start: function(current) {

		},

		reset: function(current) {}
	},

	/* SCENE exposition-2 */

	exposition_2: {

		start: function(current) {
			current.children('.cloud').css('-webkit-transition','');

			var $cloud = current.children('.cloud');
			var $house_right = current.children('.house-right');
			var $house_left = current.children('.house-left');
			var $sign = current.children('.sign');

			current.children($cloud, $house_right, $house_left, $sign).toggleClass('stop go');
		},

		reset: function(current) {
			current.children('.cloud').css('-webkit-transition','none');
			current.children().toggleClass('stop go');
		}
	},

	cowsale_3: {

		start: function(current) {},

		reset: function(current) {}

	},

	/* SCENE theft-8 */

	theft_8: function() {

		var $item_1 = $('.item1');
		var $item_2 = $('.item2');
		var $item_3 = $('.item3');

		var steal = function(item) {
				item.addClass('steal');
			};

		steal($item_1);

	}
};

$(document).ready(APP.init);