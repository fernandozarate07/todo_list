// localStorage.clear();
// load projecs
function loadProjects() {
    const storageProjects = localStorage.getItem("projects");
    return storageProjects ? JSON.parse(storageProjects) : [];
}
const projects = loadProjects();

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
    console.log(projects);
}
saveProjects();

// Existen en este modulo dos iffe que contienen la logica de dos patrones observadores
const menuObserver = (() => {
    // observers
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
    // proyect objet
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
        }
    }
    // state changers
    function addProject(newProject) {
        projects.push(newProject);
        saveProjects();
        notify();
    }
    // function editName(id, newName) {
    //     const project = projects.find((project) => project.id === id);
    //     if (project) {
    //         project.name = newName;
    //     } else {
    //         console.log(`No se encontró un proyecto con el id: ${id}`);
    //     }
    // }
    // function deleteProject() {}

    return { addObservers, Project, addProject };
})();
export const { addObservers, Project, addProject } = menuObserver;
export { projects };
