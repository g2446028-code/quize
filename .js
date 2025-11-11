document.addEventListener('DOMContentLoaded', () => {
    const optionsContainer = document.getElementById('options-container');
    const options = document.querySelectorAll('.option-item');
    let hasAnswered = false;

    options.forEach(option => {
        option.addEventListener('click', () => {
            // すでに回答済みであれば何もしない
            if (hasAnswered) {
                return;
            }

            const isCorrect = option.getAttribute('data-answer') === 'correct';
            
            // 回答済みに設定
            hasAnswered = true;

            // すべての選択肢をクリック不可にする
            options.forEach(opt => opt.classList.add('disabled'));

            if (isCorrect) {
                // 正解の場合
                option.classList.add('correct');
                
                // 正解のメッセージなどをここで表示できますが、今回はスタイル変更のみに留めます。
                // 例: alert('正解です！');
            } else {
                // 不正解の場合
                option.classList.add('incorrect');
                
                // 正解の選択肢もハイライト表示する
                document.querySelector('.option-item[data-answer="correct"]').classList.add('correct');

                // 例: alert('残念、不正解です。正解は富士山です。');
            }
        });
    });
});
