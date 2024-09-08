const shinyElement = document.querySelector(".shiny");
// const shinyElement = null;

shinyElement.addEventListener("mouseenter", () => {
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