const navbtn = document.querySelector(".nav_btn")
const navlist = document.querySelector(".nav_list")
const cover = document.querySelector(".cover")
const resumelistItems = document.querySelectorAll(".resume_list_item")
const portfolioListItem = document.querySelectorAll(".portfolio_list_item")
const listItem = document.querySelectorAll(".nav_list_item")
const sections = document.querySelectorAll("main > section")
const changeThemBtn = document.querySelector(".change_them")
const lightIcon = `<svg  viewBox="0 0 24 24"><path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5S7 9.2 7 12zM12 9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3S10.3 9 12 9zM13 5V3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1S13 5.6 13 5zM19.1 4.9c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4C19.5 6 19.5 5.3 19.1 4.9zM21 11h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1S21.6 11 21 11zM17.7 16.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L17.7 16.2zM11 19v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1S11 18.4 11 19zM4.9 19.1c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4C4.5 18 4.5 18.7 4.9 19.1zM2 12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1H3C2.4 11 2 11.4 2 12zM6.3 4.9c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4C6.5 8 6.8 8.1 7.1 8.1S7.6 8 7.8 7.8c.4-.4.4-1 0-1.4L6.3 4.9z"/></svg>`
const darkIcon = `<svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>`

if(window.localStorage.getItem("them") === "dark"){
    document.documentElement.classList.add("dark_mode")
    changeThemBtn.innerHTML = lightIcon
}


navbtn.addEventListener("click", function () {
    navbtn.classList.toggle("nav_btn--open")
    navlist.classList.toggle("nav_list--open")
    cover.classList.toggle("cover--show")
})
resumelistItems.forEach(resumelistItems => {
    resumelistItems.addEventListener("click", function () {
        document.querySelector(".resume_list_item--active").classList.remove("resume_list_item--active")
        document.querySelector(".resume_content--show").classList.remove("resume_content--show")
        this.classList.add("resume_list_item--active")
        let contentId = this.getAttribute("data-content")
        document.querySelector(contentId).classList.add("resume_content--show")
    })
}
)
portfolioListItem.forEach(portfolioListItem => {
    portfolioListItem.addEventListener("click", function () {
        document.querySelector(".portfolio_list_item--active").classList.remove("portfolio_list_item--active")
        document.querySelector(".swiper_content_show").classList.remove("swiper_content_show")
        this.classList.add("portfolio_list_item--active")
        let portfolioId = this.getAttribute("data-content")
        document.querySelector(portfolioId).classList.add("swiper_content_show")
    })
}
)

const observer = new IntersectionObserver(observerHandle, {
    threshold: 0.40
})

function observerHandle(allSection) {
    allSection.map(section => {
        let sectionClassName = section.target.className
        let sectionLi = document.querySelector(`.nav_list_item[data-section=${sectionClassName}]`)
        if (section.isIntersecting) {
            sectionLi.classList.add("nav_list_item--active")
        } else {
            sectionLi.classList.remove("nav_list_item--active")
        }
    })
}

sections.forEach(section => {
    observer.observe(section)
})

listItem.forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault()
        document.querySelector(".nav_list_item--active").classList.remove("nav_list_item--active")
        item.classList.add("nav_list_item--active")

        let itemSection = item.getAttribute("data-section")
        let offsetTop = document.querySelector(`.${itemSection}`).offsetTop
        window.scrollTo({
            top: offsetTop - 150,
            behavior: "smooth"
        })
    })
})

changeThemBtn.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark_mode")

    if (document.documentElement.classList.contains("dark_mode")) {
        window.localStorage.setItem("them","dark")
        changeThemBtn.innerHTML = lightIcon
    }else{
        window.localStorage.setItem("them","light")
        changeThemBtn.innerHTML = darkIcon
    }
})