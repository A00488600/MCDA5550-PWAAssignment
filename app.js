document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text}</span>
                <button onclick="removeTask(${index})">Remove</button>
            `;
            taskList.appendChild(li);
        });
    };

    // Add task to localStorage
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = "";
        loadTasks();

        // Trigger install prompt after user action
        if (deferredPrompt) {
            showInstallPrompt();
        }
    });

    // Remove task from localStorage
    window.removeTask = (index) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };

    loadTasks();  // Initial load of tasks
});

// Store install event globally
let deferredPrompt = null;

// Listen for beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault(); // Prevent default prompt behavior
    deferredPrompt = event; // Store the event

    // Wait for the user to interact with the page (e.g., click anywhere)
    document.addEventListener("click", showInstallPrompt, { once: true });
});

// Function to show install prompt
function showInstallPrompt() {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Show install prompt

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the PWA installation");
            } else {
                console.log("User dismissed the PWA installation");
            }
            deferredPrompt = null; // Reset
        });
    }
}
