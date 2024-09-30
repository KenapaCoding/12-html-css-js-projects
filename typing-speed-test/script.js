/** @format */

// ambil element html yang diperlukan dari "ID"
const textToTypeElement = document.getElementById('text-to-type');
const textToType = textToTypeElement.innerHTML.split(' ');
const userInput = document.getElementById('user-input');
const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('time');
const wpmDisplay = document.getElementById('words-per-minute');

console.log(textToType)

let startTime;
let timerInterval;

// function to start test
function startTest() {
	startTime = new Date();
	userInput.value = '';
	userInput.focus();
	timerInterval = setInterval(updateTimer, 1000);
	textToTypeElement.innerHTML = textToType
		.map((word) => `<span>${word}</span>`)
		.join(' ');
}

function updateTimer() {
	const currentTime = new Date();
	const elapsedTime = Math.floor((currentTime - startTime) / 1000);
	timeDisplay.innerText = elapsedTime;
}

function calculateWPM() {
	const wordsTyped = userInput.value.trim().split(/\s+/).length;
	const elapsedTime = Math.floor((new Date() - startTime) / 1000);
	const minutes = elapsedTime / 60;
	const wpm = Math.floor(wordsTyped / minutes);
	wpmDisplay.innerHTML = wpm;
}

function checkInput() {
	const typedText = userInput.value.trim().split(' ');
	const spans = textToTypeElement.querySelectorAll('span');
	typedText.forEach((word, index) => {
		if (spans[index]) {
            if (word === textToType[index]) {
				spans[index].className = 'correct';
			} else {
				spans[index].className = 'incorrect';
			}
		}
	});

	// hapus kelas jika pengguna menghapus tesk yang sudah diketik sebelumnya
	for (let i = typedText.length; i < spans.length; i++) {
		spans[i].className = '';
	}
}

function stopTest() {
	clearInterval(timerInterval);
	calculateWPM();
}

startButton.addEventListener('click', () => {
	startTest();
});

userInput.addEventListener('input', () => {
	checkInput();
	const typedText = userInput.value;
	if (typedText.trim() === textToType.join(' ')) {
		stopTest();
	}
});
