# PT3Labs_Contractor_FE

Front End

yarn add react-big-calendar

Note: we need to add a localizer to use its library. Moment.js is used in this case

## Moment.js

```js
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment)

const MyCalendar = props => (
	<div>
		<BigCalendar
			localizer={localizer}
			events={myEventsList}
			startAccessor='start'
			endAccessor='end'
		/>
	</div>
)
```

## Custom Styling

Out of the box you can include the compiled css files and be up and running. But, sometimes, you may want to style
Big Calendar to match your application styling. For this reason SASS files are included with Big Calendar.

```
  @import 'react-big-calendar/lib/sass/styles';
  @import 'react-big-calendar/addons/dragAndDrop/styles'; // if using DnD
```
