const left = document.getElementById("left");
const right = document.getElementById("right");
const panel = document.getElementById("panel_carrousel");

var pos = 1;
var touched = false;


function carr(direction = 0) {
    console.log(direction);
    if(direction > 0 && pos < cards) pos++;
    else if(direction < 0 && pos > 1) pos--;
    console.log(pos);

    for (let i = 1; i <= cards; i++) {
        const element = document.getElementById(i.toString());
        if (i == pos) {
            element.classList.add("w-3/4");
            element.classList.add("lg:w-full");
            element.classList.remove("w-0");

            if (direction != 0) {
                element.addEventListener('transitionend', function () {
                    document.getElementById("p".concat(i.toString())).classList.remove('hidden');
                    touched = false;
                    element.removeEventListener('transitionend', null);
                    carr();
                });
            }
        }
        else {
            element.classList.remove("w-3/4");
            element.classList.remove("lg:w-full");
            element.classList.add("w-0");

            document.getElementById("p".concat(i.toString())).classList.add("hidden");
        }
    }
}

function getScreenWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}


panel.addEventListener("touchstart", (event) => {
    if (getScreenWidth() < 768) {
        let initialX = event.touches[0].clientX;
        let initialY = event.touches[0].clientY;
        document.addEventListener("touchend", (eventEnd) => {
            let currentX = eventEnd.changedTouches[0].clientX;
            let currentY = eventEnd.changedTouches[0].clientY;
            if (Math.abs(initialX - currentX) > Math.abs(initialY - currentY) && !touched) {
                if (initialX - currentX < 0) { carr(-1); }
                else if (initialX - currentX > 0) { carr(1); }
                touched = true;
            }
            document.removeEventListener("touchend", null);
        });
    }
});



