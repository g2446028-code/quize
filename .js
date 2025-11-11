// クイズデータ
const quizData = [
    {
        question: "日本で一番高い山は何ですか？",
        options: ["富士山", "北岳", "奥穂高岳", "槍ヶ岳"],
        answer: "富士山"
    },
    {
        question: "本州と四国を結ぶ橋のうち、最も東にあるのはどれですか？",
        options: ["瀬戸大橋", "来島海峡大橋", "明石海峡大橋", "大鳴門橋"],
        answer: "明石海峡大橋"
    },
    {
        question: "日本で最も面積の大きい都道府県はどこですか？",
        options: ["岩手県", "福島県", "長野県", "北海道"],
        answer: "北海道"
    }
    // ここにクイズデータを追加してください（合計15問推奨）
];

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 15; // アプリの総問題数（quizDataの数に合わせて調整してください）

// DOM要素の取得
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreDisplay = document.getElementById('score');
const currentQuestionDisplay = document.getElementById('current-question');
const totalQuestionsDisplay = document.getElementById('total-questions');

// 初期設定
totalQuestionsDisplay.textContent = totalQuestions;

// 問題を表示する関数
function loadQuestion() {
    // 全問終了後の処理
    if (currentQuestionIndex >= totalQuestions || currentQuestionIndex >= quizData.length) {
        questionText.textContent = `クイズ終了！最終スコアは ${score} 点です。`;
        optionsContainer.innerHTML = '';
        currentQuestionDisplay.textContent = Math.min(currentQuestionIndex + 1, totalQuestions); // 15/15など表示
        return;
    }
    
    // 現在の問題データを取得
    const currentQuiz = quizData[currentQuestionIndex];
    
    // 問題文と問題番号の更新
    questionText.textContent = currentQuiz.question;
    currentQuestionDisplay.textContent = currentQuestionIndex + 1;
    
    // 選択肢コンテナを空にする
    optionsContainer.innerHTML = '';

    // 選択肢ボタンを作成して追加
    currentQuiz.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option;
        // イベントリスナーを設定
        button.addEventListener('click', () => checkAnswer(button, option, currentQuiz.answer));
        optionsContainer.appendChild(button);
    });
}

// 答えをチェックする関数
function checkAnswer(clickedButton, selectedOption, correctAnswer) {
    // 全てのボタンを無効化
    disableOptions();

    if (selectedOption === correctAnswer) {
        // 正解
        clickedButton.classList.add('correct');
        score++;
        scoreDisplay.textContent = score;
    } else {
        // 不正解
        clickedButton.classList.add('incorrect');
        // 正解のボタンをハイライト
        highlightCorrectAnswer(correctAnswer);
    }

    // 1秒後に次の問題へ
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
}

// 全てのボタンを無効化する関数
function disableOptions() {
    Array.from(optionsContainer.children).forEach(button => {
        button.classList.add('disabled');
    });
}

// 正解のボタンをハイライトする関数
function highlightCorrectAnswer(correctAnswer) {
    Array.from(optionsContainer.children).forEach(button => {
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        }
    });
}

// アプリ起動時に最初の問題を読み込む
loadQuestion();
