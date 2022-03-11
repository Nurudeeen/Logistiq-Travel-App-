import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
	const history = useHistory()
	//const [quote, setQuote] = useState('')
	const [distance, setDistance] = useState('')
	const [time, setTime] = useState('')
    const [origin, setOrigin] = useState('')
	const [destination, setDestination] = useState('')

	async function populateQuote() {
		const req = await fetch('http://localhost:5000/magic', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setDistance(data.distance)
			setTime(data.time)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			populateQuote()
		}else{
			localStorage.removeItem('token')
				history.replace('/login')
		}
	}, [])

	async function updateQuote(event) {
		event.preventDefault()

		const req = await fetch('http://localhost:5000/magic', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				origin: origin,
				destination: destination
			}),
		})

		const data = await req.json()
		if (data.status === 'ok') {
			//setQuote(tempQuote)
			setDistance(data.distance)
			setTime(data.time)
			setOrigin('')
			setDestination('')
		} else {
			alert(data.error)
		}
	}

	return (
		<div>
			{/* <h1>Your quote: {quote || 'No quote found'}</h1> */}
			<h3>How far you are: {distance}</h3>
			<h3>Time of Arrival: {time}</h3>
			<form onSubmit={updateQuote}>
				<input
				    type="text"
					value={origin}
					onChange={(e) => setOrigin(e.target.value)}
					placeholder="origin"
				/>
				<br />
				<input
				    type="text"
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
					placeholder="destination"
				/>
				<br />
				<input type="submit" value="Magic" />
			</form>
		</div>
	)
}

export default Dashboard