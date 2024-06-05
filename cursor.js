document.addEventListener('DOMContentLoaded', function() {
    // Don't do anything if on mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return;
    }

    const cursor = $('.cursor');
    const speed = 0.1;

    let defaultX = $(window).width() * 0.5, defaultY = $(window).height() * 0.8;
    let targetX = defaultX, targetY = defaultY;
    let posX = defaultX, posY = defaultY;
    let scale = 2;

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

        requestAnimationFrame(positionCursor);
    }

    positionCursor();
});
