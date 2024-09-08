const shinyElement = document.querySelector(".shiny");
// const shinyElement = null;

shinyElement.addEventListener("mouseenter", () => {
    shinyElement.classList.remove("mouse-leave");
});

shinyElement.addEventListener("mousemove", (e) => {
    const { x, y } = shinyElement.getBoundingClientRect();
    shinyElement.style.setProperty("--x", e.clientX - x);
    shinyElement.style.setProperty("--y", e.clientY - y);
    // if is near to an image dont show the shine
    if (e.target.tagName === "IMG") {
        shinyElement.classList.add("mouse-leave");
    }
    else {
        shinyElement.classList.remove("mouse-leave");
    }
    // ALSO IF HOVER ABOVE AN ELEMENT WITH THE ID = "TITLE
    if(e.target.tagName === "INPUT" || e.target.tagName === "BUTTON" || e.target.getAttribute("key") === "title" || e.target.tagName === "TEXTAREA") {
        shinyElement.style.setProperty("--scale-s", 1.5);
    }
    else {
        shinyElement.style.setProperty("--scale-s", 1);
    }
    
});

shinyElement.addEventListener("mouseleave", () => {
    shinyElement.classList.add("mouse-leave");
});