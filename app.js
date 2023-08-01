const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let previousActive = 0;
let currentActive = 0;

const navActive = $$(".js-nav-active");

const activeHeader = (prev, curr) => {
    navActive[prev].classList.remove("active");
    navActive[curr].classList.add("active");
};
navActive.forEach((item, index) => {
    item.addEventListener("click", () => {
        if (index != currentActive) {
            previousActive = currentActive;
            currentActive = index;
        }
        activeHeader(previousActive, currentActive);
    });
});
