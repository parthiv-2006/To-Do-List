import loadHomePage from "./home.js";
import loadMenuPage from "./menu.js";
import loadContactPage from "./contact.js";
import "./style.css"


const homeButton = document.querySelector('#home')
const menuButton = document.querySelector('#menu')
const contactButton = document.querySelector('#contact')
const contentContainer = document.querySelector('.content')

loadHomePage()

homeButton.addEventListener('click', () => {
    contentContainer.textContent = ''
    loadHomePage()
})

menuButton.addEventListener('click', () => {
    contentContainer.textContent = ''
    loadMenuPage()
})

contactButton.addEventListener('click', () => {
    contentContainer.textContent = ''
    loadContactPage()
})

