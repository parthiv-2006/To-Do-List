import './style.css';
import DomElements from './dom_elements';

class Dom {
    constructor() {
        this.dom = new DomElements();

        this.dom.createTask.addEventListener('click', () => {
            this.dom.taskForm.classList.remove('hidden');
        })  

    this.dom.taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Still need this to prevent the page from reloading
        this.createTaskCard();
        this.dom.taskForm.reset(); 
        this.dom.taskForm.classList.add('hidden');
        })

    this.dom.mainContent.addEventListener('change', (event) => {
    // Check if the changed element is a delete checkbox
    if (event.target.classList.contains('delete-check')) {
        const checkbox = event.target;
        // If the checkbox is checked, find its closest '.task-card' parent and remove it.
        if (checkbox.checked) {
            const card = checkbox.closest('.task-card');
            this.dom.mainContent.removeChild(card);                          
            }
        }
        });
    
    }
    

    createTaskCard() {
    const card = document.createElement('div');
    card.classList.add('task-card');
    
    const name = document.createElement('p');
    name.textContent = `Task Name: ${this.dom.taskName.value}`;
    card.appendChild(name);

    if (this.dom.taskDescription.value.trim() !== ''){
        const description = document.createElement('p');
        description.textContent = `Description: ${this.dom.taskDescription.value}`;
        card.appendChild(description);}

    const date = document.createElement('p');
    if (this.dom.taskDate.value.trim() !== ''){
        date.textContent = `Due Date: ${this.dom.taskDate.value}`;
        card.appendChild(date);}

    if (this.dom.taskPriority.value.trim() !== 'none') {
        const priority = document.createElement('p');
        priority.textContent = `Priority: ${this.dom.taskPriority.value}`;
        card.appendChild(priority);}
    
    const deleteCheck = document.createElement('input');
    deleteCheck.type = 'checkbox';
    deleteCheck.classList.add('delete-check');
    card.appendChild(deleteCheck);

    this.dom.mainContent.appendChild(card);
}

}

new Dom();