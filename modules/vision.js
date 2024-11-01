const projectModal = document.querySelector(".menu__add-app-modal");
const projectMenu = document.querySelector(".menu__projects-container");
const projectInput = document.querySelector(".menu__add-app-input");

function modalVisible(addProjectBtn) {
    addProjectBtn.classList.remove("visible");
    addProjectBtn.classList.add("invisible");
    projectModal.classList.remove("invisible");
    projectModal.classList.add("visible");
}
function cleanInput() {
    projectInput.value = "";
}
function modalInvisible(addProjectBtn) {
    addProjectBtn.classList.remove("invisible");
    addProjectBtn.classList.add("visible");
    projectModal.classList.remove("visible");
    projectModal.classList.add("invisible");
}
// observers
function renderMenu(projects) {
    projectMenu.innerHTML = "";
    projects.forEach((project) => {
        let projectName = project.name;
        createProjectElement(projectName);
    });
}
function createProjectElement(projectName) {
    const elementContainer = document.createElement("div");
    elementContainer.classList.add("project-preview", "task");

    const checkbox = document.createElement("input");
    checkbox.classList.add("project-preview__task-done");
    checkbox.setAttribute("type", "checkbox");

    const nameElement = document.createElement("h4");
    nameElement.classList.add("project-preview__name");
    nameElement.textContent = projectName;

    const opcionContainer = document.createElement("div");
    opcionContainer.classList.add("project__opcion");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "project-preview__trash");

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square", "project-preview__edit");

    elementContainer.appendChild(checkbox);
    elementContainer.appendChild(nameElement);
    elementContainer.appendChild(opcionContainer);
    opcionContainer.appendChild(deleteIcon);
    opcionContainer.appendChild(editIcon);
    projectMenu.appendChild(elementContainer);
}

export { modalVisible, modalInvisible, renderMenu, cleanInput };
