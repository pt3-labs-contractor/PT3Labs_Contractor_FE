import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'

import moment from 'moment'
import events from './components/events'
import ExampleControlSlot from './components/ExampleControlSlot'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'

import './App.css'

//moment.locale('en') // en-GB
const localizer = BigCalendar.momentLocalizer(moment)
//BigCalendar.momentLocalizer(moment)

// const MyCalendar = props => (
// 	<div style={{ height: 700 }}>
// 		<BigCalendar
// 			localizer={localizer}
// 			//events={myEventsList}
// 			startAccessor="start"
// 			endAccessor="end"
// 		/>
// 	</div>
//)

const propTypes = {}

class App extends Component {
	constructor(props) {
		super(props)

		this.state = { events }
	}

	handleSelect = ({ start, end }) => {
		const title = window.prompt('New Event name')
		if (title)
			this.setState({
				events: [
					...this.state.events,
					{
						start,
						end,
						title
					}
				]
			})
	}

	componentDidMount() {
		//Fetch events from database here
	}

	render() {
		//moment.locale('en')
		//const { localizer } = this.props

		//const localizer = BigCalendar.momentLocalizer(moment)
		const cal_events = []

		return (
			<div className="App">
				<h1 className="App-title">Appointment Calendar</h1>
				<div style={{ height: 950 }}>
					<BigCalendar
						selectable
						localizer={localizer}
						events={this.state.events}
						//	events={cal_events}
						step={30}
						defaultView="week"
						views={['month', 'week', 'day']}
						defaultDate={new Date()}
						onSelectEvent={event => alert(event.title)}
						onSelectSlot={this.handleSelect}
					/>
				</div>
			</div>
		)
	}
}

App.propTypes = propTypes

export default App
