import { projects } from "./model.js";

const projectModal = document.querySelector(".menu__add-app-modal");
const projectMenu = document.querySelector(".menu__projects-container");
const projectInput = document.querySelector(".menu__add-app-input");
const editnameModal = document.querySelector(".project__editname-form");
const inputEditName = document.querySelector(".project__input-modal-name");

// muestra el modal para añadir nuevo proeycto
function modalMenuVisible(addProjectBtn) {
    projectInput.value = "";
    addProjectBtn.classList.remove("visible");
    addProjectBtn.classList.add("invisible");
    projectModal.classList.remove("invisible");
    projectModal.classList.add("visible");
}
//oculta el modal para añadir nuevo proeycto
function modalMenuInvisible(addProjectBtn) {
    addProjectBtn.classList.remove("invisible");
    addProjectBtn.classList.add("visible");
    projectModal.classList.remove("visible");
    projectModal.classList.add("invisible");
}
// muestra el modal para editar nombre
function modalEditnameVisibility() {
    inputEditName.value = "";
    editnameModal.classList.toggle("invisible");
    editnameModal.classList.toggle("visible");
}
//  aca se encuentras las funciones observadoras
function renderMenu(projects) {
    projectMenu.innerHTML = "";
    projects.forEach((project) => {
        let projectName = project.name;
        createProjectElement(projectName, project);
    });
}
function renderProject(projects) {
    const itemName = document.querySelector(".project__name");
    const inprogresBtn = document.querySelector(".btn-inprogres");
    const finishedBtn = document.querySelector(".btn-finished");
    if (projects.length === 0) {
        itemName.textContent = "Name :";
        inprogresBtn.classList.add("btn-off");
        finishedBtn.classList.add("btn-off");
        return;
    }
    projects.forEach((project) => {
        if (project.isSelected === true) {
            // name
            itemName.textContent = "";
            itemName.textContent = `Name : ${project.name}`;
            // status
            if (project.status === false) {
                inprogresBtn.classList.remove("btn-off");
                inprogresBtn.classList.add("btn-on");
                finishedBtn.classList.remove("btn-on");
                finishedBtn.classList.add("btn-off");
            }
            if (project.status === true) {
                inprogresBtn.classList.remove("btn-on");
                inprogresBtn.classList.add("btn-off");
                finishedBtn.classList.remove("btn-off");
                finishedBtn.classList.add("btn-on");
            }
        }
    });
}
//funcion para crear el elemento project
function createProjectElement(projectName, project) {
    const elementContainer = document.createElement("div");
    elementContainer.classList.add("project-preview", "task");
    elementContainer.dataset.id = project.id;
    if (project.isSelected) {
        elementContainer.classList.add("selected");
    } else {
        elementContainer.classList.add("no-selected");
    }

    const checkbox = document.createElement("input");
    checkbox.classList.add("project-preview__task-done");
    checkbox.setAttribute("type", "checkbox");
    checkbox.dataset.id = project.id;
    checkbox.checked = project.status;

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

export { modalMenuVisible, modalMenuInvisible, renderMenu, renderProject, projectMenu, modalEditnameVisibility };
