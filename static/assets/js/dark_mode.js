
const switchButton = document.getElementById("mode-switch");
const switchButton2 = document.getElementById("mode-switch2");

var is_dark = false;

switchButton2.addEventListener("click", () => {
    if(is_dark==true) {
        window.location.href = document.location.href;
        }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        is_dark = true;
        } 
});

switchButton.addEventListener("click", () => {
    if(is_dark==true) {
        window.location.href = document.location.href;
        }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        is_dark = true;
        } 
});