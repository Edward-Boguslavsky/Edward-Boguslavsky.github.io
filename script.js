$(document).ready(function() {
	$(".header-logo").load("icons/icon-logo.svg");
	$('.dropdown').append($('<div class="dropdown-icon"></div>').load("icons/icon-menu.svg"));
	$(".title-icon").load("icons/icon-head.svg");
	$(".footer-logo").load("icons/icon-logo.svg");
	$('.scroll-top').append($('<div class="scroll-top-icon"></div>').load("icons/icon-arrow-up.svg"));
	
	$(':root').css('--content-skew-height', calc_skew_height());
			
	load_page()
	$(window).on('hashchange', function() {		
		load_page()
	});
});

$(document).scroll(function() {
	if ($('body').scrollTop() > 0) {
		$('.header').css('background', 'rgba(0, 0, 0, 0.3)');
		$('.dropdown-content').css('background-color', 'rgba(0, 0, 0, 0.3)');
	}
	else {
		$('.header').css('background', '');
		$('.dropdown-content').css('background-color', '');
	}
});

function toggle_dark_mode(obj) {
	if($(obj).is(":checked")){
		$(':root').css({'--text-black': '#f0f2f4',
						'--text-white': '#f0f2f4',
						'--text-color-light': 'rgba(192, 172, 255, 0.7)',
						'--text-color-dark': 'rgba(240, 235, 255, 0.8)',
						'--text-color-extra-dark': 'rgba(238, 224, 244, 0.9)',
						'--background-white': '#090510',
						'--background-extra-light': '#12091e',
						'--background-light-gray': '#26405e',
						'--background-gray': '#335b88'});
		$('a.link-page').css('background-image', 'url(icons/icon-link-dark.png)');
	} else {
		$(':root').css({'--text-black': '',
						'--text-white': '',
						'--text-color-light': '',
						'--text-color-dark': '',
						'--text-color-extra-dark': '',
						'--background-white': '',
						'--background-extra-light': '',
						'--background-light-gray': '',
						'--background-gray': ''});
		$('a.link-page').css('background-image', 'url(icons/icon-link.png)');
	}
}

function calc_skew_height() {
	if (window.navigator.userAgent.indexOf("Edge") > -1) {	// If browser is Edge
		$(':root').css('--content-skew', '0deg');
		return '0deg';
	}
	var str_skew_deg = $(':root').css('--content-skew');
	var int_skew_deg = parseInt(str_skew_deg);
	int_skew_deg = Math.ceil(50.0 * Math.tan(int_skew_deg * Math.PI / 180));
	return int_skew_deg + 'vw';
}

function load_page() {
	$('.content').css('min-height', '0');
	switch(window.location.hash) {
		case '#gallery':
			$('title').html('Edward Boguslavsky - Gallery');
			$(".content").load("pages/gallery.html", function() {
				load_gallery();
				$(".thumbnail").load("icons/icon-zoom-in.svg");
				scroll_content();
			});
			break;
		case '#links':
			$('title').html('Edward Boguslavsky - Links');
			$(".content").load("pages/links.html", function() { scroll_content() });
			break;
		case '#about':
			$('title').html('Edward Boguslavsky - About');
			$(".content").load("pages/about.html", function() {
				$(".content-tile-icon.book").load("icons/icon-book.svg");
				$(".content-tile-icon.mail").load("icons/icon-mail.svg");
				scroll_content()
			});
			break;
		case '#eportfolio':
			$('title').html('Edward Boguslavsky - ePortfolio');
			$(".content").load("pages/eportfolio.html", function() { scroll_content() });
			break;
		default:
			$('title').html('Edward Boguslavsky - Home');
			$(".content").load("pages/home.html", function() {
				$(".content-tile-icon.camera").load("icons/icon-camera.svg");
				$(".content-tile-icon.project").load("icons/icon-project.svg");
				$(".content-tile-icon.about").load("icons/icon-about.svg");
			});
	}
}

function scroll_content() {
	$('.content').css('min-height', $('.content').height());
	$(window).scrollTop($('.content').offset().top - $('.header').height());
}

function load_gallery() {
	for (var i = 0; i < 12; i++)
		$('.thumbnail-wrapper.digital').append('<div class="thumbnail" style="background-image: url(images/gallery/th-' + i + '.jpg)"></div>');
	for (var i = 0; i < 3; i++)
		$('.thumbnail-wrapper.traditional').append('<div class="thumbnail" style="background-image: url(images/gallery/tr-' + i + '.png)"></div>');
}

$(document).on('click', '.thumbnail', function() {
    $('.modal-image').css('background-image', $(this).css('background-image').replace('th-', ''));
	$('.modal').css('display', 'flex');
	$('.header').css('display', 'none');
});

$(document).on('click', '.modal-close', function() {
	$('.modal').css('display', '');
	$('.header').css('display', '');
});

$(document).on('click', '.scroll-top', function() {
	window.scrollTo(0, 0);
});

$(document).click(function(e) {
    e.stopPropagation();
	if ($('.dropdown').has(e.target).length) {
		$('.dropdown').css('background-color', 'rgba(0, 0, 0, 0.3)');
		$('.dropdown-content > *').css('height', '42px');
	}
	else {
		$('.dropdown').css('background-color', '');
		$('.dropdown-content > *').css('height', '');
	}
});