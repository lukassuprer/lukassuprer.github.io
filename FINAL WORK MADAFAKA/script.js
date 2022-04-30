let posNumber = 0;
const arrayOfPositions = document.querySelectorAll('.position');
const hrefElements = document.querySelectorAll('a');
const navbarStripes = document.querySelectorAll('.navbarButtonStripe');
const navbar = document.getElementById('navbar');
const buttonNavbar = document.querySelector('.buttonNavbar');
const crossIcon = document.querySelector('#crossIcon');
const navbarSmall = document.querySelector('.navbarSmall');
const heading = document.querySelector('#heading');
const textNavbar = document.querySelectorAll('.navbarText');
const textSmallNavbar = document.querySelectorAll('.navbarSmallText');
const body = document.getElementById('body');
let navbarIsVisible = false;

//Images
let images = [];
let evenImages = document.querySelectorAll('.evenImage');
let oddImages = document.querySelectorAll('.oddImage');
let nightImages = [];
const myImageCount = 3;
let nextImage = 0;

setPosition(0);
setInterval(checkPos, 1);
buttonNavbar.addEventListener('click', navbarButtonClick);
navbarSmall.addEventListener('click', navbarButtonClick);
changeImage();

function changeImage() {
    for (let i = 0; i < 4; i++) {
        nightImages.push(evenImages[i]);
        nightImages.push(oddImages[i]);
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < myImageCount; j++) {
            images.push("url('./Images/" + i + "/" + j + ".jpg')");
        }
    }
    imageInterval();
    const intervalId = setInterval(function () {
        imageInterval();
    }, 9000);
}
function imageInterval() {
    let j = 0;
    for (let i = 0; i < 7; i++) {
        let animation = nightImages[i].animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: 2000,
            iterations: 1
        });
        animation.addEventListener('finish', function () {
            nightImages[i].style.backgroundImage = images[j + nextImage];
            j += myImageCount;
            nightImages[i].animate([
                { opacity: 0 },
                { opacity: 1 }
            ], {
                duration: 2000,
                iterations: 1
            });
        });
    }
    nextImage++;
    if (nextImage >= myImageCount) {
        nextImage = 0;
    }
}
function animateNavBarIn() {
    navbar.classList.remove('notMoved');
    navbar.classList.add('moved');
    navbar.animate([
        { transform: 'translateX(-2000px)' },
        { transform: 'translateX(0px)' }
    ], {
        duration: 500,
        iterations: 1
    });
    navbar.classList.remove('moved');
    navbar.classList.add('notMoved');
}

function setPosition(numberOfPosition) {
    if (numberOfPosition > textNavbar.length - 1) {
        textNavbar[numberOfPosition - 1].style.color = 'red';
        textSmallNavbar[numberOfPosition - 1].style.color = 'red';
    } else {
        textNavbar[numberOfPosition].style.color = 'red';
        textSmallNavbar[numberOfPosition].style.color = 'red';
    }
    let position = arrayOfPositions[numberOfPosition];
    navbar.style.top = position.getBoundingClientRect().top + "px";
    navbar.style.left = position.getBoundingClientRect().left + "px";
    navbar.style.width = position.offsetWidth + "px";
    navbar.style.height = position.offsetHeight + "px";
    navbar.style.zIndex = "1";
    position.appendChild(navbar);
    animateNavBarIn();
}
function checkPos() {
    const rect = navbar.getBoundingClientRect();
    if (rect.top < 0) {
        if (posNumber < arrayOfPositions.length - 1) {
            textNavbarHighlight(posNumber);
            posNumber++;
            setPosition(posNumber)
        }
        else {
            textNavbarHighlight(posNumber);
            posNumber = 0;
            setPosition(posNumber)
        }
    }
    else if (rect.top > 570) {
        if (posNumber > 0) {
            textNavbarHighlight(posNumber);
            posNumber--;
            setPosition(posNumber)
        }
        else {
            textNavbarHighlight(posNumber);
            posNumber = arrayOfPositions.length - 1;
            setPosition(posNumber)
        }
    }
}

function textNavbarHighlight(numberOfPosition) {
    if (numberOfPosition > textNavbar.length - 1) {
        numberOfPosition = textNavbar.length - 1;
        textNavbar[numberOfPosition].style.color = 'white';
        textSmallNavbar[numberOfPosition].style.color = 'white';
    }
    else {
        textNavbar[numberOfPosition].style.color = 'white';
        textSmallNavbar[numberOfPosition].style.color = 'white';
    }
}

function navbarButtonClick() {
    if (navbarIsVisible == true) {
        navbarSmall.classList.toggle('active');
        buttonNavbar.classList.toggle('active');
        navbarSmall.classList.add('hidden');
        body.classList.toggle('stopScrolling');
        navbarIsVisible = false;
    }
    else {
        navbarSmall.classList.toggle('active');
        buttonNavbar.classList.toggle('active');
        navbarSmall.classList.remove('hidden');
        body.classList.toggle('stopScrolling');
        navbarIsVisible = true;
    }
}