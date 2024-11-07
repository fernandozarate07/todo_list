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
    class Requirement {
        constructor(taskName) {
            const taskId = Number(localStorage.getItem("taskRequirementId")) || 1;
            this.id = taskId;
            localStorage.setItem("taskRequirementId", taskId + 1); // Incrementa y guarda el nuevo valor
            this.name = taskName;
            this.status = false;
        }
    }
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
    function editName(projectToEditName, newName) {
        projectToEditName.name = newName;
        saveProjects();
        notify();
    }
    function renderTextArchitecture(textArchitecture) {
        let project = projects.find((project) => project.isSelected === true);
        project.architecture = textArchitecture.value;
        saveProjects();
        notify();
    }
    function renderTextStack(textStack) {
        let project = projects.find((project) => project.isSelected === true);
        project.tecnologiStack = textStack.value;
        saveProjects();
        notify();
    }
    function renderTextNote(textNote) {
        let project = projects.find((project) => project.isSelected === true);
        project.note = textNote.value;
        saveProjects();
        notify();
    }
    function changeDate(projectDateInput) {
        let project = projects.find((project) => project.isSelected === true);
        project.deadLine = projectDateInput.value;
        saveProjects();
        notify();
    }
    function addTaskRequirement(taskName) {
        let project = projects.find((project) => project.isSelected === true);
        const newTask = new Requirement(taskName);
        project.requirements.push(newTask);
        console.log(newTask);
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
        editName,
        renderTextArchitecture,
        renderTextStack,
        renderTextNote,
        changeDate,
        addTaskRequirement,
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
    editName,
    renderTextArchitecture,
    renderTextStack,
    renderTextNote,
    changeDate,
    addTaskRequirement,
} = menuObserver;
export { projects };
