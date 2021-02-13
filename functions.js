let isScrollUp = false;
let scrollY = 0;

var scrollTimeout = null;
document.addEventListener("scroll", function(e){
    document.querySelector("body").style.overflowY = "hidden";
   if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function(){
        scrollToDiv(e)
    },50);
});


const cdSections = document.querySelectorAll("[data-scroll-block]")
const sectionsSize = [];
cdSections.forEach(element=>{
    const yTop = getPosition(element).y;
    const yBottom =  yTop + getOuterHeight(element);
    sectionsSize.push({
        yTop: yTop,
        yBottom:yBottom
    })

})


function scrollToDiv(){
    for(let i = 0 ; i < cdSections.length ; i++) {
        const elmtnY = sectionsSize[i];
        let yTop = elmtnY.yTop
        let yBottom = elmtnY.yBottom
        const userPosition = scrollY;

        if (userPosition -  4  > yTop && userPosition + 4 < yBottom){
            if (isScrollUp){
                window.scrollTo({
                  top: yTop,
                  behavior: 'smooth'
                });
                document.querySelector("body").style.overflowY = "auto";
            }else {
                window.scrollTo({
                  top: yBottom,
                  behavior: 'smooth'
                });
                document.querySelector("body").style.overflowY = "scroll";
            }
        }else{
                document.querySelector("body").style.overflowY = "scroll";
        }

    }
}

window.onscroll = function (e) {
    isScrollUp = this.oldScroll > this.scrollY;
    scrollY = this.scrollY;
    this.oldScroll = this.scrollY;
};

function getOuterHeight(el) {
    let elHeight = el.offsetHeight;
    elHeight += parseInt(window.getComputedStyle(el).getPropertyValue('margin-top'));
    elHeight += parseInt(window.getComputedStyle(el).getPropertyValue('margin-bottom'));
    return elHeight
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}
