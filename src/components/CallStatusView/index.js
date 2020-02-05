import React from 'react';

const statusString = [{
	name: '未处理',
	color: '#1d73c6'
},{
	name: '已完成',
	color: '#1b9542'
}];

const error = {
	name: 'error status',
	color: '#fa5363'
};

const CallStatusView = (props) => {
	const status = props.status;
	const showStyle = statusString[status] || error;
    return (
        <>
            <span style={{color:showStyle.color}}>{showStyle.name}</span>
        </>
    );
}


export default CallStatusView;