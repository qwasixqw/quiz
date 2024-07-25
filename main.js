const questions = [
	{
		question: 'Какой язык работает в браузере?',
		answers: ['Java', 'C', 'Python', 'JavaScript'],
		correct: 4,
	},
	{
		question: 'Что означает CSS?',
		answers: ['Central Style Sheets', 'Cascading Style Sheets', 'Cascading Simple Sheets', 'Cars SUVs Sailboats'],
		correct: 2,
	},
	{
		question: 'Что означает HTML?',
		answers: ['Hypertext Markup Language', 'Hypertext Markdown Language', 'Hyperloop Machine Language', 'Helicopters Terminals Motorboats Lamborginis'],
		correct: 1,
	},
	{
		question: 'В каком году был создан JavaScript?',
		answers: ['1996', '1995', '1994', 'все ответы неверные'],
		correct: 2,
	},
];

// находим элементы на странице
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitButton = document.querySelector('#submit');

// переменные игры
let score = 0;
let questionIndex = 0;

// обработка событий
submitButton.addEventListener('click', checkAnswer);

// вызов функции
clearPage();
showQuestion();

// очищение страницы
function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

// создание вопроса
function showQuestion() {
	const headerTemplate = `<h2 class="title">${questions[questionIndex].question}</h2>`;
	headerContainer.innerHTML = headerTemplate;
	let count = 1;

	for (const item of questions[questionIndex].answers) {
		const questionTemplate = `
			<li>
				<label>
					<input value="${count++}" type="radio" class="answer" name="answer" />
					<span>${item}</span>
				</label>
			</li>
		`;

		listContainer.innerHTML += questionTemplate;
	}
}

// проверка ответа
function checkAnswer() {
	const checkedRadio = listContainer.querySelector('.answer:checked');

	if (!checkedRadio) {
		submitButton.blur();
		return;
	}

	const userAnswer = Number(checkedRadio.value);

	if (userAnswer === questions[questionIndex].correct) {
		score += 1;
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}
}

// результаты
function showResults() {
	let title, message, scoreResult;

	if (score === questions.length) {
		title = 'Поздравляем 🎉';
		message = 'Вы ответили верно на все вопросы 👌👍😁';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохо 😊';
		message = `Вы ответили правильно на ${score} вопроса`;
	} else {
		title = 'Плохо 😢';
		message = `Вы ответили неправильно на ${questions.length - score} вопросов`;
	}
	
	scoreResult = score + ' ' + getCorrectWordEnding(score, ['балл', 'балла', 'баллов']);

	// Шаблон для отображения результатов
	const resultTemplate = `
        <h2 class="title">${title}</h2>
        <h3 class="summary">${message}</h3>
        <p class="result">${scoreResult}</p>
    `;

	headerContainer.innerHTML = resultTemplate;

	submitButton.blur();
	submitButton.innerHTML = 'Начать заново';

	submitButton.addEventListener('click', () => {
		history.go(0);
	});
}

// определение окончания слова
function getCorrectWordEnding(number, endings) {
	if (number % 10 === 1 && number % 100 !== 11) {
		return endings[0];
	} else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
		return endings[1];
	} else {
		return endings[2];
	}
}