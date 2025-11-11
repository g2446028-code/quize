document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const taskList = document.getElementById('task-list');

    // 1. ローカルストレージからタスクを読み込む
    loadTasks();

    // フォーム送信（タスク追加）時の処理
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // フォームのデフォルトの送信を防ぐ
        
        const taskText = todoInput.value.trim(); // 入力値（前後の空白削除）

        if (taskText !== '') {
            addTask(taskText); // タスクを追加
            saveTasks();       // 保存
            todoInput.value = ''; // 入力欄を空にする
        }
    });

    // タスクを追加する関数（DOM操作）
    function addTask(text, isCompleted = false) {
        // li要素（タスク項目）を作成
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (isCompleted) {
            taskItem.classList.add('completed');
        }

        // タスクテキスト部分を作成
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = text;
        
        // テキストクリックで完了/未完了を切り替え
        taskTextSpan.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks(); // 状態を保存
        });

        // 削除ボタンを作成
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';
        
        // 削除ボタンクリックでタスクを削除
        deleteBtn.addEventListener('click', () => {
            taskItem.remove(); // DOMから削除
            saveTasks();     // 削除後の状態を保存
        });

        // li要素にテキストとボタンを追加
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteBtn);

        // ul（タスク一覧）にli要素を追加
        taskList.appendChild(taskItem);
    }

    // 2. タスクをローカルストレージに保存する関数
    function saveTasks() {
        const tasks = [];
        // 現在のDOMの状態を読み取って配列に保存
        document.querySelectorAll('.task-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        
        // 配列をJSON文字列に変換してローカルストレージに保存
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }

    // 3. ローカルストレージからタスクを読み込む関数
    function loadTasks() {
        // 保存されているデータを取得（なければnull）
        const savedTasks = localStorage.getItem('todoTasks');
        
        if (savedTasks) {
            // JSON文字列を配列にパース（変換）
            const tasks = JSON.parse(savedTasks);
            
            // 配列の各要素を画面に描画
            tasks.forEach(task => {
                addTask(task.text, task.completed);
            });
        }
    }
});
