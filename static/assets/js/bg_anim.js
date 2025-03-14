let angle = Math.pow(Math.random() * 1000, 2);

const precision = 1440; // Número de valores precalculados
const sinTable = new Array(precision);
const cosTable = new Array(precision);

// Precalcular los valores trigonométricos
for (let i = 0; i < precision; i++) {
    let radians = (i * Math.PI * 2) / precision;
    sinTable[i] = Math.sin(radians);
    cosTable[i] = Math.cos(radians);
}

// Función para obtener valores precalculados de sin/cos
function getSin(angle) {
    return sinTable[Math.floor(angle % precision)];
}

function getCos(angle) {
    return cosTable[Math.floor(angle % precision)];
}

let lastUpdate = 0;
const defaultUpdateInterval = 1; // Frecuencia de actualización de 60fps
let updateInterval = defaultUpdateInterval; // Reducir frecuencia de actualización a cada 30ms

let transitioning = false;

// Función para animar el fondo con parámetros de colores
function animateBackground(timestamp) {

    if (timestamp - lastUpdate < updateInterval || transitioning) {
        requestAnimationFrame((t) => animateBackground(t));
        return;
    }

    const deltaTime = timestamp - lastUpdate;

    lastUpdate = timestamp; // Actualizar el último tiempo de actualización

    // angle += 100; // Incrementar el ángulo de la animación

    angle += 100 + (deltaTime/2); // Ayudara a que la animación sea más suave cuando hay throttling

    // Obtener valores trigonométricos precalculados
    let sinA1 = getSin(angle * 0.02), cosA1 = getCos(angle * 0.005);
    let sinA2 = getSin(angle * 0.018), cosA2 = getCos(angle * 0.007);
    let sinA5 = getSin(angle * 0.012), cosA5 = getCos(angle * 0.02);

    // Cálculo de posiciones del gradiente
    let x1 = 50 + sinA1 * 50 + cosA1 * 30;
    let y1 = 50 + cosA2 * 50 + sinA2 * 20;

    let rotation = 127.43 + sinA5 * 20 + cosA5 * 10;

    // round values
    x1 = Math.round(x1);
    y1 = Math.round(y1);
    rotation = Math.round(rotation);

    // Aplicar los gradientes usando los colores pasados como parámetro
    bg.style.setProperty("--x1", `${x1}%`);
    bg.style.setProperty("--y1", `${y1}%`);
    bg.style.setProperty("--rotation", `${rotation}deg`);
    bg.style.setProperty("--color1", colors[0]);
    bg.style.setProperty("--color2", colors[1]);
    bg.style.setProperty("--color3", colors[2]);
    bg.style.setProperty("--color4", colors[3]);


    // if is mobile return directly
    let is_mobile = window.matchMedia("(max-width: 768px)").matches;
    if (is_mobile) {
        return;
    }

    requestAnimationFrame((t) => animateBackground(t));
}

// Paleta de colores modo oscuro (tonos pastel)
const colorPaletteBlack = [
    "#A93300",
    "#005570",
    "#00D5C8",
    "#2200AA"
];



// #ffffff, #effffa, #e5ecf4, #c3bef7
const colorPaletteWhite = ["#c3bef7", "#ffffff", "#effffa", "#e5ecf4"];

let colors = null;


let bg = document.querySelector('#bg-gradient');

// Iniciar la animación con la paleta de colores al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // return
    bg = document.querySelector('#bg-gradient');
    // select color palette (check if dark mode is enabled)
    colors = is_dark ? colorPaletteBlack : colorPaletteWhite;
    requestAnimationFrame((t) => animateBackground(t));

    let resizeTimer;
    window.addEventListener("resize", () => {
        transitioning = true;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            transitioning = false;
        }, 400);
    });

    const throttle = 200;

    // if is firefox needs throttling to dont break the animation
    let is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (!is_firefox) throttle = 60;

    const carr = document.querySelector("#panel_carrousel");
    if (carr) {
        carr.addEventListener("transitionstart", () => { transitioning = true });
        carr.addEventListener("transitionend", () => { transitioning = false });
    }

    const cards = document.querySelectorAll(".project-card");
    if (cards) {
        cards.forEach(card => {
            card.addEventListener("mouseenter", () => { transitioning = true });
            card.addEventListener("mouseleave", () => { transitioning = false });
        });
    }

    // get after of .shiny element and when transitionstart set updateInterval to 1000
    let shinyElement = document.querySelector(".shiny");
    if (!shinyElement) return;
    shinyElement.addEventListener("transitionstart", () => { updateInterval = throttle });
    shinyElement.addEventListener("transitionend", () => { updateInterval = defaultUpdateInterval });
});
