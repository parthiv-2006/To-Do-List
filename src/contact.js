
export default function loadContactPage() {
    const contentContainer = document.querySelector('.content')

    const contactDiv = document.createElement('div')
    contactDiv.classList.add('contact')

    const displayMessage = document.createElement('h1')
    displayMessage.textContent = "Contact"

    const contactList = document.createElement('ul')
    contactList.classList.add('contact-list')

    const number = document.createElement('li')
    number.textContent = '416-551-5555'
    contactList.appendChild(number)

    const email = document.createElement('li')
    email.textContent = "thomas.johnson@example.com"
    contactList.appendChild(email)

    const address = document.createElement('li')
    address.textContent = "123 Main Street"
    contactList.appendChild(address)

    contactDiv.appendChild(displayMessage)
    contactDiv.appendChild(contactList)

    contentContainer.appendChild(contactDiv)


}