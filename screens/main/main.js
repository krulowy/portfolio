document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.menu-option');
    let selectedIndex = 0;

    updateSelection();

    options.forEach((option, index) => {
        option.addEventListener('mouseover', () => {
            selectedIndex = index;
            updateSelection();
        });

        option.addEventListener('click', () => {
            handleSelection(option.dataset.option);
        });
    });

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = Math.max(0, selectedIndex - 1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = Math.min(options.length - 1, selectedIndex + 1);
                break;
            case 'Enter':
                const selected = options[selectedIndex].dataset.option;
                handleSelection(selected);
                break;
            case '1':
                handleSelection('retro');
                selectedIndex = 0;
                break;
            case '2':
                handleSelection('modern');
                selectedIndex = 1;
                break;
        }
        updateSelection();
    });

    function updateSelection() {
        options.forEach((option, index) => {
            option.classList.toggle('selected', index === selectedIndex);
        });
        if (options[selectedIndex].dataset.option === 'modern') {
            document.body.classList.add('modern');
            document.body.classList.remove('crt');
        } else {
            document.body.classList.add('crt');
            document.body.classList.remove('modern');
        }
    }

    function handleSelection(option) {
        console.log(`Selected: ${option}`);
        setTimeout(() => {
            window.location.href = `../desktop/index.html?theme=${option}`;
        }, 500);
    }
});