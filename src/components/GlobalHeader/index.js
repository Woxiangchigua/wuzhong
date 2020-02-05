import React from 'react';
import Avatar from './AvatarDropdown';

const GlobalHeaderRight = (props) => {
    return (
        <>
            <Avatar user={props.user} />
        </>
    );
}


export default GlobalHeaderRight;