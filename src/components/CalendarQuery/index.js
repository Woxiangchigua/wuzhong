import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './index.css';

const localizer = momentLocalizer(moment)
// import ExampleControlSlot from '../ExampleControlSlot'

const events = [
    {
        id: 0,
        title: 'Board meeting',
        start: new Date('2020-02-19T13:00:00.000Z'),
        end: new Date('2020-02-19T14:30:00.000Z'),
        resourceId: 'meetingRoom-1',
    },
    {
        id: 0,
        title: 'hello world',
        start: new Date('2020-02-19T10:00:00.000Z'),
        end: new Date('2020-02-19T11:30:00.000Z'),
        resourceId: 'meetingRoom-2',
    },
]




class Resource extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            events:props.events,
            selected: false
        }
  
    }

    render() {
        return (
            <>
                <Calendar
                    
                    events={this.props.events}
                    localizer={localizer}
                    defaultView={Views.DAY}
                    views={['day', 'work_week']}
                    step={30}
                    defaultDate={new Date()}
                    resources={this.props.resourceMap}
                    resourceIdAccessor="resourceId"
                    resourceTitleAccessor="resourceTitle"
                    eventPropGetter={
                        (event, start, end, isSelected) => {
                            let newStyle = {
                                backgroundColor: "#6fcc84",
                                color: 'white',
                                borderRadius: "0px",
                                border: "none"
                            };

                            if (
                                new Date(start).getTime() <= new Date().getTime() &&
                                new Date(end).getTime() >= new Date().getTime()
                            ) {
                                newStyle.backgroundColor = "red"
                            }

                            return {
                                className: "",
                                style: newStyle
                            };
                        }
                    }

                />
            </>
        )
    }
}

export default Resource