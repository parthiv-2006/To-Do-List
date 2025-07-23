export default class DomElements {
    constructor () {
        this.header = document.querySelector('.header')
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
        this.deleteProjectButton = document.querySelector('#delete-project')
        this.displayProjectDescription = document.querySelector('#display-project-description')
        this.editProjectDetails = document.querySelector('#edit-project-details')
        this.cancelTaskButton = document.querySelector('#cancel-task-button')
        this.selectProject = document.querySelector('#project-for-task')
        // Project Form
        this.projectForm = document.querySelector('#project-form')
        this.projectName = document.querySelector('#project-name')
        this.projectDescription = document.querySelector('#project-description')
        this.addProjectButton = document.querySelector('#add-project-button')
        this.cancelProjectButton = document.querySelector('#cancel-project-button')
        // Sidebar
        this.sidebar = document.querySelector('.sidebar')
        this.projectLinks = document.querySelector('.list-of-projects')
    }
}