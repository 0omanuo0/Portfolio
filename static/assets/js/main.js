

function main() {
    let shinyElement = document.querySelector(".shiny");
    shinyElement = null;

    if (!shinyElement) return;

    shinyElement.addEventListener("mouseenter", () => {
        // if is mobile or prefers-reduced-motion is enabled, don't update the position
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-width: 768px)").matches) {
            return;
        }


        // set variable --transition-speed to 0.1s
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            shinyElement.style.setProperty("--transition-speed", "0.1s");
        }

        shinyElement.classList.remove("mouse-leave");
    });

    const updateShinePosition = (e) => {
        const { x, y } = shinyElement.getBoundingClientRect();
        shinyElement.style.setProperty("--x", e.clientX - x);
        shinyElement.style.setProperty("--y", e.clientY - y);

        // Si el cursor está sobre una imagen, esconder el brillo
        if (e.target.tagName === "IMG") {
            shinyElement.classList.add("mouse-leave");
        }
        else {
            shinyElement.classList.remove("mouse-leave");
        }

        // Si el cursor está sobre un INPUT, BUTTON, o un elemento con id "title", aumentar el brillo
        if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON" || e.target.getAttribute("key") === "title" || e.target.tagName === "TEXTAREA") {
            shinyElement.style.setProperty("--scale-s", 1.5);
        }
        else {
            shinyElement.style.setProperty("--scale-s", 1);
        }
    };
    // Listener para el movimiento del ratón
    shinyElement.addEventListener("mousemove", (e) => {
        // if prefers-reduced-motion is enabled, don't update the position
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        updateShinePosition(e);
    });

    shinyElement.addEventListener("mouseleave", () => {
        shinyElement.classList.add("mouse-leave");
    });
}

main();