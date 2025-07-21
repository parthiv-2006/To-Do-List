import './style.css';
import DomElements from './dom_elements';


const dom = new DomElements();

dom.createTask.addEventListener('click', () => {
    dom.taskForm.classList.remove('hidden');
})


function CreateTaskCard() {
    
}