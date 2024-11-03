import { projects } from "./model.js";

const projectModal = document.querySelector(".menu__add-app-modal");
const projectMenu = document.querySelector(".menu__projects-container");
const projectInput = document.querySelector(".menu__add-app-input");

// muestra el modal para añadir nuevo proeycto
function modalVisible(addProjectBtn) {
    addProjectBtn.classList.remove("visible");
    addProjectBtn.classList.add("invisible");
    projectModal.classList.remove("invisible");
    projectModal.classList.add("visible");
}
//borra el valor del input
function cleanInput() {
    projectInput.value = "";
}
//oculta el modal para añadir nuevo proeycto
function modalInvisible(addProjectBtn) {
    addProjectBtn.classList.remove("invisible");
    addProjectBtn.classList.add("visible");
    projectModal.classList.remove("visible");
    projectModal.classList.add("invisible");
}

//  aca se encuentras las funciones observadoras
function renderMenu(projects) {
    projectMenu.innerHTML = "";
    projects.forEach((project) => {
        let projectName = project.name;
        createProjectElement(projectName, project);
    });
}
//funcion para crear el elemento project
function createProjectElement(projectName, project) {
    const elementContainer = document.createElement("div");
    elementContainer.classList.add("project-preview", "task");

    const checkbox = document.createElement("input");
    checkbox.classList.add("project-preview__task-done");
    checkbox.setAttribute("type", "checkbox");
    checkbox.dataset.id = project.id;

    const nameElement = document.createElement("h4");
    nameElement.classList.add("project-preview__name");
    nameElement.textContent = projectName;

    const opcionContainer = document.createElement("div");
    opcionContainer.classList.add("project__opcion");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "project-preview__trash");
    deleteIcon.dataset.id = project.id;

    elementContainer.appendChild(checkbox);
    elementContainer.appendChild(nameElement);
    elementContainer.appendChild(opcionContainer);
    opcionContainer.appendChild(deleteIcon);
    projectMenu.appendChild(elementContainer);
}
// muestra el modal edit name
function modalEditNameVisible(modal) {
    modal.classList.remove("invisible");
    modal.classList.add("visible");
}

export { modalVisible, modalInvisible, renderMenu, cleanInput, projectMenu, modalEditNameVisible };
