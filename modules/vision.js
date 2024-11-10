import { projects } from "./model.js";
// project menu DOM
const containerProjectMenu = document.querySelector(".menu__projects-container");
const modalAddProject = document.querySelector(".menu__add-app-modal");
const btnAddProject = document.querySelector(".menu__add-app-btn");
const inputAddProject = document.querySelector(".menu__add-app-input");
// task project menu DOM
const modalEditName = document.querySelector(".project__editname-form");
// const inputEditName = document.querySelector(".project__input-modal-name");
const textAreaArchitecture = document.querySelector(".project__architecture-description");
const textAreaStackTechnology = document.querySelector(".project__technology-description");
const textAreaNote = document.querySelector(".project__note-textarea");
const inputDate = document.querySelector(".project__date");
const inputRequirement = document.querySelector(".project__input-container");
const containerTaskRequirement = document.querySelector(".project__requirements-tasks");
const modalDependency = document.querySelector(".project__dependency-input-container");
const containerTaskDependency = document.querySelector(".project__dependency-tasks");
const name = document.querySelector(".project__name");
const btnInProgres = document.querySelector(".btn-inprogres");
const btnFinished = document.querySelector(".btn-finished");

// visibility modals
function toggleMenuVisibility() {
    btnAddProject.classList.toggle("visible");
    btnAddProject.classList.toggle("invisible");
    modalAddProject.classList.toggle("invisible");
    modalAddProject.classList.toggle("visible");
    inputAddProject.value = "";
}
function toggleRequirementVisibility() {
    inputRequirement.classList.toggle("invisible");
    inputRequirement.classList.toggle("visible");
}
function toggleDependencyVisibility() {
    modalDependency.classList.toggle("invisible");
    modalDependency.classList.toggle("visible");
}
function toggleEditNameVisibility() {
    modalEditName.classList.toggle("invisible");
    modalEditName.classList.toggle("visible");
}
// render
function renderProjectMenu(projects) {
    containerProjectMenu.innerHTML = "";
    projects.forEach((project) => {
        const name = project.name;
        createProjectElement(name, project);
    });
}
function renderProjectContent(projects) {
    if (projects.length === 0) {
        name.textContent = "Name :";
        btnInProgres.classList.add("btn-off");
        btnFinished.classList.add("btn-off");
        textAreaArchitecture.value = "";
        textAreaStackTechnology.value = "";
        textAreaNote.value = "";
        inputDate.value = "";
        containerTaskRequirement.innerHTML = "";
        return;
    }
    projects.forEach((project) => {
        if (project.isSelected === true) {
            // name
            name.textContent = "";
            name.textContent = `Name : ${project.name}`;
            // status
            if (project.status === false) {
                btnInProgres.classList.remove("btn-off");
                btnInProgres.classList.add("btn-on");
                btnFinished.classList.remove("btn-on");
                btnFinished.classList.add("btn-off");
            }
            if (project.status === true) {
                btnInProgres.classList.remove("btn-on");
                btnInProgres.classList.add("btn-off");
                btnFinished.classList.remove("btn-off");
                btnFinished.classList.add("btn-on");
            }
            // architecture
            textAreaArchitecture.value = project.architecture;
            // technologyStack
            textAreaStackTechnology.value = project.tecnologiStack;
            // note
            textAreaNote.value = project.note;
            // date
            inputDate.value = project.deadLine;
            // requirement
            containerTaskRequirement.innerHTML = "";
            const requirementArray = project.requirements;
            requirementArray.forEach((task) => {
                createTaskRequirement(task);
            });
            // dependency
            containerTaskDependency.innerHTML = "";
            const dependencyArray = project.dependency;
            dependencyArray.forEach((task) => {
                createTaskDependency(task);
            });
        }
    });
}
// create elements
function createProjectElement(name, project) {
    const containerElement = document.createElement("div");
    containerElement.classList.add("project-preview", "task");
    containerElement.dataset.id = project.id;
    if (project.isSelected) {
        containerElement.classList.add("selected");
    } else {
        containerElement.classList.add("no-selected");
    }

    const checkbox = document.createElement("input");
    checkbox.classList.add("project-preview__task-done");
    checkbox.setAttribute("type", "checkbox");
    checkbox.dataset.id = project.id;
    checkbox.checked = project.status;

    const nameElement = document.createElement("h4");
    nameElement.classList.add("project-preview__name");
    nameElement.textContent = name;

    const opcionContainer = document.createElement("div");
    opcionContainer.classList.add("project__opcion");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "project-preview__trash");
    deleteIcon.dataset.id = project.id;

    containerElement.appendChild(checkbox);
    containerElement.appendChild(nameElement);
    containerElement.appendChild(opcionContainer);
    opcionContainer.appendChild(deleteIcon);
    containerProjectMenu.appendChild(containerElement);
}
// task
function createTaskRequirement(task) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-task");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.dataset.id = task.id;
    taskCheckbox.checked = task.status;
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.classList.add("task-checkbox");

    const taskName = document.createElement("p");
    taskName.textContent = task.name;

    const taskDeleteBtn = document.createElement("button");

    const taskIcon = document.createElement("i");
    taskIcon.classList.add("fa-solid", "fa-trash");
    taskIcon.classList.add("task-delete");
    taskIcon.dataset.id = task.id;

    taskContainer.appendChild(taskCheckbox);
    taskContainer.appendChild(taskName);
    taskContainer.appendChild(taskDeleteBtn);
    taskDeleteBtn.appendChild(taskIcon);
    containerTaskRequirement.appendChild(taskContainer);
}
function createTaskDependency(task) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-task");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.dataset.id = task.id;
    taskCheckbox.checked = task.status;
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.classList.add("task-checkbox");

    const taskName = document.createElement("p");
    taskName.textContent = task.name;

    const taskDeleteBtn = document.createElement("button");

    const taskIcon = document.createElement("i");
    taskIcon.classList.add("fa-solid", "fa-trash");
    taskIcon.classList.add("task-delete");
    taskIcon.dataset.id = task.id;

    taskContainer.appendChild(taskCheckbox);
    taskContainer.appendChild(taskName);
    taskContainer.appendChild(taskDeleteBtn);
    taskDeleteBtn.appendChild(taskIcon);
    containerTaskDependency.appendChild(taskContainer);
}

export {
    // variable
    containerProjectMenu,
    // funciones
    toggleMenuVisibility,
    toggleRequirementVisibility,
    toggleDependencyVisibility,
    toggleEditNameVisibility,
    renderProjectMenu,
    renderProjectContent,
};
