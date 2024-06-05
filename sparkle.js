$(document).ready(function() {
    const sparkleCount = 10;
    let titleRect = $('.title')[0].getBoundingClientRect();

    // Create a sparkle
    function createSparkle() {
        const sparkle = $('<img src="graphics/sparkle.svg" alt="Sparkle" class="sparkle">');
        $('.sparkles').append(sparkle);
        return sparkle;
    }

    // Randomly position the sparkly while avoiding the title
    function positionSparkle(sparkle) {
        let x, y;
        let sparkleSize = sparkle.height();

        do {
            x = Math.random() * (window.innerWidth - sparkleSize);
            y = Math.random() * (window.innerHeight - sparkleSize);
        } while (x + sparkleSize > titleRect.left && x < titleRect.right && y + sparkleSize > titleRect.top && y < titleRect.bottom);

        sparkle.css({ left: x + 'px', top: y + 'px' });
    }

    // Randomly show and hide the sparkle recursively
    function animateSparkle(sparkle) {

        // Fade the sparkle in
        function showSparkle() {
            sparkle.fadeIn(500, function() {
                setTimeout(hideSparkle, 1000 + Math.random() * 2000);
            });
        }

        // Fade the sparkle out and reposition it
        function hideSparkle() {
            sparkle.fadeOut(500, function() {
                positionSparkle(sparkle);
                setTimeout(showSparkle, 1000 + Math.random() * 2000);
            });
        }

        showSparkle();
    }

    // Recalculate the title rect on window resize
    $(window).on('resize', function() {
        titleRect = $('.title')[0].getBoundingClientRect();
    });

    // Run sparkle functionality
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = createSparkle();
        positionSparkle(sparkle);
        animateSparkle(sparkle);
    }
});