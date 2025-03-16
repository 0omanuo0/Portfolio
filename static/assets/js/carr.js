const left = document.getElementById("left");
const right = document.getElementById("right");
const panel = document.getElementById("panel_carrousel");


function carr(direction = 0) {
    if(carr == null) return;

    // console.log(direction);
    if (direction > 0 && pos < cards) pos++;
    else if (direction < 0 && pos > 1) pos--;
    // console.log(pos);

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


if (panel) {
    panel.addEventListener('touchstart', (e) => {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let isHorizontal = false;
        let scrolledAmount = 1;

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        panel.addEventListener('touchend', (e) => {
            reset();
        });
        panel.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
            endY = e.touches[0].clientY;

            const deltaX = endX - startX;
            const deltaY = endY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                isHorizontal = true;
                e.preventDefault(); // Bloquea el scroll vertical
                if (scrolledAmount > 3) reset();
                if (deltaX > 100 * scrolledAmount) {
                    carr(-1);
                    scrolledAmount++;
                } else if (deltaX < -100 * scrolledAmount) {
                    carr(1);
                    scrolledAmount++;
                }
            }
        });
        const reset = () => {
            startX = 0;
            startY = 0;
            endX = 0;
            endY = 0;
            isHorizontal = false;
            scrolledAmount = 1;

            panel.removeEventListener('touchend', null);
            panel.removeEventListener('touchmove', null);
        }
    });
}
