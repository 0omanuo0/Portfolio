const switchButton = document.getElementById("mode-switch");
const switchButton2 = document.getElementById("mode-switch2");

let is_dark = false;

function checkDarkMode() {
    // check localstorage
    if (localStorage.getItem('dark-mode')) {
        if (localStorage.getItem('dark-mode') === 'true') {
            document.documentElement.classList.add('dark');
            is_dark = true;
        } else {
            document.documentElement.classList.remove('dark');
            is_dark = false;
        }
        return;
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        is_dark = true;
    } else {
        document.documentElement.classList.remove('dark');
        is_dark = false;
    }
    
    // check darkmode
    colors = is_dark ? colorPaletteBlack : colorPaletteWhite;
    
}
checkDarkMode();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDarkMode);

function toggleDarkMode() {
    
    if(window.matchMedia('(max-width: 768px)').matches) {
        
        requestAnimationFrame((t) => animateBackground(t));
    }

    if (is_dark) {
        document.documentElement.classList.remove('dark');
        is_dark = false;
        localStorage.setItem('dark-mode', 'false');
    } else {
        document.documentElement.classList.add('dark');
        is_dark = true;
        localStorage.setItem('dark-mode', 'true');
    }
    
    // check darkmode
    colors = is_dark ? colorPaletteBlack : colorPaletteWhite;
}

switchButton2.addEventListener("click", toggleDarkMode);

switchButton.addEventListener("click", () => {
    if (is_dark) {
        window.location.reload(); // Esto recargará la página para aplicar el cambio de modo
    } else {
        toggleDarkMode();
    }
});