import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './index.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

const DragAndDropCalendar = withDragAndDrop(Calendar)

const localizer = momentLocalizer(moment)
// import ExampleControlSlot from '../ExampleControlSlot'

const events = [

]




class Resource extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            events,
            selected: false,
            formats : {
                selectRangeFormat:"8:00am — 2:00pm"
            }
        }
        this.moveEvent = this.moveEvent.bind(this)
        this.newEvent = this.newEvent.bind(this)
    }

    handleSelect = ({ props, start, end, resourceId }) => {
        // const title = window.prompt('请输入会议名称')
        // console.log(new Date(start).toISOString(), new Date(end).toISOString(), title)
        let list = this.state.events
        if (this.state.selected) {
            list.splice(list.length - 1, 1)
            this.setState({
                event: list
            })
        }

        // if (title) {
            let occupy = false
            for (const item of list) {
                if (
                    (start <= item.start && end >= item.end && resourceId === item.resourceId) ||
                    (end >= item.start && end <= item.end && resourceId === item.resourceId) ||
                    (start >= item.start && start <= item.end && resourceId === item.resourceId) ||
                    (start >= item.start && end <= item.end && resourceId === item.resourceId)
                ) {
                    // alert("选择错误")
                    console.log("选择错误")
                    occupy = true
                    return false
                }
            }
            if (!occupy) {
                console.log(111)
                this.setState({
                    events: [
                        ...this.state.events,
                        {
                            start,
                            end,
                            // title,
                            resourceId
                        },
                    ],
                    selected: true
                })

                this.props.parent(this, {
                    start,
                    end,
                    // title,
                    resourceId
                })
            }
        // }
    }

    moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
        const { events } = this.state

        const idx = events.indexOf(event)
        let allDay = event.allDay

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = false
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const updatedEvent = { ...event, start, end, allDay }
        // console.log(updatedEvent)

        this.props.parent(this, updatedEvent)

        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)

        this.setState({
            events: nextEvents,
        })

        // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
    }

    resizeEvent = ({ event, start, end }) => {
        const { events } = this.state

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })

        this.setState({
            events: nextEvents,
        })

        for (const item of events) {
            if (item.id === event.id) {
                this.props.parent(this, { ...item, start, end })
                return
            }
        }
        // console.log("这里是滑动的");

        //alert(`${event.title} was resized to ${start}-${end}`)
    }

    navigate(val){
        console.log("时间改变："+val)
    }

    newEvent(event) {
        // let idList = this.state.events.map(a => a.id)
        // let newId = Math.max(...idList) + 1
        // let hour = {
        //   id: newId,
        //   title: 'New Event',
        //   allDay: event.slots.length == 1,
        //   start: event.start,
        //   end: event.end,
        // }
        // this.setState({
        //   events: this.state.events.concat([hour]),
        // })
    }
    render() {
        return (
            <>
                <DragAndDropCalendar
                    selectable
                    events={this.state.events}
                    localizer={localizer}
                    defaultView={Views.DAY}
                    views={['day']}
                    step={30}
                    defaultDate={new Date()}
                    resources={this.props.resourceMap}
                    resourceIdAccessor="resourceId"
                    resourceTitleAccessor="resourceTitle"
                    // onSelectEvent={event => alert(event.title)}
                    onSelectSlot={this.handleSelect}
                    resizable
                    allDayAccessor="false"
                    onEventDrop={this.moveEvent}
                    onEventResize={this.resizeEvent}
                    onDragStart={console.log}
                    onNavigate={this.navigate}
                    // formats={this.state.formats}
                    eventPropGetter={
                        (event, start, end, isSelected) => {
                            // console.log(event, start, end, isSelected)
                            // console.log(start)
                            // console.log(end)
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