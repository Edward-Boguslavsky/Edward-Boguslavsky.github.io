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
