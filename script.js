$(document).ready(function() {
    var $highlight = $('.highlight');
    var $tooltip = $('.tooltip');
    var gap = 0
    var date = new Date();
    
    $tooltip.hide();
  
    $('.ascii > a').on({
        mouseenter: function() {
            $tooltip.show();
            date = new Date();
        },
        mouseleave: function() {
            $tooltip.hide();
        },
        mousemove: function(e) {
            $tooltip.css({
                left: e.pageX - $tooltip.outerWidth() - gap,
                top: e.pageY - $tooltip.outerHeight() - gap
            });
        }
    });

    $("body").on({
        mousemove: function(e) {
            $highlight.css({
                top: Math.trunc(e.pageY / $highlight.height()) * $highlight.height()
            });
        }
    });

    $(".tooltip > .time").each(function() {
        $(this).text(date.getHours() + ":" + ('0' + date.getMinutes()).slice(-2));
    });
  });

$(window).on("scroll", function() {
    var scroll_top = $(window).scrollTop();
    var doc_height = $(document).height();
    var win_height = $(window).height();
    
    var scroll_percent = (scroll_top / (doc_height - win_height)) * 100;
    
    $(".scrollbar > span").css("top", scroll_percent + "%");

    if (scroll_percent <= 0.1 || scroll_percent >= 99.9) {
        $(".scrollbar > span").css("color", "var(--rose-600)");
    } else {
        $(".scrollbar > span").css("color", "var(--true-gray-400)");
    }
});

$(function () {
    const $sections = $("section");
    const $navItems = $("nav a");

    function show_section(id) {
        $sections.removeClass("active");
        $("#" + id).addClass("active");
        $navItems.removeClass("active");
        $navItems.filter(function () {
            return $(this).text().trim().toLowerCase() === id;
        }).addClass("active");
    }

    $navItems.on("click", function () {
        show_section($(this).text().trim().toLowerCase());
    });

    show_section("about");
});
