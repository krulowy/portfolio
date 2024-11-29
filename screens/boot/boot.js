document.addEventListener('DOMContentLoaded', function() {
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const loadingScreen = document.getElementById('loading-screen');
    const portfolio = document.getElementById('portfolio');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');

const bootMessages = [
        'QBIOS (C) 2002 N0STALGIA Solutions',
        '',
        'BIOS Build Date: 22-Dec-2002 21:43:29 Version: 09.01.17',
        'Processor: Intel® Pentium 4 @ 2.8 GHz',
        'Frequency: 2.8 GHz',
        '',
        'This BIOS is distributed under the GNU General Public License.',
        '',
        'Memory Clock Speed: 63 MHz, Tcl:7 Trcd: 4 Trp:8 Tras:20 (32-bit Mode)',
        'RAM Test: 25200 KB Passed',
        '',
        'PMU Firmware Version: 9303',
        'NVMM Firmware Version: 4.093.12',
        'USB Controllers Initializing... Completed.',
        'Detected Memory: 1024 MB OK',
        '',
        'Connected USB Devices: 1 Keyboard, 1 Mouse, 1 Hub, 1 Storage Unit',
        'Scanning for USB Mass Storage Devices...',
        'Device 01: USB 2.0 Flash Drive *High-Speed*',
        '1 USB mass storage device configured successfully.',
        '',
        '(C) 2002 N0STALGIA Solutions',
        '64-0100-10000-001022222-120212-93030-2BR1W004-X3WD',
        'Starting Boot Sequence from Hard Drive...',
        '',
        'C:> N0STALGIA ®',
        '',
    ];

    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeText(text) {
        let currentText = bootText.textContent;
        for (let i = 0; i <= text.length; i++) {
            bootText.textContent = currentText + text.slice(0, i) + (i < text.length ? '█' : '');
            await sleep(1); // Adjust delay for desired speed
        }
        bootText.textContent += '\n';
    }
    async function typeMemoryTest() {
        let currentText = bootText.textContent;
        bootText.textContent = currentText + 'RAM Test: ';
        for (let i = 0; i <= 25200; i += 100) {
            bootText.textContent = currentText + 'RAM Test: ' + i + 'K█';
            await sleep(1); // Adjust delay for desired speed
        }
        bootText.textContent = currentText + 'RAM Test: 25200K Passed\n';
    }
    async function toggleFullScreen() {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        } else {
            await document.exitFullscreen();
        }
    }
    
    async function promptFullscreen() {
        bootText.textContent += '\nEnter FULLSCREEN mode? (Y/N)';
        
        return new Promise((resolve) => {
            document.addEventListener('keypress', async function handleKey(e) {
                const key = e.key.toLowerCase();
                if (key === 'y') {
                    document.removeEventListener('keypress', handleKey);
                    await toggleFullScreen();
                    bootText.textContent += '\nEntering fullscreen mode...';
                    await sleep(1000);
                    resolve(true);
                } else if (key === 'n') {
                    document.removeEventListener('keypress', handleKey);
                    bootText.textContent += '\nContinuing in windowed mode...';
                    await sleep(1000);
                    resolve(false);
                }
            });
        });
    }
    async function bootSequence() {
        // Type out each message
        document.body.classList.add('boot-active'); // Add at start of bootSequence()
        for (const message of bootMessages) {
            if (message.startsWith('RAM Test:')) {
                await typeMemoryTest();
            } else {
                await typeText(message);
            }
            await sleep(100); // Reduced delay between messages
        }
        await promptFullscreen();
    // Transition to loading screen
    window.location.href = '../loading/index.html';
    }
    bootSequence();
});
