function scrollToDiv() {
    const firstDiv = document.querySelectorAll('[data-scroll-order]')[0]
    const secondDiv = document.querySelectorAll('[data-scroll-order]')[1]

    document.addEventListener("scroll", (e) => {
            if (secondDiv.getBoundingClientRect().top > 0) {
                if (!isScrollUp) {
                    secondDiv.scrollIntoView();
                }
            } else {
                if (isScrollUp) {
                    firstDiv.scrollIntoView();
                }
            }
        }
    );
    let isScrollUp = true;

    window.onscroll = function (e) {
        isScrollUp = this.oldScroll > this.scrollY;
        this.oldScroll = this.scrollY;
    }
}
scrollToDiv();
