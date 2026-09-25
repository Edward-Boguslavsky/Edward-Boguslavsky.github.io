$(document).ready(function() {
    var $follower = $('.tooltip');
    var gap = 0
    var date = new Date();
    
    $follower.hide();
  
    $('.ascii > a').on({
      mouseenter: function() {
        $follower.show();
        date = new Date();
      },
      mouseleave: function() {
        $follower.hide();
      },
      mousemove: function(e) {
        $follower.css({
          left: e.pageX - $follower.outerWidth() - gap,
          top: e.pageY - $follower.outerHeight() - gap
        });
      }
    });


    $(".tooltip > .time").each(function() {
        $(this).text(date.getHours() + ":" + ('0' + date.getMinutes()).slice(-2));
    });
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
