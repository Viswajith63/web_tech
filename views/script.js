// Fetch data from backend and populate todo list
function fetchTodos() {
    fetch('/todos')
        .then(response => response.json())
        .then(data => {
            const todoList = document.getElementById('todo-list');
            todoList.innerHTML = '';
            data.forEach(todo => {
                const listItem = document.createElement('li');
                listItem.textContent = todo.task;
                todoList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Handle form submission
document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task');
    const task = taskInput.value;
    if (task.trim() !== '') {
        const formData = new FormData();
        formData.append('task', task);
        formData.append('completed', false);
        fetch('/todos', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                fetchTodos(); // Refresh todo list after adding new todo
                taskInput.value = ''; // Clear input field
            } else {
                console.error('Failed to add todo');
            }
        })
        .catch(error => console.error('Error adding todo:', error));
    }
});

// Fetch todos when the page loads
fetchTodos();
