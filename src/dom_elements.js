export default class DomElements {
    constructor () {
        this.createProject = document.querySelector('#createProject');
        this.createTask = document.querySelector('#createTask');
        this.headerTitle = document.querySelector('#title')
        this.taskForm = document.querySelector('#task-form')
        this.taskName = document.querySelector('#task-name')
        this.taskDescription = document.querySelector('#task-description')
        this.taskDate = document.querySelector('#task-date')
        this.taskPriority = document.querySelector('#task-priority')
        this.addTaskButton = document.querySelector('#add-task-button')
        this.mainContent = document.querySelector('.main')
        this.mainProjectTitle = document.querySelector('.main-container h1');
        // Project Form
        this.projectForm = document.querySelector('#project-form')
        this.projectName = document.querySelector('#project-name')
        this.projectDescription = document.querySelector('#project-description')
        this.addProjectButton = document.querySelector('#add-project-button')
        // Sidebar
        this.sidebar = document.querySelector('.sidebar')
        this.projectLinks = document.querySelector('.list-of-projects')
    }
}