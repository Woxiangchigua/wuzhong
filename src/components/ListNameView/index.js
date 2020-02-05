import React from 'react';
import { Avatar } from 'antd';
import boy from '../../img/boy.png';
import girl from '../../img/girl.png';
const ListNameView = (props) => {
	const sex = props.sex;
	const name = props.name;
    return (
        <>
            <Avatar src={sex==='Male'?boy:girl} /> {name}
        </>
    );
}


export default ListNameView;