import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'

import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'

import './App.css'

moment.locale('en-GB')
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
class App extends Component {
	constructor() {
		super()
		//Declare state variables here
	}

	componentDidMount() {
		//Fetch events from database here
	}
	render() {
		//const { localizer } = this.props
		//	const localizer = BigCalendar.momentLocalizer(moment)
		const cal_events = []
		return (
			<div className="App">
				<h1 className="App-title">Appointment Calendar</h1>
				<div style={{ height: 950 }}>
					<BigCalendar
						localizer={localizer}
						events={cal_events}
						step={30}
						defaultView="week"
						views={['month', 'week', 'day']}
						defaultDate={new Date()}
					/>
				</div>
			</div>
		)
	}
}
export default App
