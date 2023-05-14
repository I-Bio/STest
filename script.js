let isBurgerActive = false;
let isMobile = innerWidth <= 1000;
let lastSize = innerWidth;

function ResizeMain(){
    let navMenu = document.querySelector(".menu__box");
    if (isBurgerActive){
        if (innerWidth <= 1000 && lastSize > 1000){
            isMobile = true;
        } else if (innerWidth > 1000 && lastSize <= 1000) {
            isMobile = false;
        }
        ResizePaddingForMain();
    }
    lastSize = innerWidth;
}

function ResizePaddingForMain(){
    let main = document.querySelector(".main-locator");
    if (!isMobile){
        myWidth = String(innerWidth * 0.25 + 20) + 'px';
        main.style.marginLeft = myWidth;
    } else {
        main.style.marginLeft = "20px";
    }
}

function MainPaddingFromBurger(){
    if (innerWidth > 1000 && !isBurgerActive){
        let main = document.querySelector(".main-locator");
        myWidth = String(innerWidth * 0.25 + 20) + 'px';
        main.style.marginLeft = myWidth;
        isBurgerActive = true;
    } else if (isBurgerActive){
        let main = document.querySelector(".main-locator");
        main.style.marginLeft = "20px";
        isBurgerActive = false;
    }
}

window.addEventListener("resize", ResizeMain);