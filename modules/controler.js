import {
    // variables
    containerProjectMenu,
    // funciones
    toggleMenuVisibility,
    toggleRequirementVisibility,
    toggleDependencyVisibility,
    toggleEditNameVisibility,
    renderProjectMenu,
    renderProjectContent,
} from "./vision.js";
import {
    // funciones
    addObservers,
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
addObservers(renderProjectMenu); //agregar la funcion renderMenu como un observador
addObservers(renderProjectContent);

// cargar pagina de incio
renderProjectMenu(projects); //renderiza la pagina al entrar y carga los proyectos almazenados en localstorage
renderProjectContent(projects);

// funcionalidad add project
const addProjectBtn = document.querySelector(".menu__add-app-btn");
addProjectBtn.addEventListener("click", (event) => {
    toggleMenuVisibility();
});
const cancelModaltBtn = document.querySelector(".menu__add-app-btn-cancel");
cancelModaltBtn.addEventListener("click", (event) => {
    toggleMenuVisibility();
});
function getName() {
    return document.querySelector(".menu__add-app-input").value;
}
function getProject() {
    const project = projects.find((project) => project.isSelected === true);
    return project;
}
function getProjectID(event) {
    const id = Number(event.target.dataset.id);
    return id;
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
    const name = getName();
    const isvalid = validateName(name, projects);
    if (isvalid) {
        toggleMenuVisibility();
        addProject(name);
    } else {
        alert("error");
    }
});
// funcionalid de project menu
containerProjectMenu.addEventListener("click", (event) => {
    // delete funcionalidad
    if (event.target.classList.contains("project-preview__trash")) {
        const id = getProjectID(event);
        deleteProject(id);
    }
    // cambiar el estado del proyecto

    if (event.target.classList.contains("project-preview__task-done")) {
        const id = getProjectID(event);
        const isChecked = event.target.checked;
        event.stopPropagation();
        changeStateinMenu(id, isChecked);
        return;
    }
    // selecionar proyecto
    if (event.target.classList.contains("project-preview")) {
        const id = getProjectID(event);
        selectedProject(id);
    }
});
// status
const statusContainer = document.querySelector(".project__status-btn-container").addEventListener("click", (event) => {
    const projectToChangeStatus = getProject();
    changeStateinProject(event, projectToChangeStatus);
});
// name
const editNameBtm = document.querySelector(".project__edit-btn");
const saveBtn = document.querySelector(".project__project-editname-submit-btn");
const inputEditName = document.querySelector(".project__input-modal-name");

editNameBtm.addEventListener("click", () => {
    toggleEditNameVisibility();
});
saveBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let projectToEditName = getProject();
    let newName = inputEditName.value;
    const isvalid = validateName(newName, projects);
    if (isvalid) {
        editName(projectToEditName, newName);
        toggleEditNameVisibility();
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
    toggleRequirementVisibility();
    inputRequirement.value = "";
});

saveRequirementBtn.addEventListener("click", () => {
    const taskName = inputRequirement.value;
    addTaskRequirement(taskName);
    toggleRequirementVisibility();
});
const requirementTaskContainer = document.querySelector(".project__requirements-tasks");
requirementTaskContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("task-checkbox")) {
        const taskId = getProjectID(event);
        const project = getProject();
        const isChecked = event.target.checked;
        event.stopPropagation();
        changeStateTask(taskId, isChecked, project);
        return;
    }
    if (event.target.classList.contains("task-delete")) {
        console.log("funciona el event");
        const taskId = getProjectID(event);
        const project = getProject();
        deleteTask(taskId, project);
    }
});
// dependency
const addDependencyBtn = document.querySelector(".project__dependency-add-btn");
const saveDependencyBtn = document.querySelector(".project__dependency-save-btn");
const inputDependency = document.querySelector(".input-task-dependency");

addDependencyBtn.addEventListener("click", () => {
    toggleDependencyVisibility();
    inputDependency.value = "";
});

saveDependencyBtn.addEventListener("click", () => {
    const taskName = inputDependency.value;
    addTaskDependency(taskName);
    toggleDependencyVisibility();
});
const dependencyTaskContainer = document.querySelector(".project__dependency-tasks");
dependencyTaskContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("task-checkbox")) {
        const taskId = getProjectID(event);
        const project = getProject();
        const isChecked = event.target.checked;
        event.stopPropagation();
        changeStateTaskDependency(taskId, isChecked, project);
        return;
    }
    if (event.target.classList.contains("task-delete")) {
        const taskId = getProjectID(event);
        const project = getProject();
        deleteTaskDependency(taskId, project);
    }
});
