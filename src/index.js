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
            this.dom.taskForm.classList.remove('hidden');
        });

        this.dom.taskForm.addEventListener('submit', (event) => {
            event.preventDefault();  
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
            this.dom.projectForm.classList.remove('hidden');
        });

        this.dom.projectForm.addEventListener('submit', (event) => {
            event.preventDefault();
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
                <input type="checkbox" class="delete-check">`;
            this.dom.mainContent.appendChild(taskCard);
        });
    }

    render() {
        // Clear the current display before re-rendering
        this.dom.mainContent.innerHTML = '';
        this.dom.projectLinks.innerHTML = '';

        // Render project links in the sidebar
        this.createProjectHyperlink()

        // Render tasks for the current project
        if (!this.currentProject) {
            this.dom.mainProjectTitle.textContent = "You Have No Projects...";
            this.dom.deleteProjectButton.style.display = 'none'
            this.dom.displayProjectDescription.textContent = "Create a Project to Begin!"
            return;
        }
        
        this.dom.deleteProjectButton.style.display = 'block'
        this.dom.mainProjectTitle.textContent = this.currentProject.name;
        this.dom.displayProjectDescription.textContent = this.currentProject.description

        this.displayTasksForProject()
        
    }
}

const app = new App();
app.init();