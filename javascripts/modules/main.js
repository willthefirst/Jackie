var APP = {

	init: function() {
		APP.clickOrTouch();
		APP.paginate.init();
	},

	events: {
		down: 'mousedown',
		up: 'mouseup'
	},

	clickOrTouch: function() {
		var UA = navigator.userAgent;
		if (UA.indexOf("iPad") != -1) {
			APP.events.down = 'touchstart';
			APP.events.up = 'touchend';
		}
	},

	/* GENERAL Page turning and transitions */

	paginate: {

		$current: $(),
		$next: $(),
		$previous: $(),

		init: function() {

			var page = APP.paginate;
			var down = APP.events.down;
			var up = APP.events.up;
			page.newPage($('.current'));

			$('.btn-next,.btn-previous').on(down, function() {
				$(this).addClass('pressed');
			});
			$('.btn-next').on(up, page.stepForward);
			$('.btn-previous').on(up, page.stepBack);
		},

		newPage: function(current) {
			var page = APP.paginate;
			page.$current = current;

			/* Start scene-specific JS */
			var scene = page.$current.attr('class').split(' ')[0].replace("-", "_").toString();
			APP[scene].start(page.$current);

			page.$next     = page.$current.next();
			page.$previous = page.$current.prev();

			page.$next.find('.get').toggleClass('get got');
		},

		stepForward: function() {

			$('.btn-next').removeClass('pressed');

			var page = APP.paginate;

			var a = page.$current;

			/* Reset scene-specific JS */
			var scene = page.$current.attr('class').split(' ')[0].replace("-", "_").toString();
			APP[scene].reset(a);

			page.$previous.toggleClass('previous hidden');
			page.$next.toggleClass('current hidden');

			window.setTimeout(function() {
				a.toggleClass('previous current');
			}, 1500);
			
			page.newPage(page.$next);
		},

		stepBack: function() {

			$('.btn-previous').removeClass('pressed');

			var page = APP.paginate;
			var a = page.$current;

			/* Reset scene-specific JS */
			var scene = page.$current.attr('class').split(' ')[0].replace("-", "_").toString();
			APP[scene].reset(a);

			a.css('opacity','0');
			page.$previous.toggleClass('current previous');
			page.$previous.prev().toggleClass('hidden previous');

			window.setTimeout(function() {
				a.toggleClass('current hidden').css('opacity','');
			}, 1500);

			page.newPage(page.$previous);
		}
	},

	handleClick: function(button, flyer) {
		var down = APP.events.down;

		button.on(down, function() {
			flyer.addClass('fly');
			button.off(down);
			setTimeout(function() {
				flyer.removeClass('fly');
				APP.handleClick(button, flyer);
			}, 1800);
		});
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

		$next_temp: $('.btn-next-temp'),
		$btn_next: $('.btn-next'),

		start: function(current) {
			$('.btn-previous').show();

			var down = APP.events.down;
			var up = APP.events.up;

			this.$next_temp.show();
			this.$btn_next.hide();

			this.$next_temp.on(down, function() {
				$(this).addClass('pressed');
			});

			this.$next_temp.on(up, this.houseFall);
		},

		houseFall: function() {
			APP.exposition_2.$next_temp.removeClass('pressed');
			$('.exposition-2').addClass('next');
			APP.exposition_2.$btn_next.show();
			APP.exposition_2.$next_temp.hide();
		},

		reset: function(current) {
			this.$next_temp.hide();
			this.$btn_next.show();

			setTimeout(function() {
				$('.exposition-2').removeClass('next');
			}, 1400);
		}
	},

	/* SCENE cowsale_3 */

	cowsale_3: {

		start: function(current) {
			$button = $('.js_beans');
			$beans = $('.beans');

			APP.handleClick($button , $beans);
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

		$scene: $('.beanstalk-5'),
		$next_temp: $('.btn-next-temp'),
		$previous_temp: $('.btn-previous-temp'),

		start: function(current) {
			var down = APP.events.down;
			var up = APP.events.up;

			this.pollForScroll();
			this.$next_temp.show();

			this.$next_temp.on(down, function() {
				$(this).addClass('pressed');
			});

			this.$previous_temp.on(down, function() {
				$(this).addClass('pressed');
			});

			this.$next_temp.on(up, this.sendToTop);
			this.$previous_temp.on(up, this.sendToBottom);
		},

		sendToTop: function() {
			APP.beanstalk_5.$next_temp.removeClass('pressed');

			APP.beanstalk_5.$scene.animate({
				scrollTop: 0
			}, 4000);
		},

		sendToBottom: function() {
			APP.beanstalk_5.$previous_temp.removeClass('pressed');

			APP.beanstalk_5.$scene.animate({
				scrollTop: 2464
			}, 4000);
		},

		pollForScroll: function() {
			var narrators = this.narrators();
			APP.beanstalk_5.$scene.scrollTop(2464);

			var oldScroll = 0;

			var didScroll = function() {
				x = false;

				if (APP.beanstalk_5.$scene.scrollTop() !== oldScroll) {
					oldScroll = APP.beanstalk_5.$scene.scrollTop();
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
			var Narrator = function(type, selector, bottom, top) {
				this.type = type;
				this.selector = selector;
				this.top = top;
				this.bottom = bottom;
				this.isOn = false;

				if (type === "animation") {
					this.on = function() {
						selector.addClass('go');
						selector.removeClass('stop');
						this.isOn = true;
					};

					this.off = function() {
						selector.addClass('stop');
						selector.removeClass('go');
						this.isOn = false;
					};
				}

				else if (type === "button") {
					this.on = function() {
						selector.show();
						this.isOn = true;
					};

					this.off = function() {
						selector.hide();
						this.isOn = false;
					};
				}

				else {
					this.on = function() {
						selector.addClass('on');
						selector.removeClass('off');
						this.isOn = true;
					};

					this.off = function() {
						selector.addClass('off');
						selector.removeClass('on');
						this.isOn = false;
					};
				}
			};

			var a = new Narrator('text', $('.wrapper > .a'), 2465, 2393);
			a.isOn = true;
			var b = new Narrator('text', $('.wrapper > .b'), 2045, 1585);
			var c = new Narrator('text', $('.wrapper > .c'), 1493, 1061);
			var d = new Narrator('text', $('.wrapper > .d'), 1025, 517);
			var e = new Narrator('text', $('.wrapper > .e'), 200, -1);
			var f = new Narrator('button', $('.btn-next-temp'), 2465, 200);
			var g = new Narrator('button', $('.btn-previous-temp'), 200, -1);
			var h = new Narrator('animation', $('.bottom'), 2384, 549);
			var i = new Narrator('animation', $('.middle'), 2285, 525);
			var j = new Narrator('animation', $('.top'), 1650, 70);
			var k = new Narrator('animation', $('.top2'), 1650, 70);
			var l = new Narrator('animation', $('.up-arrow'), 2465, 1500);
			var m = new Narrator('animation', $('.castleclouds'), 249, -1);
			var n = new Narrator('button', $('.btn-next'), 200, -1);
			n.isOn = true;
			var o = new Narrator('button', $('.btn-previous'), 2465, 200);
			var birds = new Narrator('animation', $('.birds'), 249, -1);

			var narrators = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,birds];
			return narrators;
		},

		reset: function(current) {
			APP.beanstalk_5.$next_temp.hide();
			APP.beanstalk_5.$previous_temp.hide();
			$('.btn-next').show();
			$('.btn-previous').show();
			console.log('bam');
		}
	},

	/* SCENE nextmorning_5 */

	theft_6: {

		start: function(current) {

			//Deals with birds/castle z-index problem on fade from scene 5

			$('.theft-6').css('z-index', '2');
			setTimeout( function() {
				$('.theft-6').css('z-index', '');
			}, 1500 );

			$button_coins = $('.js_coins');
			$button_gooseandegg = $('.js_gooseandegg');
			$button_harp = $('.js_harp');
			$coins = $('.coins');
			$goose = $('.goose, .egg');
			$harp = $('.harp');
			APP.handleClick( $button_coins, $coins );
			APP.handleClick( $button_gooseandegg, $goose );
			APP.handleClick( $button_harp, $harp );

		},

		reset: function(current) {}

	},

	/* SCENE giant-7 */

	giant_7: {

		goToNext: function() {
			var up = APP.events.up;
			
			this.timeoutID = window.setTimeout( function() {
				$('.btn-next').trigger(up);
			}, 10000);
		},
		
		start: function(current) {
			this.goToNext();
		},

		reset: function(current) {
			window.clearTimeout(this.timeoutID);
		}
	},

	conversation1_8: {
		start: function(current) {
		},

		reset: function(current) {}
	},

	conversation2_9: {

		start: function(current) {
		},

		reset: function(current) {}

	},

	recap_9: {

		start: function(current) {
			$('.btn-next').show();
		},

		reset: function(current) {}
	},


	end_10: {

		start: function(current) {
			$('.btn-next').hide();
		},

		reset: function(current) {}
	}
};

$(document).ready(APP.init);