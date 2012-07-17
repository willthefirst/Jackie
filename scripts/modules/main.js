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

			page.newPage($('.current'));

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

			page.$next     = page.$current.next();
			page.$previous = page.$current.prev();
		},

		stepForward: function() {
			var page = APP.paginate;

			var a = page.$current;
			page.$previous.toggleClass('previous hidden');
			page.$next.toggleClass('current hidden');

			window.setTimeout(function() {
				a.toggleClass('previous current');
			}, 1200);
			
			page.newPage(page.$next);
		},

		stepBack: function() {
			var page = APP.paginate;
			var a = page.$current;

			a.css('opacity','0');
			page.$previous.toggleClass('current previous');
			page.$previous.prev().toggleClass('hidden previous');

			window.setTimeout(function() {
				a.toggleClass('current hidden').css('opacity','');
			}, 1200);

			page.newPage(page.$previous);
		}
	},

	/* SCENE start_1 */

	start_1: {
		start: function(current) {
			$('.btn-previous').hide();
		},

		reset: function(current) {
		}
	},

	/* SCENE exposition_2 */

	exposition_2: {

		start: function(current) {
			$('.btn-previous').show();
		},

		reset: function(current) {
		}
	},

	/* SCENE cowsale_3 */

	cowsale_3: {

		start: function(current) {},

		reset: function(current) {}

	},

	/* SCENE beantoss_4 */

	beanstalk_4: {

		start: function(current) {
			var $scene = $('.beanstalk-4');
			var a = $('.background > .a');
			var b = $('.background > .b');
			var c = $('.background > .c');
			var d = $('.background > .d');
			var e = $('.background > .e');

			function Narrator(paragraph, top, bottom) {
				this.paragraph = paragraph;
				this.top = top;
				this.bottom = bottom;

				this.on = function() {
					paragraph.addClass('on');
					paragraph.removeClass('off');
				};

				this.off = function() {
					paragraph.addClass('off');
					paragraph.removeClass('on');
				};
			}

			a = new Narrator(a, 2461, 2393);
			b = new Narrator(b, 2045, 1585);
			c = new Narrator(c, 1493, 1061);
			d = new Narrator(d, 1025, 517);
			e = new Narrator(e, 12, 0);

			var narrators = [a,b,c,d,e];

			$scene.scroll(function(e) {
				var scroll_pos = e.target.scrollTop;
				console.log(scroll_pos);

				for(var i = 0; i < narrators.length; i++) {
					if (narrators[i].bottom <= scroll_pos && scroll_pos <= narrators[i].top) {
						console.log(narrators[i].paragraph);
						narrators[i].on();
					}
					else {
						narrators[i].off();
					}
				}
			});

/*			$scene.scroll(function(e) {
				var scroll_pos = e.target.scrollTop;
				console.log(scroll_pos);


				if (scroll_pos >= 2393) {
					a.addClass('on');
					a.removeClass('off');
				}

				else (scroll_pos <= 2393) {
					a.addClass('off');
					a.removeClass('on');
				}
			} */

		},


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