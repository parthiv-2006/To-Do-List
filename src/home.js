import RestaurantImage from "./Assets/jay-wennington-N_Y88TWmGwA-unsplash.jpg"

export default function loadHomePage() {
    const contentContainer = document.querySelector('.content')

    const homeDiv = document.createElement('div')
    homeDiv.classList.add('home')

    const img = document.createElement('img')
    img.alt = "Restaurant Image"
    img.src = RestaurantImage

    const description = document.createElement('p')
    description.textContent = "Curated for the senses."

    
    homeDiv.appendChild(img)
    homeDiv.appendChild(description)

    contentContainer.appendChild(homeDiv)

    const hourDiv = document.createElement('div')
    hourDiv.classList.add('hours')

    const hourHeading = document.createElement('h2')
    hourHeading.textContent = "Hours"
    hourDiv.appendChild(hourHeading)
    

    const operationalTimes = document.createElement('ul')
    operationalTimes.classList.add('operational-times')

    const sunday = document.createElement('li')
    sunday.textContent = "Sunday: 8am - 8pm"

    const monday = document.createElement('li')
    monday.textContent = "Monday: 8am - 8pm"

    const tuesday = document.createElement('li')
    tuesday.textContent = "Tuesday: 8am - 8pm"

    const wednesday = document.createElement('li')
    wednesday.textContent = "Wednesday: 8am - 8pm"

    const thursday = document.createElement('li')
    thursday.textContent = "Thursday: 8am - 8pm"

    const friday = document.createElement('li')
    friday.textContent = "Friday: 8am - 8pm"

    const saturday = document.createElement('li')
    saturday.textContent = "Saturday: Closed"

    operationalTimes.appendChild(sunday)
    operationalTimes.appendChild(monday)
    operationalTimes.appendChild(tuesday)
    operationalTimes.appendChild(wednesday)
    operationalTimes.appendChild(thursday)
    operationalTimes.appendChild(friday)
    operationalTimes.appendChild(saturday)

    hourDiv.appendChild(operationalTimes)

    contentContainer.appendChild(hourDiv)

}