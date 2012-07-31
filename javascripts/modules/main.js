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
			}, 1500);
			
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
			}, 1500);

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

		start: function(current) {
			$button = $('.js_beans');
			$beans = $('.beans');

			var handleClick = function() {
				$button.on('click touchend', function() {
					$beans.addClass('fly');
					$button.off('click touchend');
					setTimeout(function() {
						$beans.removeClass('fly');
						handleClick();
					}, 1500);
				});
			};

			handleClick();
		},

		reset: function(current) {}

	},

	/* SCENE cowsale_4 */

	nextmorning_4: {

		start: function(current) {},

		reset: function(current) {}

	},

	/* SCENE beanstalk_5 */

	beanstalk_5: {

		start: function(current) {
			var narrators = this.narrators();
			var $scene = $('.beanstalk-5');
			$scene.scrollTop(2461);

			var oldScroll = 0;

			var didScroll = function() {
				x = false;

				if ($scene.scrollTop() !== oldScroll) {
					oldScroll = $scene.scrollTop();
					x = true;
				}
				
				else {
					x = false;
				}

				return x;
			};

			setInterval(function() {
				if ( didScroll() ) {

					for(var i = 0; i < narrators.length; i++) {

						var scrollIsInbound = narrators[i].bottom > oldScroll && oldScroll > narrators[i].top;
						var scrollIsOutbound = narrators[i].bottom < oldScroll || oldScroll < narrators[i].top;

						if (!narrators[i].isOn && scrollIsInbound) {
							narrators[i].on();
						}

						else if (narrators[i].isOn && scrollIsOutbound) {
							narrators[i].off();
						}
					}
				}
			}, 250);


		},

		narrators: function() {

			// Narrator constructor: narrators are paragraphs with specific scroll boundaries.
			var Narrator = function(paragraph, bottom, top) {
				this.paragraph = paragraph;
				this.top = top;
				this.bottom = bottom;
				this.isOn = false;

				this.on = function() {
					paragraph.addClass('on');
					paragraph.removeClass('off');
					this.isOn = true;
				};

				this.off = function() {
					paragraph.addClass('off');
					paragraph.removeClass('on');
					this.isOn = false;
				};
			};

			var a = new Narrator($('.wrapper > .a'), 2461, 2393);
			a.isOn = true;
			var b = new Narrator($('.wrapper > .b'), 2045, 1585);
			var c = new Narrator($('.wrapper > .c'), 1493, 1061);
			var d = new Narrator($('.wrapper > .d'), 1025, 517);
			var e = new Narrator($('.wrapper > .e'), 200, 0);

			var narrators = [a,b,c,d,e];
			return narrators;
		},

		reset: function(current) {}

	},

	/* SCENE nextmorning_5 */

	theft_6: {

		start: function(current) {

			//Deals with birds/castle z-index problem on fade from scene 5

			$('.theft-6').css('z-index', '3');
			setTimeout( function() {
				$('.theft-6').css('z-index', '');
			}, 1500 );

		},

		reset: function(current) {}

	},

	/* SCENE flee-9 */

	giant_7: {

		start: function(current) {},

		reset: function(current) {}

	},

	conversation1_8: {
		start: function(current) {
		},

		reset: function(current) {}
	},

	conversation2_9: {

		start: function(current) {
			$('.btn-next').show();
		},

		reset: function(current) {}

	},

	end_9: {

		start: function(current) {
			$('.btn-next').hide();
		},

		reset: function(current) {}
	}
};

$(document).ready(APP.init);