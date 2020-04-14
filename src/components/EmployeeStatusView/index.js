import React from 'react';
import {
  Badge
} from 'antd';
const statusObj= {
	"EMPLOYEE_ON_JOB": {
		name: '在职'
	},
	"EMPLOYEE_LEAVE_JOB": {
		name: '离职'
	}	
};

const error = {
	name: 'error status'
};

const StatusView = (props) => {
	const status = props.status;
	const showStyle = statusObj[status] || error;
    return (
        <>
            <span>{showStyle.name}</span>
        </>
    );
}


export default StatusView;