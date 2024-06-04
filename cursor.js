$(document).ready(function() {
    const cursor = $('.cursor');
    const speed = 0.1;

    let defaultX = $(window).width() * 0.5, defaultY = $(window).height() * 0.85;
    let targetX = defaultX, targetY = defaultY;
    let posX = defaultX, posY = defaultY;
    let scale = 2;

    $(document).on("mousemove", function(event) {
        targetX = event.pageX;
        targetY = event.pageY;
        scale = 1;
    });
    
    $(document).on("mouseleave", function() {
        targetX = defaultX;
        targetY = defaultY;
        scale = 2;
    });

    $(window).on("resize", function() {
        defaultX = $(window).width() * 0.5;
        defaultY = $(window).height() * 0.85;
        targetX = defaultX;
        targetY = defaultY;
        posX = defaultX;
        posY = defaultY;
    });

    function calcPosXY() {
        posX += (targetX - posX) * speed;
        posY += (targetY - posY) * speed;

        cursor.css({
            left: posX + 'px',
            top: posY + 'px',
            transform: 'translate(-50%, -50%) scale(' + scale + ')'
        });

        requestAnimationFrame(calcPosXY);
    }

    calcPosXY();
});
