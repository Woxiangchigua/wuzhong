import React from 'react'
import LeaderHome from '../Leaderhome/index';
import Publicportal from '../Publicportal/index';
import Departhome from '../Departhome/index';
import { Switch } from "react-router-dom";
var newlist = {
    "admin":LeaderHome,
    "管理人员":LeaderHome,
    "内勤":Departhome,
    "普通用户":Publicportal,
}
export default function Home(props) {
    // console.log(props.loginuser.username)
    // var username = props.loginuser.username
    // if(username == "管理人员")
    let Home1 = newlist[props.loginuser.username]
    return (
        <>
            <Home1 {...props}></Home1>
        </>
    )
}