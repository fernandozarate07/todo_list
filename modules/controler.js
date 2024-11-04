import { modalInvisible, modalVisible, renderMenu, cleanInput, projectMenu, renderProject } from "./vision.js";
import {
    addObservers,
    Project,
    addProject,
    projects,
    deleteProject,
    changeStateinMenu,
    changeStateinProject,
    selectedProject,
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
    cleanInput(); // borra el valor del input
    modalVisible(addProjectBtn);
});
const cancelModaltBtn = document.querySelector(".menu__add-app-btn-cancel");
cancelModaltBtn.addEventListener("click", (event) => {
    modalInvisible(addProjectBtn);
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
        console.log(projectName);
        return true;
    }
}
const formName = document.getElementById("form-name").addEventListener("submit", (event) => {
    event.preventDefault();
    let projectName = getName();
    const isvalid = validateName(projectName, projects); // para obtener un boleano y utilizarlo en el condicional siguiente
    if (isvalid) {
        modalInvisible(addProjectBtn);
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
const statusContainer = document.querySelector(".project__status-btn-container").addEventListener("click", (event) => {
    const projectToChangeStatus = projects.find((project) => project.isSelected === true);
    changeStateinProject(event, projectToChangeStatus);
});
