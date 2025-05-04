const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task");
const clearAllBtn = document.getElementById("clear-tasks");

clearAllBtn.style.display = "none";

window.onload = function() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToUI(task); // ✅ add full task with delete button
    });
};


document.getElementById("firstform").addEventListener("submit", function (e) {
    e.preventDefault();
    const tasktext = taskInput.value.trim();
    if (tasktext !== "") {
        addTaskToUI(tasktext);

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(tasktext);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskInput.value = "";

        clearAllBtn.style.display = "block";
    }
});
function addTaskToUI(tasktext) {
    const li = document.createElement("li");
    li.textContent = tasktext;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete", "btn", "btn-sm", "btn-danger", "ms-auto");

    deleteBtn.addEventListener("click", function () {
        li.remove();

        // Remove from localStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task !== tasktext);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        if (tasks.length === 0) {
            clearAllBtn.style.display = "none";
        }
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    clearAllBtn.style.display = "block";
}

clearAllBtn.addEventListener("click", function () {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
    clearAllBtn.style.display = "none";
});