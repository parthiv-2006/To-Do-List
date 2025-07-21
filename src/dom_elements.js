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

    }
}