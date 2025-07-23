import './style.css';
import DomElements from './dom_elements';

// It's good practice to separate data logic from DOM manipulation.
// Let's rename this to App to better reflect its role in managing the application state.
class App {
    constructor() {
        this.dom = new DomElements();
        this.projects = [];
        this.currentProject = null;
    }

    init() {
        this.loadProjects()
        this.addEventListeners();
        // Start with a default project so the user can add tasks immediately.
        if (this.projects.length === 0) {
            this.createProjectSection("Default Project", "Auto Generated Project")
        } else {
            this.render()
        }
        
    }

    saveProjects() {
        localStorage.setItem('toDoApp.projects', JSON.stringify(this.projects))
    }

    loadProjects() {
        const projectsJSON = localStorage.getItem('toDoApp.projects')

        if (projectsJSON) {
            this.projects = JSON.parse(projectsJSON)
            if (this.projects.length > 0) {
                this.currentProject = this.projects[0]
            }
        }
    }


    addEventListeners() {
        this.dom.createTask.addEventListener('click', () => {
            if (!this.currentProject) {
                alert("Please create a project first!");
                return;
            } 
            this.dom.editProjectDetails.disabled = 'true'
            this.dom.deleteProjectButton.disabled = 'true'
            this.dom.createProject.disabled = 'true'
            this.dom.taskForm.classList.remove('hidden');
        });

        this.dom.cancelTaskButton.addEventListener('click', () => {
            this.dom.taskForm.reset()
            this.dom.taskForm.classList.add('hidden');
            this.dom.editProjectDetails.disabled = false
            this.dom.deleteProjectButton.disabled = false
            this.dom.createProject.disabled = false
        })

        this.dom.cancelProjectButton.addEventListener('click', () => {
            this.dom.projectForm.reset()
            this.dom.projectForm.classList.add('hidden');
            this.dom.editProjectDetails.disabled = false
            this.dom.deleteProjectButton.disabled = false
            this.dom.createTask.disabled = false
        })

        this.dom.taskForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            this.dom.deleteProjectButton.disabled = false 
            this.createTask();
            this.dom.taskForm.reset();
            this.dom.taskForm.classList.add('hidden');
        });

        // Use event delegation for deleting tasks. This is more efficient.
        this.dom.mainContent.addEventListener('change', (event) => {
            if (event.target.classList.contains('delete-check')) {
                const checkbox = event.target;
                if (checkbox.checked) {
                    const card = checkbox.closest('.task-card');
                    if (card && card.dataset.taskId) {
                        this.deleteTask(card.dataset.taskId);
                    }
                }
            }
        });

        this.dom.createProject.addEventListener('click', () => {
            this.dom.editProjectDetails.disabled = 'true'
            this.dom.deleteProjectButton.disabled = 'true'
            this.dom.createTask.disabled = 'true'
            this.dom.projectForm.classList.remove('hidden');
        });

        this.dom.projectForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.dom.deleteProjectButton.disabled = false 
            this.createProjectSection(this.dom.projectName.value, this.dom.projectDescription.value);
            this.dom.projectForm.reset();
            this.dom.projectForm.classList.add('hidden');
        });

        // Use event delegation for switching projects.
        this.dom.projectLinks.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                const projectId = event.target.dataset.projectId;
                const projectToSwitch = this.projects.find(p => p.id === projectId);
                if (projectToSwitch) {
                    this.currentProject = projectToSwitch;
                    this.render();
                }
            }
        });

        this.dom.deleteProjectButton.addEventListener('click', () => {
            this.deleteProject()
            
        })

        this.dom.editProjectDetails.addEventListener('click', () => {
            this.dom.createProject.disabled = 'true'
            this.dom.createTask.disabled = 'true'
            this.dom.editProjectDetails.disabled = 'true'

            if (!this.currentProject) return;
            const detailForm = document.createElement('form')
            detailForm.classList.add('change-detail-form')
            detailForm.innerHTML = `
                <label for="new-project-name">Project Name:</label>
                <input type="text" id="new-project-name" name="new-project-name"
                placeholder="${this.currentProject.name}">

                <label for="new-project-description">Description:</label>
                <input type="text" name="new-project-description" id="new-project-description"
                placeholder = "${this.currentProject.description}">

                <button id="change-project-button" type="submit">Change Details</button>
        `
            this.dom.header.appendChild(detailForm)
        })

        
        this.dom.header.addEventListener('submit', (event) => {
            if (event.target.classList.contains('change-detail-form'))
             {
                event.preventDefault()
                const form = event.target

                const newNameInput = form.querySelector('#new-project-name')
                const newDescriptionInput = form.querySelector('#new-project-description')
                
                const newName = newNameInput.value
                const newDescription = newDescriptionInput.value

                this.changeProjectDetails(newName, newDescription)
                form.classList.add('hidden')
             
            }
            this.dom.createProject.disabled = false
            this.dom.createTask.disabled = false
            this.dom.editProjectDetails.disabled = false
        })

        this.dom.mainContent.addEventListener('click', (event) => {
            if (event.target.id === 'edit-task-button') {
                const editButton = event.target;
                editButton.disabled = true;
                const taskCard = event.target.closest('.task-card');
                if (!taskCard) return;

                const taskId = taskCard.dataset.taskId;
                const taskToEdit = this.currentProject.tasks.find(task => task.id === taskId);

                if (!taskToEdit) return;

                const editForm = document.createElement('form');
                editForm.classList.add('edit-task-form');

                editForm.innerHTML = `
                <label for="new-task-name">Task Name:</label>
                <input type="text" id="new-task-name" name="task-name" value="${taskToEdit.name}">
            
                <label for="new-task-description">Task Description (Optional):</label>
                <input type="text" id="new-task-description" name="task-description" value="${taskToEdit.description || ''}">

                <label for="new-task-date">Due Date:</label>
                <input type="date" id="new-task-date" name="task-date" value="${taskToEdit.date}">

                <label for="new-task-priority">Priority:</label>
                
                <select name="task-priority" id="new-task-priority">
                    <option value="none" ${taskToEdit.priority === 'none' ? 'selected' : ''}></option>
                    <option value="low" ${taskToEdit.priority === 'low' ? 'selected' : ''}>Low</option>
                    <option value="medium" ${taskToEdit.priority === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="high" ${taskToEdit.priority === 'high' ? 'selected' : ''}>High</option>
                </select>
            
            
                <button id="finish-edit" type="submit">Finish</button>`;

                taskCard.appendChild(editForm);


            }
        });

        this.dom.mainContent.addEventListener('submit', (event) => {
            if (event.target.classList.contains('edit-task-form')) {
                event.preventDefault();
                const form = event.target
                const taskCard = form.closest('.task-card')
                const taskId = taskCard.dataset.taskId

                const taskNameInput = form.querySelector('#new-task-name')
                const taskDescriptionInput = form.querySelector('#new-task-description')
                const taskDateInput = form.querySelector('#new-task-date')
                const taskPriorityInput = form.querySelector('#new-task-priority')

                const name = taskNameInput.value
                const description = taskDescriptionInput.value
                const date = taskDateInput.value
                const priority = taskPriorityInput.value
                const updatedTask = this.changeTaskDetails(name, description, date, priority, taskId)

                if (updatedTask) {
                    // Instead of re-rendering everything, just update the inner HTML of this one card
                    taskCard.innerHTML = `
                        <p>Task Name: ${updatedTask.name}</p>
                        ${updatedTask.description ? `<p>Description: ${updatedTask.description}</p>` : ''}
                        ${updatedTask.date ? `<p>Due Date: ${updatedTask.date}</p>` : ''}
                        ${updatedTask.priority !== 'none' ? `<p>Priority: ${updatedTask.priority}</p>` : ''}
                        <input type="checkbox" class="delete-check">
                        <button id="edit-task-button">Edit</button>
                    `;
                }
            }
        })
         
    }

    changeTaskDetails(name, description, date, priority, taskId) {
        if (!this.currentProject) return null;
        
        const currentTask = this.currentProject.tasks.find(task => task.id === taskId)
        
        if (name !== '') {
            currentTask.name = name}
        currentTask.description = description
        currentTask.date = date
        currentTask.priority = priority
        this.saveProjects()
        return currentTask
    }

    changeProjectDetails(newName, newDescription) {
        if (!this.currentProject) return;

        else if (newName !== '')
            {this.currentProject.name = newName}
        else if (newDescription !== '')
        {this.currentProject.description = newDescription}

        this.render()
        this.saveProjects()
    }

    deleteProject() {
        if (!this.currentProject) return;
        this.projects = this.projects.filter(project => project.id !== this.currentProject.id)
        if (this.projects.length > 0) {
            this.currentProject = this.projects[0]
        }
        else {
            this.currentProject = null
        }
        this.render();
        this.saveProjects()
    }

    populateProjectDropdown() {
        this.dom.selectProject.innerHTML = '';
        
        this.projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            this.dom.selectProject.appendChild(option);
        })
    }

    createTask() {
        const newTask = {
            id: `task-${Date.now()}`,
            name: this.dom.taskName.value,
            description: this.dom.taskDescription.value,
            date: this.dom.taskDate.value,
            priority: this.dom.taskPriority.value
        };
        this.currentProject.tasks.push(newTask);
        this.render();
        this.saveProjects()
    }

    deleteTask(taskId) {
        if (!this.currentProject) return;
        this.currentProject.tasks = this.currentProject.tasks.filter(task => task.id !== taskId);
        this.render();
        this.saveProjects()
    }

    createProjectSection(name, description) {
        const newProject = {
            id: `project-${Date.now()}`,
            name: name,
            tasks: [],
            description: description
        };
        this.projects.push(newProject);
        this.currentProject = newProject;
        this.render();
        this.saveProjects()
    }

    createProjectHyperlink() {
        this.projects.forEach(project => {
            const projectHyperLink = document.createElement('a');
            projectHyperLink.textContent = project.name;
            projectHyperLink.href = '#';
            projectHyperLink.classList.add('project-link');
            projectHyperLink.dataset.projectId = project.id;

            if (project === this.currentProject) {
                projectHyperLink.classList.add('active'); // You can style this in CSS
            }
            this.dom.projectLinks.appendChild(projectHyperLink);
        });
    }

    displayTasksForProject() {
        this.currentProject.tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            taskCard.dataset.taskId = task.id;
            // Use .innerHTML to render the HTML string correctly
            taskCard.innerHTML = `
                <p>Task Name: ${task.name}</p>
                ${task.description ? `<p>Description: ${task.description}</p>` : ''}
                ${task.date ? `<p>Due Date: ${task.date}</p>` : ''}
                ${task.priority !== 'none' ? `<p>Priority: ${task.priority}</p>` : ''}
                <input type="checkbox" class="delete-check">
                <button id="edit-task-button">Edit</button>
            `;
            this.dom.mainContent.appendChild(taskCard);
        });
    }

    render() {
        // Clear the current display before re-rendering
        this.dom.mainContent.innerHTML = '';
        this.dom.projectLinks.innerHTML = '';

        // Render project links in the sidebar
        this.createProjectHyperlink()
        this.populateProjectDropdown()

        // Render tasks for the current project
        if (!this.currentProject) {
            this.dom.mainProjectTitle.textContent = "You Have No Projects...";
            this.dom.deleteProjectButton.style.display = 'none'
            this.dom.editProjectDetails.style.display = 'none'
            this.dom.displayProjectDescription.textContent = "Create a Project to Begin!"
            return;
        }
        
        this.dom.editProjectDetails.style.display = 'block'
        this.dom.deleteProjectButton.style.display = 'block'
        this.dom.mainProjectTitle.textContent = this.currentProject.name;
        this.dom.displayProjectDescription.textContent = this.currentProject.description

        this.displayTasksForProject()
        
    }
}

const app = new App();
app.init();