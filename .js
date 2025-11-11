// クイズデータ (画像の問題を参考に作成)
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
    // クイズデータをここに追加していく...
];

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 15; // アプリの総問題数

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
    // データが尽きたら終了
    if (currentQuestionIndex >= quizData.length) {
        // 全問終了後の処理
        questionText.textContent = `クイズ終了！あなたのスコアは ${score} 点です。`;
        optionsContainer.innerHTML = ''; // 選択肢を消す
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
        button.addEventListener('click', () => checkAnswer(button, option, currentQuiz.answer));
        optionsContainer.appendChild(button);
    });
}

// 答えをチェックする関数
function checkAnswer(clickedButton, selectedOption, correctAnswer) {
    // 全てのボタンを無効化（二重クリック防止）
    disableOptions();

    if (selectedOption === correctAnswer) {
        // 正解
        clickedButton.classList.add('correct');
        score++;
        scoreDisplay.textContent = score;
    } else {
        // 不正解
        clickedButton.classList.add('incorrect');
        // 正解のボタンを探してハイライト
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