import React from 'react';
import {
  Badge
} from 'antd';
const statusObj= {
	"ENABLE": {
		name: '可用',
		color: '#87d068',
		icon: 'success'
	},
	"DISABLE": {
		name: '禁用',
		color: '#d9d9d9',
		icon: 'default'
	}	
};

const error = {
	name: 'error status',
	color: '#fa5363'
};

const StatusView = (props) => {
	const status = props.status;
	const showStyle = statusObj[status] || error;
    return (
        <>
            <Badge status={showStyle.icon} /><span>{showStyle.name}</span>
        </>
    );
}


export default StatusView;