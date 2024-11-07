import {
    modalMenuInvisible,
    modalMenuVisible,
    renderMenu,
    projectMenu,
    renderProject,
    modalEditnameVisibility,
    inputRequirementVisible,
    inputDependencyVisible,
} from "./vision.js";
import {
    addObservers,
    Project,
    addProject,
    projects,
    deleteProject,
    changeStateinMenu,
    changeStateinProject,
    selectedProject,
    editName,
    renderTextArchitecture,
    renderTextStack,
    renderTextNote,
    changeDate,
    addTaskRequirement,
    changeStateTask,
    deleteTask,
    addTaskDependency,
    changeStateTaskDependency,
    deleteTaskDependency,
} from "./model.js";
// observadores
addObservers(renderMenu); //agregar la funcion renderMenu como un observador
addObservers(renderProject);

// cargar pagina de incio
renderMenu(projects); //renderiza la pagina al entrar y carga los proyectos almazenados en localstorage
renderProject(projects);

// funcionalidad add project
const addProjectBtn = document.querySelector(".menu__add-app-btn");
addProjectBtn.addEventListener("click", (event) => {
    modalMenuVisible(addProjectBtn);
});
const cancelModaltBtn = document.querySelector(".menu__add-app-btn-cancel");
cancelModaltBtn.addEventListener("click", (event) => {
    modalMenuInvisible(addProjectBtn);
});
function getName() {
    return document.querySelector(".menu__add-app-input").value;
}
function validateName(projectName, projects) {
    if (projectName === "") {
        console.log("error: tu nombre esta vacio");
        return false;
    } else if (projects.some((element) => element.name === projectName)) {
        console.log("el nombre esta ocupado intenta otro");
        return false;
    } else {
        return true;
    }
}
const formName = document.getElementById("form-name").addEventListener("submit", (event) => {
    event.preventDefault();
    let projectName = getName();
    const isvalid = validateName(projectName, projects); // para obtener un boleano y utilizarlo en el condicional siguiente
    if (isvalid) {
        modalMenuInvisible(addProjectBtn);
        let newProject = new Project(projectName);
        addProject(newProject);
    } else {
        alert("error");
    }
});
// funcionalid de project menu
projectMenu.addEventListener("click", (event) => {
    // delete funcionalidad
    if (event.target.classList.contains("project-preview__trash")) {
        const id = Number(event.target.dataset.id);
        deleteProject(id);
    }
    // cambiar el estado del proyecto

    if (event.target.classList.contains("project-preview__task-done")) {
        const id = Number(event.target.dataset.id);
        const isChecked = event.target.checked;
        event.stopPropagation(); // Detiene la propagación para que no se llame a selectedProject
        changeStateinMenu(id, isChecked);
        return;
    }
    // selecionar proyecto
    if (event.target.classList.contains("project-preview")) {
        const id = Number(event.target.dataset.id);
        selectedProject(id);
    }
});
// funcionalidad de project

// status
const statusContainer = document.querySelector(".project__status-btn-container").addEventListener("click", (event) => {
    const projectToChangeStatus = projects.find((project) => project.isSelected === true);
    changeStateinProject(event, projectToChangeStatus);
});
// name
const editNameBtm = document.querySelector(".project__edit-btn");
editNameBtm.addEventListener("click", () => {
    modalEditnameVisibility();
});
const saveBtn = document.querySelector(".project__project-editname-submit-btn");
const inputEditName = document.querySelector(".project__input-modal-name");
saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let projectToEditName = projects.find((project) => project.isSelected === true);
    let newName = inputEditName.value;
    const isvalid = validateName(newName, projects);
    if (isvalid) {
        editName(projectToEditName, newName);
        modalEditnameVisibility();
    } else {
        alert("error");
    }
});
// architecture
const textArchitecture = document.querySelector(".project__architecture-description");
textArchitecture.addEventListener("input", () => {
    renderTextArchitecture(textArchitecture);
});
// technologyStack
const textStack = document.querySelector(".project__technology-description");
textStack.addEventListener("input", () => {
    renderTextStack(textStack);
});
// note
const textNote = document.querySelector(".project__note-textarea");
textNote.addEventListener("input", () => {
    renderTextNote(textNote);
});
// date
const projectDateInput = document.querySelector(".project__date");
projectDateInput.addEventListener("input", () => {
    changeDate(projectDateInput);
});
// requirement
const addRequirementBtn = document.querySelector(".project__requirements-add-btn");
const saveRequirementBtn = document.querySelector(".project-save-btn");
const inputRequirement = document.querySelector(".input-task-requirement");

addRequirementBtn.addEventListener("click", () => {
    inputRequirementVisible();
    inputRequirement.value = "";
});

saveRequirementBtn.addEventListener("click", () => {
    const taskName = inputRequirement.value;
    addTaskRequirement(taskName);
    inputRequirementVisible();
});
const requirementTaskContainer = document.querySelector(".project__requirements-tasks");
requirementTaskContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("task-checkbox")) {
        const taskId = Number(event.target.dataset.id);
        const project = projects.find((project) => project.isSelected === true);
        const isChecked = event.target.checked;
        event.stopPropagation();
        changeStateTask(taskId, isChecked, project);
        return;
    }
    if (event.target.classList.contains("task-delete")) {
        console.log("funciona el event");
        const taskId = Number(event.target.dataset.id);
        const project = projects.find((project) => project.isSelected === true);
        deleteTask(taskId, project);
    }
});
// dependency
const addDependencyBtn = document.querySelector(".project__dependency-add-btn");
const saveDependencyBtn = document.querySelector(".project__dependency-save-btn");
const inputDependency = document.querySelector(".input-task-dependency");

addDependencyBtn.addEventListener("click", () => {
    inputDependencyVisible();
    inputDependency.value = "";
});

saveDependencyBtn.addEventListener("click", () => {
    const taskName = inputDependency.value;
    addTaskDependency(taskName);
    inputDependencyVisible();
});
const dependencyTaskContainer = document.querySelector(".project__dependency-tasks");
dependencyTaskContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("task-checkbox")) {
        const taskId = Number(event.target.dataset.id);
        const project = projects.find((project) => project.isSelected === true);
        const isChecked = event.target.checked;
        event.stopPropagation();
        changeStateTaskDependency(taskId, isChecked, project);
        return;
    }
    if (event.target.classList.contains("task-delete")) {
        console.log("funciona el event");
        const taskId = Number(event.target.dataset.id);
        const project = projects.find((project) => project.isSelected === true);
        deleteTaskDependency(taskId, project);
    }
});
