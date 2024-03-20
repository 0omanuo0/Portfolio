const switchButton = document.getElementById("mode-switch");
const switchButton2 = document.getElementById("mode-switch2");

let is_dark = false;

function checkDarkMode() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      is_dark = true;
    } else {
      document.documentElement.classList.remove('dark');
      is_dark = false;
    }
  }
checkDarkMode();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDarkMode);

function toggleDarkMode() {
  if (is_dark) {
    document.documentElement.classList.remove('dark');
    is_dark = false;
  } else {
    document.documentElement.classList.add('dark');
    is_dark = true;
  }
}

switchButton2.addEventListener("click", toggleDarkMode);

switchButton.addEventListener("click", () => {
  if (is_dark) {
    window.location.reload(); // Esto recargará la página para aplicar el cambio de modo
  } else {
    toggleDarkMode();
  }
});