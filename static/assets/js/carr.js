const left = document.getElementById("left");
const right = document.getElementById("right");
const panel = document.getElementById("panel_carrousel");

var pos = 1;
var touched = false;

function carr (){
    for(let i = 1; i <= cards; i++){
        if(i == pos){
            document.getElementById(i.toString()).classList.add("w-3/4");
            document.getElementById(i.toString()).classList.add("lg:w-full");
            document.getElementById(i.toString()).classList.remove("w-0");

            document.getElementById(i.toString()).addEventListener('transitionend', function() {
                document.getElementById("p".concat(i.toString())).classList.remove('hidden');
                touched = false;
                carr();
            });
        }
        else{
            document.getElementById(i.toString()).classList.remove("w-3/4");
            document.getElementById(i.toString()).classList.remove("lg:w-full");
            document.getElementById(i.toString()).classList.add("w-0");

            document.getElementById("p".concat(i.toString())).classList.add("hidden");
        }
    }
}

function getScreenWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
if(getScreenWidth() < 768){
    document.addEventListener("touchstart", function(event) {
        let initialX = event.touches[0].clientX;
        let initialY = event.touches[0].clientY;
        document.addEventListener("touchend", function(event) {
          let currentX = event.changedTouches[0].clientX;
          let currentY = event.changedTouches[0].clientY;
          if (Math.abs(initialX - currentX) > Math.abs(initialY - currentY) && !touched) {
            if(initialX - currentX < 0 && pos > 1){pos--;}
            else if(initialX - currentX > 0 & pos < cards){pos++;}
            touched = true;
            carr();
          }
        });
    });
}
else if(getScreenWidth() >= 768){
    right.addEventListener("click", () => {
        if(pos < cards){pos++;}
        carr();
    });
    left.addEventListener("click", () => {
        if(pos > 1){pos--;}
        carr();
    });
}

