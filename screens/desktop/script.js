document.addEventListener('DOMContentLoaded', () => {
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split('&').forEach(param => {
            const [key, value] = param.split('=');
            params[key] = value;
        });
        return params;
    }

    const params = getQueryParams();
    if (params.theme === 'modern') {
        document.body.classList.add('modern');
        document.body.classList.remove('crt');
    } else {
        document.body.classList.add('crt');
        document.body.classList.remove('modern');
    }
    
    function updateDateTime() {
        const now = new Date();
        const dateTimeString = now.toLocaleString();
        document.querySelector('.datetime').textContent = dateTimeString;
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('modern');
        document.body.classList.toggle('crt');
    });

    let activeWindow = null;
    let initialX, initialY, initialMouseX, initialMouseY;
    
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const windowId = `${icon.dataset.window}-window`;
            const window = document.getElementById(windowId);
            
            if (!window.classList.contains('active')) {
                
                const maxX = document.documentElement.clientWidth - 400;
                const maxY = document.documentElement.clientHeight - 300;
                const randomX = Math.random() * maxX;
                const randomY = Math.random() * (maxY - 100);
                
                window.style.left = `${randomX}px`;
                window.style.top = `${randomY}px`;
                window.classList.add('active');
                
                updateTaskbar();
            }
            
            bringToFront(window);
        });
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const window = e.target.closest('.window');
            window.classList.remove('active');
            updateTaskbar();
        });
    });

    document.querySelectorAll('.window-header').forEach(header => {
        header.addEventListener('mousedown', startDragging);
    });

    function startDragging(e) {
        const window = e.target.closest('.window');
        bringToFront(window);
        
        activeWindow = window;
        initialX = window.offsetLeft;
        initialY = window.offsetTop;
        initialMouseX = e.clientX;
        initialMouseY = e.clientY;

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);
    }

    function drag(e) {
        if (!activeWindow) return;

        const deltaX = e.clientX - initialMouseX;
        const deltaY = e.clientY - initialMouseY;

        activeWindow.style.left = `${initialX + deltaX}px`;
        activeWindow.style.top = `${initialY + deltaY}px`;
    }

    function stopDragging() {
        activeWindow = null;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDragging);
    }

    function bringToFront(window) {
        const windows = document.querySelectorAll('.window');
        windows.forEach(w => w.style.zIndex = '1');
        window.style.zIndex = '2';
    }

    function updateTaskbar() {
        const taskbarItems = document.querySelector('.taskbar-items');
        taskbarItems.innerHTML = '';
        
        document.querySelectorAll('.window.active').forEach(window => {
            const title = window.querySelector('.window-header span').textContent;
            const button = document.createElement('button');
            button.textContent = title;
            button.addEventListener('click', () => {
                window.classList.toggle('minimized');
                bringToFront(window);
            });
            taskbarItems.appendChild(button);
        });
    }

    const volumeSlider = document.querySelector('.volume-slider');
        volumeSlider.addEventListener('input', (e) => {

        console.log(`Volume set to: ${e.target.value}`);
    });
});