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
    
    const deleteCheck = document.createElement('input');
    deleteCheck.type = 'checkbox';
    deleteCheck.classList.add('delete-check');
    card.appendChild(deleteCheck);

    dom.mainContent.appendChild(card);
}

dom.mainContent.addEventListener('change', (event) => {
    // Check if the changed element is a delete checkbox
    if (event.target.classList.contains('delete-check')) {
        const checkbox = event.target;
        // If the checkbox is checked, find its closest '.task-card' parent and remove it.
        if (checkbox.checked) {
            const card = checkbox.closest('.task-card');
            dom.mainContent.removeChild(card);                          
        }
    }
});