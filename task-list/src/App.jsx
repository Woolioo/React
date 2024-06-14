import { useState } from 'react'

const usedTasks = [{ id: 115566, name: 'Programming', emoji: '💪', color: 'red' }]

export default function App() {
	const [showForm, setShowForm] = useState(false)
	const [tasks, setTasks] = useState(usedTasks)

	function handleAddTask(task) {
		setTasks(tasks => [...tasks, task])
		setShowForm(false)
	}

	function handleShowForm() {
		setShowForm(show => !show)
		console.log('object')
	}

	function handleToggleTask(id) {
		setTasks(tasks => tasks.map(task => (task.id === id ? { ...task, done: !task.done } : task)))
	}

	return (
		<div className='app'>
			<Header />
			<TaskList tasks={tasks} onToggleTask={handleToggleTask} />
			{showForm && <FormAddTask onAddTask={handleAddTask} />}
			<Button onClick={handleShowForm}> {showForm ? 'Close' : 'Add task'} </Button>
			<Stats tasks={tasks}/>
		</div>
	)
}

function Header() {
	return (
		<div className='header'>
			<h2>Task List</h2>
		</div>
	)
}
function TaskList({ tasks, onToggleTask }) {
	return (
		<ul>
			{tasks.map(task => (
				<Task task={task} onToggleTask={onToggleTask} key={task.id} />
			))}
		</ul>
	)
}

function Task({ task, onToggleTask }) {
	const taskNameStyle = {
		textDecoration: task.done ? 'line-through' : 'none',
		color: task.color,
	}
	return (
		<li>
			<input type='checkbox' value={task.done} onChange={() => onToggleTask(task.id)} />
			<h3 style={taskNameStyle}>{task.name}</h3>
			<p>{task.emoji}</p>
		</li>
	)
}

function FormAddTask({ onAddTask }) {
	const [taskName, setTaskName] = useState('')
	const [taskEmoji, setTaskEmoji] = useState('')
	const [taskColor, setTaskColor] = useState('red')
	const [taskDone, setTaskDone] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()

		if (!taskName || !taskEmoji || !taskColor) return

		const id = crypto.randomUUID()
		const newTask = {
			id,
			name: taskName,
			emoji: taskEmoji,
			color: taskColor,
			done: taskDone,
		}

		onAddTask(newTask)
		setTaskName('')
		setTaskEmoji('')
		setTaskColor('')
		setTaskDone(false)
	}
	return (
		<form onSubmit={handleSubmit}>
			<label>Task name: </label>
			<input type='text' placeholder='Task name' value={taskName} onChange={e => setTaskName(e.target.value)} />

			<label>Emoji: </label>
			<input type='text' placeholder='Emoji' value={taskEmoji} onChange={e => setTaskEmoji(e.target.value)} />

			<label> Color: </label>
			<select value={taskColor} onChange={e => setTaskColor(e.target.value)}>
				<option value='red'>red</option>
				<option value='blue'>blue</option>
				<option value='green'>green</option>
			</select>

			<Button>Add</Button>
		</form>
	)
}

function Button({ children, onClick }) {
	return (
		<button className='button' onClick={onClick}>
			{children}
		</button>
	)
}
function Stats({ tasks }) {


	const taskCount = tasks.length
	const completedCount = tasks.filter(t => t.done).length
	const percentCompleted = Math.round((completedCount / taskCount) * 100)

	if (completedCount === 0)
		return (
			<footer>
				<p>You haven't done anything yet!</p>
			</footer>
		)

	return (
		<footer>
			<p className='footerContent'>
				{percentCompleted === 100
					? 'You  are done!'
					: `You have  ${completedCount} out of ${taskCount} tasks completed and thats ${percentCompleted}%.`}
			</p>
		</footer>
	)
}
