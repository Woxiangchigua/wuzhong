import React, { Component, useState } from 'react'
import './index.css'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
import dateFormat from '../../ utils/dateFormat'
import { Popover, Radio } from 'antd';


const query = graphql`
    query Meeting_MeetingListQuery(
        $beginTime: DateTime
        $endTime: DateTime
    ){
        preordainMeetingList(beginTime: $beginTime,endTime: $endTime){
          edges{
            applyUserId,
            beginTime,
            configuration,
            createdAt,
            deletedAt,
            endTime,
            id,
            intro,
            meetingName,
            meetingRoomId,
            number,
            organizer,
            review,
            reviewUserId,
            status,
            updatedAt
          }
        }
    }`
export default function Meeting(props) {
    console.log(props)
    let propsDate=props.date
    function MeetingList(props) {
        let [meetingList, setMeetingList] = useState(props.meetingList);
        // let [date, setDate] = useState(dateFormat("YYYY-mm-dd", new Date()));
        let [date, setDate] = useState(propsDate);
        console.log(date)
        // var date = dateFormat("YYYY-mm-dd", new Date())
        function chooseTime(e) {
            date=e.target.value
            setDate(e.target.value)
            fetchQuery(props.environment, query, {
                beginTime: new Date(e.target.value + 'T01:00:00Z').toISOString(),
                endTime: new Date(e.target.value + 'T13:00:00Z').toISOString(),
            }).then(data => {
                // list = data.preordainMeetingList.edges
                setMeetingList(data.preordainMeetingList)
            });
        }
        function getWeekDate(val) {
            let now = new Date();
            now.setTime(now.getTime() + val * 1 * 24 * 60 * 60 * 1000);
            let day = now.getDay();
            let weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            let week = weeks[day];
            return week;
        }

        let dateArr = []
        for (let i = 0; i < 7; i++) {
            let day2 = new Date()
            day2.setDate(day2.getDate() + i)
            let item = {
                week: getWeekDate(i),
                date: dateFormat("YYYY-mm-dd", day2)
            }
            dateArr.push(item)
        }
        dateArr[0].week = "今天"

        let dateArr2 = dateArr.map((item) => {
            return (
                <Radio.Button value={item.date} key={item.date}>
                    <div>
                        {item.week}
                    </div>
                </Radio.Button>)

        }
        )
        let list = meetingList.edges
        
        let todayTime = date + 'T01:00:00Z'
        let list1 = [], list2 = [], list3 = [], list4 = [], list5 = [], list6 = [], list7 = []
        let itenList1 = [{ meetingRoomId: "item1-1" }, { meetingRoomId: "item1-2" }, { meetingRoomId: "item1-3" }, { meetingRoomId: "item1-4" }, { meetingRoomId: "item1-5" }, { meetingRoomId: "item1-6" }, { meetingRoomId: "item1-7" }, { meetingRoomId: "item1-8" }, { meetingRoomId: "item1-9" }, { meetingRoomId: "item1-10" }, { meetingRoomId: "item1-11" }, { meetingRoomId: "item1-12" }, { meetingRoomId: "item1-13" }, { meetingRoomId: "item1-14" }, { meetingRoomId: "item1-15" }, { meetingRoomId: "item1-16" }, { meetingRoomId: "item1-17" }, { meetingRoomId: "item1-18" }, { meetingRoomId: "item1-19" }, { meetingRoomId: "item1-20" }, { meetingRoomId: "item1-21" }, { meetingRoomId: "item1-22" }, { meetingRoomId: "item1-23" }, { meetingRoomId: "item1-24" }]
        let itenList2 = [{ meetingRoomId: "item2-1" }, { meetingRoomId: "item2-2" }, { meetingRoomId: "item2-3" }, { meetingRoomId: "item2-4" }, { meetingRoomId: "item2-5" }, { meetingRoomId: "item2-6" }, { meetingRoomId: "item2-7" }, { meetingRoomId: "item2-8" }, { meetingRoomId: "item2-9" }, { meetingRoomId: "item2-10" }, { meetingRoomId: "item2-11" }, { meetingRoomId: "item2-12" }, { meetingRoomId: "item2-13" }, { meetingRoomId: "item2-14" }, { meetingRoomId: "item2-15" }, { meetingRoomId: "item2-16" }, { meetingRoomId: "item2-17" }, { meetingRoomId: "item2-18" }, { meetingRoomId: "item2-19" }, { meetingRoomId: "item2-20" }, { meetingRoomId: "item2-21" }, { meetingRoomId: "item2-22" }, { meetingRoomId: "item2-23" }, { meetingRoomId: "item2-24" }]
        let itenList3 = [{ meetingRoomId: "item3-1" }, { meetingRoomId: "item3-2" }, { meetingRoomId: "item3-3" }, { meetingRoomId: "item3-4" }, { meetingRoomId: "item3-5" }, { meetingRoomId: "item3-6" }, { meetingRoomId: "item3-7" }, { meetingRoomId: "item3-8" }, { meetingRoomId: "item3-9" }, { meetingRoomId: "item3-10" }, { meetingRoomId: "item3-11" }, { meetingRoomId: "item3-12" }, { meetingRoomId: "item3-13" }, { meetingRoomId: "item3-14" }, { meetingRoomId: "item3-15" }, { meetingRoomId: "item3-16" }, { meetingRoomId: "item3-17" }, { meetingRoomId: "item3-18" }, { meetingRoomId: "item3-19" }, { meetingRoomId: "item3-20" }, { meetingRoomId: "item3-21" }, { meetingRoomId: "item3-22" }, { meetingRoomId: "item3-23" }, { meetingRoomId: "item3-24" }]
        let itenList4 = [{ meetingRoomId: "item4-1" }, { meetingRoomId: "item4-2" }, { meetingRoomId: "item4-3" }, { meetingRoomId: "item4-4" }, { meetingRoomId: "item4-5" }, { meetingRoomId: "item4-6" }, { meetingRoomId: "item4-7" }, { meetingRoomId: "item4-8" }, { meetingRoomId: "item4-9" }, { meetingRoomId: "item4-10" }, { meetingRoomId: "item4-11" }, { meetingRoomId: "item4-12" }, { meetingRoomId: "item4-13" }, { meetingRoomId: "item4-14" }, { meetingRoomId: "item4-15" }, { meetingRoomId: "item4-16" }, { meetingRoomId: "item4-17" }, { meetingRoomId: "item4-18" }, { meetingRoomId: "item4-19" }, { meetingRoomId: "item4-20" }, { meetingRoomId: "item4-21" }, { meetingRoomId: "item4-22" }, { meetingRoomId: "item4-23" }, { meetingRoomId: "item4-24" }]
        let itenList5 = [{ meetingRoomId: "item5-1" }, { meetingRoomId: "item5-2" }, { meetingRoomId: "item5-3" }, { meetingRoomId: "item5-4" }, { meetingRoomId: "item5-5" }, { meetingRoomId: "item5-6" }, { meetingRoomId: "item5-7" }, { meetingRoomId: "item5-8" }, { meetingRoomId: "item5-9" }, { meetingRoomId: "item5-10" }, { meetingRoomId: "item5-11" }, { meetingRoomId: "item5-12" }, { meetingRoomId: "item5-13" }, { meetingRoomId: "item5-14" }, { meetingRoomId: "item5-15" }, { meetingRoomId: "item5-16" }, { meetingRoomId: "item5-17" }, { meetingRoomId: "item5-18" }, { meetingRoomId: "item5-19" }, { meetingRoomId: "item5-20" }, { meetingRoomId: "item5-21" }, { meetingRoomId: "item5-22" }, { meetingRoomId: "item5-23" }, { meetingRoomId: "item5-24" }]
        let itenList6 = [{ meetingRoomId: "item6-1" }, { meetingRoomId: "item6-2" }, { meetingRoomId: "item6-3" }, { meetingRoomId: "item6-4" }, { meetingRoomId: "item6-5" }, { meetingRoomId: "item6-6" }, { meetingRoomId: "item6-7" }, { meetingRoomId: "item6-8" }, { meetingRoomId: "item6-9" }, { meetingRoomId: "item6-10" }, { meetingRoomId: "item6-11" }, { meetingRoomId: "item6-12" }, { meetingRoomId: "item6-13" }, { meetingRoomId: "item6-14" }, { meetingRoomId: "item6-15" }, { meetingRoomId: "item6-16" }, { meetingRoomId: "item6-17" }, { meetingRoomId: "item6-18" }, { meetingRoomId: "item6-19" }, { meetingRoomId: "item6-20" }, { meetingRoomId: "item6-21" }, { meetingRoomId: "item6-22" }, { meetingRoomId: "item6-23" }, { meetingRoomId: "item6-24" }]
        let itenList7 = [{ meetingRoomId: "item7-1" }, { meetingRoomId: "item7-2" }, { meetingRoomId: "item7-3" }, { meetingRoomId: "item7-4" }, { meetingRoomId: "item7-5" }, { meetingRoomId: "item7-6" }, { meetingRoomId: "item7-7" }, { meetingRoomId: "item7-8" }, { meetingRoomId: "item7-9" }, { meetingRoomId: "item7-10" }, { meetingRoomId: "item7-11" }, { meetingRoomId: "item7-12" }, { meetingRoomId: "item7-13" }, { meetingRoomId: "item7-14" }, { meetingRoomId: "item7-15" }, { meetingRoomId: "item7-16" }, { meetingRoomId: "item7-17" }, { meetingRoomId: "item7-18" }, { meetingRoomId: "item7-19" }, { meetingRoomId: "item7-20" }, { meetingRoomId: "item7-21" }, { meetingRoomId: "item7-22" }, { meetingRoomId: "item7-23" }, { meetingRoomId: "item7-24" }]

        for (const item of list) {
            if (item.meetingRoomId === "meetingRoom-1") {
                list1.push(item)
            } else if (item.meetingRoomId === "meetingRoom-2") {
                list2.push(item)
            } else if (item.meetingRoomId === "meetingRoom-3") {
                list3.push(item)
            } else if (item.meetingRoomId === "meetingRoom-4") {
                list4.push(item)
            } else if (item.meetingRoomId === "meetingRoom-5") {
                list5.push(item)
            } else if (item.meetingRoomId === "meetingRoom-6") {
                list6.push(item)
            } else if (item.meetingRoomId === "meetingRoom-7") {
                list7.push(item)
            }
        }

        for (const item of list1) {
            let index = (new Date(item.beginTime).getTime() - new Date(todayTime).getTime()) / 1000 / 1800
            let num = (new Date(item.endTime).getTime() - new Date(item.beginTime).getTime()) / 1000 / 1800
            for (let i = 0; i < num; i++) {
                itenList1.splice(index + i, 1, item)
            }
        }

        for (const item of list2) {
            let index = (new Date(item.beginTime).getTime() - new Date(todayTime).getTime()) / 1000 / 1800
            let num = (new Date(item.endTime).getTime() - new Date(item.beginTime).getTime()) / 1000 / 1800
            for (let i = 0; i < num; i++) {
                itenList2.splice(index + i, 1, item)
            }
        }

        for (const item of list3) {
            let index = (new Date(item.beginTime).getTime() - new Date(todayTime).getTime()) / 1000 / 1800
            let num = (new Date(item.endTime).getTime() - new Date(item.beginTime).getTime()) / 1000 / 1800
            for (let i = 0; i < num; i++) {
                itenList3.splice(index + i, 1, item)
            }
        }
        for (const item of list4) {
            let index = (new Date(item.beginTime).getTime() - new Date(todayTime).getTime()) / 1000 / 1800
            let num = (new Date(item.endTime).getTime() - new Date(item.beginTime).getTime()) / 1000 / 1800
            for (let i = 0; i < num; i++) {
                itenList4.splice(index + i, 1, item)
            }
        }
        for (const item of list5) {
            let index = (new Date(item.beginTime).getTime() - new Date(todayTime).getTime()) / 1000 / 1800
            let num = (new Date(item.endTime).getTime() - new Date(item.beginTime).getTime()) / 1000 / 1800
            for (let i = 0; i < num; i++) {
                itenList5.splice(index + i, 1, item)
            }
        }
        for (const item of list6) {
            let index = (new Date(item.beginTime).getTime() - new Date(todayTime).getTime()) / 1000 / 1800
            let num = (new Date(item.endTime).getTime() - new Date(item.beginTime).getTime()) / 1000 / 1800
            for (let i = 0; i < num; i++) {
                itenList6.splice(index + i, 1, item)
            }
        }
        for (const item of list7) {
            let index = (new Date(item.beginTime).getTime() - new Date(todayTime).getTime()) / 1000 / 1800
            let num = (new Date(item.endTime).getTime() - new Date(item.beginTime).getTime()) / 1000 / 1800
            for (let i = 0; i < num; i++) {
                itenList7.splice(index + i, 1, item)
            }
        }

        let item1 = itenList1.map((item, index) => {
            if (item.review) {
                return (
                    <Popover content={dateFormat("HH:MM", new Date(item.beginTime)) + "-" + dateFormat("HH:MM", new Date(item.endTime))} title={item.meetingName} trigger="hover">
                        <td
                            className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                            key={item.meetingRoomId}>
                        </td>
                    </Popover>
                )
            }
            else {
                return (
                    <td
                        className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                        key={item.meetingRoomId}>
                    </td>
                )
            }
        }
        )
        let item2 = itenList2.map((item, index) => {
            if (item.review) {
                return (
                    <Popover content={dateFormat("HH:MM", new Date(item.beginTime)) + "-" + dateFormat("HH:MM", new Date(item.endTime))} title={item.meetingName} trigger="hover">
                        <td
                            className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                            key={item.meetingRoomId}>
                        </td>
                    </Popover>)
            }
            else {
                return (
                    <td
                        className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                        key={item.meetingRoomId}>
                    </td>
                )
            }
        }
        )
        let item3 = itenList3.map((item, index) => {
            if (item.review) {
                return (
                    <Popover content={dateFormat("HH:MM", new Date(item.beginTime)) + "-" + dateFormat("HH:MM", new Date(item.endTime))} title={item.meetingName} trigger="hover">
                        <td
                            className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                            key={item.meetingRoomId}>
                        </td>
                    </Popover>)
            }
            else {
                return (
                    <td
                        className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                        key={item.meetingRoomId}>
                    </td>
                )
            }
        }
        )
        let item4 = itenList4.map((item, index) => {
            if (item.review) {
                return (
                    <Popover content={dateFormat("HH:MM", new Date(item.beginTime)) + "-" + dateFormat("HH:MM", new Date(item.endTime))} title={item.meetingName} trigger="hover">
                        <td
                            className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                            key={item.meetingRoomId}>
                        </td>
                    </Popover>)
            }
            else {
                return (
                    <td
                        className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                        key={item.meetingRoomId}>
                    </td>
                )
            }
        }
        )
        let item5 = itenList5.map((item, index) => {
            if (item.review) {
                return (
                    <Popover content={dateFormat("HH:MM", new Date(item.beginTime)) + "-" + dateFormat("HH:MM", new Date(item.endTime))} title={item.meetingName} trigger="hover">
                        <td
                            className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                            key={item.meetingRoomId}>
                        </td>
                    </Popover>)
            }
            else {
                return (
                    <td
                        className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                        key={item.meetingRoomId}>
                    </td>
                )
            }
        }
        )
        let item6 = itenList6.map((item, index) => {
            if (item.review) {
                return (
                    <Popover content={dateFormat("HH:MM", new Date(item.beginTime)) + "-" + dateFormat("HH:MM", new Date(item.endTime))} title={item.meetingName} trigger="hover">
                        <td
                            className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                            key={item.meetingRoomId}>
                        </td>
                    </Popover>)
            }
            else {
                return (
                    <td
                        className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                        key={item.meetingRoomId}>
                    </td>
                )
            }
        }
        )
        let item7 = itenList7.map((item, index) => {
            if (item.review) {
                return (
                    <Popover content={dateFormat("HH:MM", new Date(item.beginTime)) + "-" + dateFormat("HH:MM", new Date(item.endTime))} title={item.meetingName} trigger="hover">
                        <td
                            className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                            key={item.meetingRoomId}>
                        </td>
                    </Popover>)
            }
            else {
                return (
                    <td
                        className={item.review ? item.review === "MEETING_PASS" ? "pass" : "nopass" : "no_order"}
                        key={item.meetingRoomId}>
                    </td>
                )
            }
        }
        )


        return (
            <div>
                <div className="top">
                    <Radio.Group defaultValue={propsDate} size="large" onChange={chooseTime}>
                        {dateArr2}
                    </Radio.Group>
                    <div className="status">
                        <div>已预订（未审核）</div>
                        <div className="nopass1 free"></div>
                        <div style={{ marginLeft: 10 }}>已审核</div>
                        <div className="pass1 free"></div>
                        <div style={{ marginLeft: 10 }}>现空闲</div>
                        <div className="free"></div>
                    </div>
                </div>
                <table className="meeingTable">
                    <thead>
                        <tr>
                            <th>会议室名称</th>
                            <th colSpan="2">09:00</th>
                            <th colSpan="2">10:00</th>
                            <th colSpan="2">11:00</th>
                            <th colSpan="2">12:00</th>
                            <th colSpan="2">13:00</th>
                            <th colSpan="2">14:00</th>
                            <th colSpan="2">15:00</th>
                            <th colSpan="2">16:00</th>
                            <th colSpan="2">17:00</th>
                            <th colSpan="2">18:00</th>
                            <th colSpan="2">19:00</th>
                            <th colSpan="2">20:00</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="name">1号会议室</td>
                            {item1}
                        </tr>
                        <tr>
                            <td className="name">2号会议室</td>
                            {item2}
                        </tr>
                        <tr>
                            <td className="name">3号会议室</td>
                            {item3}
                        </tr>
                        <tr>
                            <td className="name">4号会议室</td>
                            {item4}
                        </tr>
                        <tr>
                            <td className="name">5号会议室</td>
                            {item5}
                        </tr>
                        <tr>
                            <td className="name">6号会议室</td>
                            {item6}
                        </tr>
                        <tr>
                            <td className="name">7号会议室</td>
                            {item7}
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }




    const environment=props.environment

    return (
        <div>

            <QueryRenderer
                environment={props.environment}
                query={query}
                variables={{
                    beginTime: propsDate+"T01:00:00Z",
                    endTime: propsDate+"T13:00:00Z"
                }}
                render={({ error, props, retry }) => {
                    if (error) {
                        return (
                            <div>
                                <h1>Error!</h1><br />{error.message}
                            </div>)
                    } else if (props) {

                        if (props.preordainMeetingList) {

                            return (
                                <MeetingList environment={environment} meetingList={props.preordainMeetingList} />

                            )
                        }
                    }
                    return <div>Loading</div>;
                }}
            />
        </div>
    )

}