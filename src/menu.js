export default function loadMenuPage() {
    const contentContainer = document.querySelector('.content')

    const menuDiv = document.createElement('div')
    menuDiv.classList.add('menu')

    const displayMessage = document.createElement('h1')
    displayMessage.textContent = "Menu"

    const menuList = document.createElement('ul')
    menuList.classList.add('menu-list')

    const menuItem1 = document.createElement('li')
    menuItem1.textContent = "Placeholder for Menu Item 1"

    const menuItem2 = document.createElement('li')
    menuItem2.textContent = "Placeholder for Menu Item 2"

    const menuItem3 = document.createElement('li')
    menuItem3.textContent = "Placeholder for Menu Item 3"

    const menuItem4 = document.createElement('li')
    menuItem4.textContent = "Placeholder for Menu Item 4"

    const menuItem5 = document.createElement('li')
    menuItem5.textContent = "Placeholder for Menu Item 5"

    const menuItem6 = document.createElement('li')
    menuItem6.textContent = "Placeholder for Menu Item 6"


    menuList.appendChild(menuItem1)
    menuList.appendChild(menuItem2)
    menuList.appendChild(menuItem3)
    menuList.appendChild(menuItem4)
    menuList.appendChild(menuItem5)
    menuList.appendChild(menuItem6)


    menuDiv.appendChild(displayMessage)
    menuDiv.appendChild(menuList)

    contentContainer.appendChild(menuDiv)


}