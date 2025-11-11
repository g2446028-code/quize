const quizData = [
    // 問題1: 画像のクイズ
    {
        question: "日本で一番高い山は何ですか？",
        options: [
            { text: "富士山", isCorrect: true },
            { text: "北岳", isCorrect: false },
            { text: "奥穂高岳", isCorrect: false },
            { text: "槍ヶ岳", isCorrect: false }
        ],
        choiceLabels: ["A", "B", "C", "D"]
    }
    // ここに他の問題を追加することで、クイズを拡張できます。
];

let currentQuestionIndex = 0;
let hasAnswered = false;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    // ページロード時に実行される初期設定
    
    // スコアと問題数を設定
    const totalQuestionsElement = document.getElementById('total-questions');
    if (totalQuestionsElement) {
        // HTMLの "問題 1 / 15" の "15" の部分を実際のデータ数で上書き
        totalQuestionsElement.textContent = quizData.length; 
    }
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('score').textContent = score;

    // 初めての問題を読み込む
    loadQuestion(currentQuestionIndex);
});

/**
 * 指定されたインデックスの問題をHTMLに表示し、ボタンを生成する関数
 */
function loadQuestion(index) {
    hasAnswered = false;
    const question = quizData[index];
    const optionsContainer = document.getElementById('options-container');

    document.getElementById('question-text').textContent = question.question;
    optionsContainer.innerHTML = ''; // 以前のボタンをクリア

    question.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        
        const choiceLabel = question.choiceLabels[i];
        // ボタンの内容を "A 富士山" の形式で設定
        button.innerHTML = `<span class="choice-label">${choiceLabel}</span> <span class="choice-text">${option.text}</span>`;
        
        // 正誤判定用のデータを追加
        button.dataset.correct = option.isCorrect;

        // 【重要】ここでボタンにクリックイベントを割り当てています
        button.addEventListener('click', handleAnswer); 
        
        optionsContainer.appendChild(button);
    });
}

/**
 * ボタンがクリックされたときに実行される関数
 */
function handleAnswer(event) {
    if (hasAnswered) return; // 二重クリック防止

    hasAnswered = true;
    const clickedButton = event.currentTarget;
    const isCorrect = clickedButton.dataset.correct === 'true';
    const allButtons = document.querySelectorAll('.option-button');

    // 回答後、すべてのボタンを無効化
    allButtons.forEach(button => {
        button.removeEventListener('click', handleAnswer);
        button.disabled = true;
        button.classList.add('disabled');
    });

    // 正誤判定とスタイルの適用
    if (isCorrect) {
        clickedButton.classList.add('correct');
        score++; // スコア加算
        document.getElementById('score').textContent = score;
    } else {
        clickedButton.classList.add('incorrect');
        // 不正解の場合、正解のボタンも緑色にする
        const correctAnswerButton = document.querySelector('.option-button[data-correct="true"]');
        if (correctAnswerButton) {
            correctAnswerButton.classList.add('correct');
        }
    }
    
    // オプション: 1.5秒後に次の問題へ自動で進む（コメントアウトを外せば有効になります）
    /*
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            document.getElementById('current-question').textContent = currentQuestionIndex + 1;
            loadQuestion(currentQuestionIndex);
        } else {
            alert('クイズ終了！あなたのスコアは ' + score + '点です。');
        }
    }, 1500); 
    */
}
