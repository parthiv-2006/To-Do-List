import './style.css';
import DomElements from './dom_elements';


const dom = new DomElements();

dom.createTask.addEventListener('click', () => {
    dom.taskForm.classList.remove('hidden');
})

dom.taskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Still need this to prevent the page from reloading
    createTaskCard();
    dom.taskForm.reset(); 
    dom.taskForm.classList.add('hidden');
})

// Function names in JavaScript are typically camelCase.
function createTaskCard() {
    const card = document.createElement('div');
    card.classList.add('task-card');
    
    const name = document.createElement('p');
    name.textContent = `Task Name: ${dom.taskName.value}`;
    card.appendChild(name);

    if (dom.taskDescription.value.trim() !== ''){
        const description = document.createElement('p');
        description.textContent = `Description: ${dom.taskDescription.value}`;
        card.appendChild(description);}

    const date = document.createElement('p');
    if (dom.taskDate.value.trim() !== ''){
        date.textContent = `Due Date: ${dom.taskDate.value}`;
        card.appendChild(date);}

    if (dom.taskPriority.value.trim() !== 'none') {
        const priority = document.createElement('p');
        priority.textContent = `Priority: ${dom.taskPriority.value}`;
        card.appendChild(priority);}

    dom.mainContent.appendChild(card);
}