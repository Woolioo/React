import { useState } from 'react'

function App() {
	const [currQuestion, setCurrQuestion] = useState(0)
	const [showScore, setShowScore] = useState(false)
	const [score, setScore] = useState(0)

	function handleAnswerButtonClick(correctAnswer) {
		if (correctAnswer === true) {
			setScore(score + 1)
		}

		const nextQuestion = currQuestion + 1

		if (nextQuestion < questions.length) {
			setCurrQuestion(nextQuestion)
		} else {
			setShowScore(true)
		}
	}

	function handleRestart() {
		setScore(0)
		setCurrQuestion(0)
		setShowScore(false)
	}

	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'Paris', correctAnswer: true },
				{ answerText: 'Lyon', correctAnswer: false },
				{ answerText: 'Bordeaux', correctAnswer: false },
			],
		},

		{
			questionText: 'What is the capital of Spain?',
			answerOptions: [
				{ answerText: 'Sevilla', correctAnswer: false },
				{ answerText: 'Barcelona', correctAnswer: false },
				{ answerText: 'Madrit', correctAnswer: true },
			],
		},

		{
			questionText: 'What is the capital of Germany?',
			answerOptions: [
				{ answerText: 'Hamburg', correctAnswer: false },
				{ answerText: 'Munchen', correctAnswer: false },
				{ answerText: 'Berlin', correctAnswer: true },
			],
		},

		{
			questionText: 'What is the capital of Poland?',
			answerOptions: [
				{ answerText: 'Mielno', correctAnswer: false },
				{ answerText: 'Warsaw', correctAnswer: true },
				{ answerText: 'Krakow', correctAnswer: false },
			],
		},

		{
			questionText: 'What is the capital of Russia?',
			answerOptions: [
				{ answerText: 'Moscow', correctAnswer: true },
				{ answerText: 'St. Petersburg', correctAnswer: false },
				{ answerText: 'Yaroslavl', correctAnswer: false },
			],
		},
	]

	return (
		<div className='appContainer'>
			<h1>QUIZ-APP</h1>
			<div className='app'>
				{showScore ? (
					<div className='result'>
						You scored {score} out of {questions.length} questions.
						<p>{score === 5 ? 'Congratulations! You knew everything!' : ''}</p>
						<button onClick={handleRestart}>Try again!</button>
					</div>
				) : (
					<>
						<div className='leftBlock'>
							<span>Question {currQuestion + 1}</span>/{questions.length}
							<br />
							<p>{questions[currQuestion].questionText}</p>
						</div>
						<div className='rightBlock'>
							{questions[currQuestion].answerOptions.map(option => (
								<button key={option.answerText} onClick={() => handleAnswerButtonClick(option.correctAnswer)}>
									{option.answerText}
								</button>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default App
