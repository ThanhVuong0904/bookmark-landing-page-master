//header
const header = $(".header")
const headerMobile = $(".header-mobile");
const toggleOpen = $(".toggle-open");
const toggleClose = $(".toggle-close");
let isShow = false;
toggleOpen.addEventListener('click', ()=> {
     isShow = true;
     header.classList.toggle("active-header", isShow);
     headerMobile.classList.toggle("hide-header");
})

toggleClose.addEventListener('click', ()=> {
     header.classList.remove("active-header");
     headerMobile.classList.toggle("hide-header");
})
