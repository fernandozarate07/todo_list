import { modalInvisible, modalVisible, renderMenu, cleanInput } from "./vision.js";
import { addObservers, Project, addProject, projects } from "./model.js";
// observers function
addObservers(renderMenu); //agregar render menu como funcion observadora
// load page
renderMenu(projects);

// add new project
const addProjectBtn = document.querySelector(".menu__add-app-btn");
addProjectBtn.addEventListener("click", (event) => {
    cleanInput();
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
    const isvalid = validateName(projectName, projects);
    if (isvalid) {
        modalInvisible(addProjectBtn);
        let newProject = new Project(projectName);
        addProject(newProject);
    } else {
        alert("error");
    }
});
