// aca se guarda la logica de persistencia y local storage
function loadProjects() {
    const storageProjects = localStorage.getItem("projects");
    return storageProjects ? JSON.parse(storageProjects) : [];
}
const projects = loadProjects(); // creamos el array de projects

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
}
saveProjects(); // guardamos el array creado en localstorage

// Existen en este modulo dos iffe que contienen la logica de dos patrones observadores
const menuObserver = (() => {
    // aca encontraras la logica de observer
    const observers = [];

    function addObservers(obs) {
        observers.push(obs);
    }
    function notify() {
        observers.forEach((obs) => {
            obs(projects);
        });
    }
    // esta clase funciona para crear instacia de objetos del tipo project
    class Project {
        constructor(projectName) {
            const currentId = Number(localStorage.getItem("projectIdCounter")) || 1;
            this.id = currentId;
            localStorage.setItem("projectIdCounter", currentId + 1); // Incrementa y guarda el nuevo valor
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
    function changeStateinMenu(id, isChecked) {
        let projectToChange = projects.find((project) => project.id === id);
        projectToChange.status = isChecked;
        saveProjects();
        notify();
        console.log(projectToChange.status);
    }
    function changeStateinProject(event, projectToChangeStatus) {
        if (projectToChangeStatus) {
            // Verifica que haya un proyecto seleccionado
            if (event.target.classList.contains("btn-inprogres")) {
                projectToChangeStatus.status = false;
            }
            if (event.target.classList.contains("btn-finished")) {
                projectToChangeStatus.status = true;
            }
            saveProjects();
            notify();
        } else {
            console.warn("No project is selected.");
        }
    }
    function selectedProject(id) {
        projects.forEach((project) => {
            project.isSelected = false;
        });
        let projectToSelect = projects.find((project) => project.id === id);
        projectToSelect.isSelected = true;
        console.log(projectToSelect.id);
        saveProjects();
        notify();
    }
    return {
        addObservers,
        Project,
        addProject,
        deleteProject,
        changeStateinMenu,
        selectedProject,
        changeStateinProject,
    };
})();
export const {
    addObservers,
    Project,
    addProject,
    deleteProject,
    changeStateinMenu,
    selectedProject,
    changeStateinProject,
} = menuObserver;
export { projects };
