// localStorage.clear();
// aca se guarda la logica de persistencia y local storage
function loadProjects() {
    const storageProjects = localStorage.getItem("projects");
    return storageProjects ? JSON.parse(storageProjects) : [];
}
const projects = loadProjects(); // creamos el array de projects

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
    console.log(projects);
}
saveProjects(); // guardamos el array creado en localstorage

// Existen en este modulo dos iffe que contienen la logica de dos patrones observadores
const menuObserver = (() => {
    // aca encontraras la logica de observer
    const observers = [];

    function addObservers(obs) {
        observers.push(obs);
        console.log(observers);
    }
    function notify() {
        observers.forEach((obs) => {
            obs(projects);
        });
    }
    // esta clase funciona para crear instacia de objetos del tipo project
    class Project {
        static idCounter = 1;
        constructor(projectName) {
            this.id = Project.idCounter++;
            // this.focus = true;
            this.requirements = [];
            this.name = projectName;
            this.status = false;
            this.architecture = "";
            this.tecnologiStack = "";
            this.deadLine = undefined;
            this.note = "";
            this.dependency = [];
            this.isSelected = false;
        }
    }
    //aca se ecnuentra la logica que sirve para cambiar el estado del sujeto
    function addProject(newProject) {
        projects.push(newProject);
        saveProjects();
        notify();
    }
    function deleteProject(id) {
        let projectToDelete = projects.findIndex((project) => project.id === id);
        projects.splice(projectToDelete, 1);
        saveProjects();
        notify();
    }
    function changeState(id, isChecked) {
        let projectToChange = projects.find((project) => project.id === id);
        projectToChange.status = isChecked;
        saveProjects();
        notify();
        console.log(projectToChange.status);
    }
    function selectedProject(id) {
        projects.forEach((project) => {
            project.isSelected = false;
        });
        let projectToSelect = projects.find((project) => project.id === id);
        if (!projectToSelect) return;
        projectToSelect.isSelected = true;
        saveProjects();
        notify();
    }

    return { addObservers, Project, addProject, deleteProject, changeState, selectedProject };
})();
export const { addObservers, Project, addProject, deleteProject, changeState, selectedProject } = menuObserver;
export { projects };
