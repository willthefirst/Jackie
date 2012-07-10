var APP = {

	init: function() {
		APP.paginate.init();
	},

	/* GENERAL Page turning and transitions */

	paginate: {

		$current: $(),
		$next: $(),
		$previous: $(),

		init: function() {

			var page = APP.paginate;

			page.newPage($('.page-current'));

			/* Navigation */		
			$('.btn-next').on('click', page.stepForward);
			$('.btn-previous').on('click', page.stepBack);
		},

		newPage: function(current) {

			var page = APP.paginate;

			page.$current = current;

			/* Initiate scene-specific JS */
			var scene = page.$current.attr('class').split(' ')[0].replace("-", "_").toString();
			APP[scene].start(page.$current);

			page.$next     = page.$current.prev();
			page.$previous = page.$current.next();

			/* Reset previous page elements */
			var previous = page.$previous.attr('class').split(' ')[0].replace("-", "_").toString();

			window.setTimeout(function(){
				APP[previous].reset(page.$previous);
			}, 1200);

		},

		stepForward: function() {

			var page = APP.paginate;

			page.$current.toggleClass('hidden page-current');
			page.$next.toggleClass('page-current hidden');

			page.newPage(page.$next);

		},

		stepBack: function() {

			var page = APP.paginate;

			page.$current.toggleClass('hidden page-current');
			page.$previous.toggleClass('page-current hidden');

			page.newPage(page.$previous);

		}
	},

	/* temp */
	temp_0: {
		start: function(current) {
			$('.btn-previous').hide();
		},

		reset: function(current) {}
	},

	/* SCENE start_1 */

	start_1: {
		start: function(current) {
			$('.btn-previous').hide();

			var $cloud_1 = current.children('.cloud-1');
			var $cloud_2 = current.children('.cloud-2');
			var $left_cloud = current.children('.left-cloud');
			var $right_cloud = current.children('.right-cloud');
			var $sky = current.children('.sky');

			current.children($cloud_1, $cloud_2, $left_cloud, $right_cloud, $sky).toggleClass('stop go');
		},

		reset: function(current) {

		}
	},

	/* SCENE exposition_2 */

	exposition_2: {

		start: function(current) {
			$('.btn-previous').show();

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

	/* SCENE cowsale_3 */

	cowsale_3: {

		start: function(current) {},

		reset: function(current) {}

	},

	/* SCENE beantoss_4 */

	beantoss_4: {

		start: function(current) {},

		reset: function(current) {}

	},

	/* SCENE nextmorning_5 */

	nextmorning_5: {

		start: function(current) {},

		reset: function(current) {}

	},

	/* SCENE beanstalk_6 */

	beanstalk_6: {

		start: function(current) {},

		reset: function(current) {}

	},

	/* SCENE arrival_7 */

	arrival_7: {

		start: function(current) {},

		reset: function(current) {}

	},

	/* SCENE giant_8 */

	giant_8: {

		start: function(current) {

		// temp
		// var $item_1 = $('.item1');
		// var $item_2 = $('.item2');
		// var $item_3 = $('.item3');

		// var steal = function(item) {
		// 		item.addClass('steal');
		// 	};

		// steal($item_1);

		},

		reset: function(current) {}

	},

	/* SCENE flee-9 */

	flee_9: {

		start: function(current) {},

		reset: function(current) {}

	},

	chop_10: {

		start: function(current) {},

		reset: function(current) {}

	},

	fallen_11: {

		start: function(current) {
			$('.btn-next').show();

		},

		reset: function(current) {}
	},

	end_12: {

		start: function(current) {
			$('.btn-next').hide();
		},

		reset: function(current) {}
	}
};

$(document).ready(APP.init);