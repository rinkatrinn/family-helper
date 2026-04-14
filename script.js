// script.js

// База задач для утреннего чек-листа
const tasksData = [
    { id: 1, text: '🧴 Полить цветы в гостиной', completed: false },
    { id: 2, text: '🐱 Покормить Шарика', completed: false },
    { id: 3, text: '🚪 Проверить, закрыта ли входная дверь', completed: false },
    { id: 4, text: '🔋 Поставить телефоны на зарядку', completed: false }
];

// Функция для отрисовки списка
function renderTasks() {
    const taskListElement = document.getElementById('taskList');
    // Очищаем контейнер
    taskListElement.innerHTML = '';
    
    // Проходим по массиву задач и создаем HTML
    tasksData.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.dataset.id = task.id;
        
        // Слушатель события на изменение чекбокса
        checkbox.addEventListener('change', function(e) {
            // Меняем статус completed в массиве
            task.completed = e.target.checked;
            // Обновляем внешний вид подписи
            const label = this.nextElementSibling;
            if (e.target.checked) {
                label.classList.add('completed-label');
            } else {
                label.classList.remove('completed-label');
            }
            // Небольшой бонус: анимация радости, если все задачи выполнены
            checkAllCompleted();
        });
        
        const label = document.createElement('label');
        label.textContent = task.text;
        if (task.completed) {
            label.classList.add('completed-label');
        }
        
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);
        taskListElement.appendChild(taskDiv);
    });
}

// Проверка "Все сделано" (для красоты)
function checkAllCompleted() {
    const allCompleted = tasksData.every(task => task.completed);
    if (allCompleted) {
        setTimeout(() => {
            alert('🎉 Отлично! Вся семья справилась с утренними делами. Дом готов к новому дню!');
        }, 100);
    }
}

// Сброс чек-листа на следующий день
document.getElementById('resetTasksBtn').addEventListener('click', function() {
    tasksData.forEach(task => {
        task.completed = false;
    });
    renderTasks();
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});