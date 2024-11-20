const TITLES = [
    "Software Engineer",
    "Machine Learning Engineer", 
    "Web Developer"
];

const TYPE_INTERVAL = 100;
const ERASE_INTERVAL = 50;
const BLINK_INTERVAL = 500;
const IDLE_INTERVAL = 3000;

function animateTitles() {
    let titleIndex = 0;

    // Type out each title
    function typeTitle(title) {
        return new Promise((resolve) => {
            let len = 0;
            
            // Repeat until text is fully written
            const typing = setInterval(() => {

                if (len < title.length) {
                    // Add next character to the title
                    $('h1').text(title.slice(0, len + 1));
                    len++;
                } else {
                    // Finish animation
                    clearInterval(typing);
                    resolve();
                }

            }, TYPE_INTERVAL);
        });
    }

    // Erase each title
    function eraseTitle(title) {
        return new Promise((resolve) => {
            let len = title.length;
            
            // Repeat until text is empty
            const erasing = setInterval(() => {

                if (len > 0) {
                    // Remove next character from the title
                    $('h1').text(title.slice(0, len - 1));
                    len--;
                } else {
                    // Finish animation
                    clearInterval(erasing);
                    $('h1').text('');
                    resolve();
                }

            }, ERASE_INTERVAL);
        });
    }

    // Make underscore blink when idle
    function blinkUnderscore(title) {
        return new Promise((resolve) => {

            // Blink the pseudo-element by toggling opacity
            const blinking = setInterval(() => {
                $('h1').css('--underscore-opacity', $('h1').css('--underscore-opacity') === '0' ? '1' : '0');
            }, BLINK_INTERVAL);
            
            // Finish animation
            setTimeout(() => {
                clearInterval(blinking);
                $('h1').css('--underscore-opacity', '1');
                resolve();
            }, IDLE_INTERVAL);

        });
    }

    // Cycle through each title
    async function cycleTitle() {

        // Loop animation infinitely
        while (true) {
            const currentTitle = TITLES[titleIndex];
            
            await typeTitle(currentTitle);
            await blinkUnderscore(currentTitle);
            await eraseTitle(currentTitle);
            
            titleIndex = (titleIndex + 1) % TITLES.length;
        }
        
    }

    cycleTitle();
}

$(document).ready(animateTitles);