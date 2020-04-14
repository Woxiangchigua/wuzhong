import React from 'react';
import {
  Badge
} from 'antd';


const StatusView = (props) => {
	const status = props.status;
	console.log(status)
    return (
        <>
            <span>{status===true?"是":"否"}</span>
        </>
    );
}


export default StatusView;