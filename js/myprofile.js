(function ($) {
	"use strict"; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - 54)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 56
	});

	// Collapse Navbar
	var navbarCollapse = function () {
		if ($("#mainNav").offset().top > 100) {
			$("#mainNav").addClass("navbar-shrink");
		} else {
			$("#mainNav").removeClass("navbar-shrink");
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);

	// Hide navbar when modals trigger
	$('.portfolio-modal').on('show.bs.modal', function (e) {
		$(".navbar").addClass("d-none");
	})
	$('.portfolio-modal').on('hidden.bs.modal', function (e) {
		$(".navbar").removeClass("d-none");
	})

	// Skills colapse details
	$("[data-toggle='collapse']").click(function (e) {
		var $this = $(this);
		var $icon = $this.find("i[class*='-circle']");
		if ($icon.hasClass('fa-minus-circle')) {
			$icon.removeClass('fa-minus-circle').addClass('fa-plus-circle');
		} else {
			$icon.removeClass('fa-plus-circle').addClass('fa-minus-circle');
		}
	});

	window.toggleAllSkills = function (element) {
		//- $("[data-toggle='collapse']").click();
		var $this = $(element);
		var $icon = $this.find("i[class*='-circle']");

		var p = $icon.hasClass('fa-minus-circle') ? "hide" : "show";
		$("#collapseBackend,#collapseFrontend,#collapseDB,#collapseDesktop,#collapseMobile,#collapseAWS,#collapseDeploy,#collapseSec,#collapseOther").collapse(p);
		if (p === "show") {
			$("#skills").find("small i[class*='-circle']").removeClass('fa-plus-circle').addClass('fa-minus-circle');
		} else {
			$("#skills").find("small i[class*='-circle']").removeClass('fa-minus-circle').addClass('fa-plus-circle');
		}
	}

	window.onbeforeprint = function () {
		window.toggleAllSkills();
	};

})(jQuery); // End of use strict
