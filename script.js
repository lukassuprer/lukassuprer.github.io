let posNumber = -1;
const arrayOfPositions = document.querySelectorAll('.position');
const navbar = document.getElementById('navbar');
const buttonNavbar = document.querySelector('.buttonNavbar');
const navbarSmall = document.getElementById('navbarSmall');

setInterval(checkPos, 1);
buttonNavbar.addEventListener('click', navbarButtonClick);

function setPosition(numberOfPosition){
    let position = arrayOfPositions[numberOfPosition];
    navbar.style.top = position.getBoundingClientRect().top +  "px";
    navbar.style.left = position.getBoundingClientRect().left + "px";
    navbar.style.width = position.offsetWidth + "px";
    navbar.style.height = position.offsetHeight + "px";
    // navbar.style.position = "relative";
    navbar.style.zIndex = "1";
    position.appendChild(navbar);
}
function checkPos(){
    const rect = navbar.getBoundingClientRect();
    if(rect.top < 0){
        if(posNumber < arrayOfPositions.length - 1){
            posNumber++;
            setPosition(posNumber)
        }
        else{
            posNumber = 0;
            setPosition(posNumber)
        }
    }
    else if(rect.top > 845){
        if(posNumber > 0){
            posNumber--;
            setPosition(posNumber)
        }
        else{
            posNumber = arrayOfPositions.length - 1;
            setPosition(posNumber)
        }
    }
}

function navbarButtonClick(){
    if(navbarSmall.style.visibility == "visible"){
        navbarSmall.style.visibility = "hidden";
    }
    else{
        navbarSmall.style.visibility = "visible";
    }
}