const TITLES = [
    "Software Engineer",
    "Machine Learning Engineer", 
    "Web Developer"
];

function animateTitles() {
    let currentIndex = 0;

    function typeTitle(title) {
        return new Promise((resolve) => {
            let currentLength = 0;
            
            const typing = setInterval(() => {
                if (currentLength < title.length) {
                    $('h1').text(title.slice(0, currentLength + 1));
                    currentLength++;
                } else {
                    clearInterval(typing);
                    resolve();
                }
            }, 100);
        });
    }

    function deleteTitle(title) {
        return new Promise((resolve) => {
            let currentLength = title.length;
            
            const deleting = setInterval(() => {
                if (currentLength > 0) {
                    $('h1').text(title.slice(0, currentLength - 1));
                    currentLength--;
                } else {
                    clearInterval(deleting);
                    $('h1').text('');
                    resolve();
                }
            }, 100);
        });
    }

    function blinkUnderscore(title) {
        return new Promise((resolve) => {
            // Blink the pseudo-element by toggling opacity
            const blinking = setInterval(() => {
                $('h1').css('--underscore-opacity', $('h1').css('--underscore-opacity') === '0' ? '1' : '0');
            }, 500);
            
            // Stop blinking after 3 seconds
            setTimeout(() => {
                clearInterval(blinking);
                $('h1').css('--underscore-opacity', '1');
                resolve();
            }, 3000);
        });
    }

    async function cycleTitle() {
        while (true) {
            const currentTitle = TITLES[currentIndex];
            
            await typeTitle(currentTitle);
            await blinkUnderscore(currentTitle);
            await deleteTitle(currentTitle);
            
            currentIndex = (currentIndex + 1) % TITLES.length;
        }
    }

    cycleTitle();
}

$(document).ready(animateTitles);