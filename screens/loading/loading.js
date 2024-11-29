function simulateLoading() {
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingPercentage = document.querySelector('.loading-percentage');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                window.location.href = '../main/index.html';
            }, 1000);
        }
        loadingProgress.style.width = `${progress}%`;
        loadingPercentage.textContent = `${Math.floor(progress)}%`;
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    simulateLoading();

    // Toggle modern class on glitch animation iteration
    const glitchOverlay = document.querySelector('.glitch-overlay');
    const scanLines = document.querySelector('.scan-lines');
    glitchOverlay.addEventListener('animationiteration', () => {
        if (document.body.classList.contains('crt')) {
            document.body.classList.remove('crt');
            document.body.classList.add('modern');
            scanLines.style.display = 'none';
        } else {
            document.body.classList.remove('modern');
            document.body.classList.add('crt');
            scanLines.style.display = 'block';
        }
    });
});