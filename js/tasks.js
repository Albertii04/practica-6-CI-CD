document.addEventListener('DOMContentLoaded', function() {
    // Función para añadir una nueva tarea
    function addTask() {
        // Obtener el input de la tarea y la lista de tareas
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');
        const taskText = taskInput.value.trim(); // Eliminar espacios en blanco

        // Verificar que el texto de la tarea no esté vacío
        if (taskText !== "") {
            // Crear un nuevo div para la tarea
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-item';

            // Crear un checkbox para la tarea
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'form-check-input';

            // Crear una etiqueta para el texto de la tarea
            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.textContent = taskText;

            // Añadir evento para tachar el texto cuando el checkbox está marcado
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    label.style.textDecoration = 'line-through';
                } else {
                    label.style.textDecoration = 'none';
                }
                saveTasks();
            });

            // Añadir el checkbox y la etiqueta al div de la tarea
            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(label);
            // Añadir el div de la tarea a la lista de tareas
            taskList.appendChild(taskDiv);

            // Limpiar el input de la tarea
            taskInput.value = '';

            // Guardar las tareas en el local storage
            saveTasks();
        }
    }

    // Función para guardar las tareas en el local storage
    function saveTasks() {
        const taskList = document.getElementById('task-list');
        const tasks = [];
        taskList.querySelectorAll('.task-item').forEach(taskItem => {
            const checkbox = taskItem.querySelector('.form-check-input');
            const label = taskItem.querySelector('.form-check-label');
            tasks.push({
                text: label.textContent,
                completed: checkbox.checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Función para cargar las tareas desde el local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'form-check-input';
            checkbox.checked = task.completed;

            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.textContent = task.text;

            if (task.completed) {
                label.style.textDecoration = 'line-through';
            }

            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    label.style.textDecoration = 'line-through';
                } else {
                    label.style.textDecoration = 'none';
                }
                saveTasks();
            });

            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(label);
            document.getElementById('task-list').appendChild(taskDiv);
        });
    }

    // Cargar las tareas cuando se carga la página
    loadTasks();

    // Hacer que la función addTask esté disponible globalmente
    window.addTask = addTask;
});