import React from 'react';

const sexString = {
	'Male': '男',
	'Female': '女'
};

const SexView = (props) => {
	const sex = props.sex;
	const showSex = sexString[sex] || '其他';
    return (
        <>
            <span>{showSex}</span>
        </>
    );
}

export default SexView;