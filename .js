// DOM要素の取得
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const progressEl = document.getElementById('progress');
const nextBtn = document.getElementById('next-btn');
const resultArea = document.getElementById('result-area');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// クイズデータ (問題、選択肢、正解)
const quizData = [
    {
        question: "日本で一番高い山は何ですか？",
        options: ["富士山", "北岳", "奥穂高岳", "槍ヶ岳"],
        answer: "富士山"
    },
    {
        question: "日本の首都はどこですか？",
        options: ["大阪", "京都", "東京", "名古屋"],
        answer: "東京"
    },
    {
        question: "日本で一番大きい湖は何ですか？",
        options: ["霞ヶ浦", "琵琶湖", "サロマ湖", "猪苗代湖"],
        answer: "琵琶湖"
    }
    // ここに問題を追加
];

// 状態変数
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
const totalQuestions = 15; // 画像に合わせて15問に設定 (データは3問分)

// 初期化
function initGame() {
    currentQuestionIndex = 0;
    score = 0;
    lives = 3;
    resultArea.classList.add('hide');
    nextBtn.classList.add('hide');
    optionsContainer.classList.remove('hide');
    questionText.classList.remove('hide');
    updateStats();
    showQuestion();
}

// 問題を表示
function showQuestion() {
    // 選択肢をリセット
    optionsContainer.innerHTML = '';
    
    // データが尽きたら最初に戻る（デモ用）
    if (currentQuestionIndex >= quizData.length) {
        currentQuestionIndex = 0; 
    }
    
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    
    // 画像の表示に合わせて 1 / 15 のようにする
    progressEl.innerText = `問題 ${currentQuestionIndex + 1} / ${totalQuestions}`;

    // 選択肢ボタンを作成
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectAnswer(button, currentQuestion.answer));
        optionsContainer.appendChild(button);
    });
}

// 回答を選択
function selectAnswer(selectedButton, correctAnswer) {
    // すべてのボタンを無効化
    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        // 正解のボタンをハイライト
        if (btn.innerText === correctAnswer) {
            btn.classList.add('correct');
        }
    });

    if (selectedButton.innerText === correctAnswer) {
        // 正解
        score++;
        selectedButton.classList.add('correct');
    } else {
        // 不正解
        lives--;
        selectedButton.classList.add('incorrect');
    }

    updateStats();
    
    // 次へボタンを表示
    if (currentQuestionIndex + 1 < totalQuestions && lives > 0) {
        nextBtn.classList.remove('hide');
    } else {
        // ゲーム終了
        showResults();
    }
}

// ステータス（スコア・ライフ）を更新
function updateStats() {
    scoreEl.innerText = `スコア: ${score}`;
    
    let hearts = '';
    for (let i = 0; i < 3; i++) {
        hearts += (i < lives) ? '❤️' : '🖤';
    }
    livesEl.innerHTML = hearts;
}

// 次の問題へ
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex >= totalQuestions || lives <= 0) {
        showResults();
    } else {
        showQuestion();
        nextBtn.classList.add('hide');
    }
});

// 結果表示
function showResults() {
    optionsContainer.classList.add('hide');
    questionText.classList.add('hide');
    nextBtn.classList.add('hide');
    
    finalScoreEl.innerText = score;
    resultArea.classList.remove('hide');
}

// リスタート
restartBtn.addEventListener('click', initGame);

// ゲーム開始
initGame();
