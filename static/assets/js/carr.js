const left = document.getElementById("left");
const right = document.getElementById("right");

pos = 1;
function carr (){
    for(let i = 1; i <= cards; i++){
        if(i == pos){
            document.getElementById(i.toString()).classList.add("w-3/4");
            document.getElementById(i.toString()).classList.add("lg:w-full");
            document.getElementById(i.toString()).classList.remove("w-0");

            document.getElementById(i.toString()).addEventListener('transitionend', function() {
                document.getElementById("p".concat(i.toString())).classList.remove('hidden');
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
right.addEventListener("click", () => {
    if(pos < cards){pos++;}
    carr();
});
left.addEventListener("click", () => {
    if(pos > 1){pos--;}
    carr();
});