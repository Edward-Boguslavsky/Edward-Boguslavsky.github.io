const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

document.addEventListener('DOMContentLoaded', function() {

    // Reload the page on back button press
    $(window).on('pageshow', function(event) {
        if (event.originalEvent.persisted) {
            window.location.reload();
        }
    });

    const cursor = $('.cursor');
    const speed = 0.1;

    let defaultX = $(window).width() * 0.5, defaultY = $(window).height() * 0.8;
    let targetX = defaultX, targetY = defaultY;
    let posX = defaultX, posY = defaultY;
    let scale = 2;
    let animationFrame;

    if (!isMobile) {
        // Set the target to the cursor when the cursor moves
        $(document).on("mousemove", function(event) {
            targetX = event.pageX;
            targetY = event.pageY;
            scale = 1;
        });
        
        // Set the target to the default when the cursor leaves
        $(document).on("mouseleave", function() {
            targetX = defaultX;
            targetY = defaultY;
            scale = 2;
        });

        // Recalculate the default when the window is resized
        $(window).on("resize", function() {
            defaultX = $(window).width() * 0.5;
            defaultY = $(window).height() * 0.8;
            targetX = defaultX;
            targetY = defaultY;
            posX = defaultX;
            posY = defaultY;
        });

        // Move the cursor towards the target
        function positionCursor() {
            posX += (targetX - posX) * speed;
            posY += (targetY - posY) * speed;

            cursor.css({
                left: posX + 'px',
                top: posY + 'px',
                transform: 'translate(-50%, -50%) scale(' + scale + ')'
            });

            animationFrame = requestAnimationFrame(positionCursor);
        }

        positionCursor();
    }

    // Smoothly transition the button into the portfolio page
    function transitionCursor() {
        cancelAnimationFrame(animationFrame);

        const size = Math.max($(window).width(), $(window).height());

        cursor.animate({
            width: size * 3 + 'px',
            height: size * 3 + 'px',
            fontSize: size + 'px'
        }, 1000, 'swing');

        cursor.css({
            background: 'var(--true-gray-900)',
            color: 'transparent'
        });
        
        setTimeout(function() {
            window.location.href = 'https://github.com/Edward-Boguslavsky';
        }, 1000);
    }

    // Use the cursor as the transition trigger on mobile and the window as the transition trigger on desktop
    if (isMobile) {
        cursor.on("click", transitionCursor);
    }
    else {
        $(window).on("click", transitionCursor);
    }
});
