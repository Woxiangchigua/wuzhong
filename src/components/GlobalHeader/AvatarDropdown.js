import React from 'react';
import { Avatar, Menu, Spin } from 'antd';
import Icon  from '@ant-design/icons';
import HeaderDropdown from '../HeaderDropdown';
import useLocalStorage from 'react-use-localstorage';
import {
    useHistory,
} from "react-router-dom";
import man from '../../img/man.jpg'

export default function AvatarDropdown(props) {
    const [token, setToken] = useLocalStorage('token', '');
    let history = useHistory();

    var onMenuClick = (event) => {
        const { key } = event;
        if (key === 'logout') {
            setToken("");
            setTimeout(() => history.push("/"), 100);
            return;
        }
    };

    const menuHeaderDropdown = (
        <Menu selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key="settings">
                <Icon type="setting" />
                个人信息
            </Menu.Item>
            <Menu.Item key="center">
                <Icon type="user" />
                修改密码
                {/* <FormattedMessage id="menu.account.center" defaultMessage="account center" /> */}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
                <Icon type="logout" />
                退出
                    {/* <FormattedMessage id="menu.account.logout" defaultMessage="logout" /> */}
            </Menu.Item>
        </Menu>
    );

    return props.user.user && props.user.user.name ? (
        <HeaderDropdown overlay={menuHeaderDropdown}>
            <span >                
                <Avatar className="user-icon" shape="square" src={man} />
                <span  className="user-name" style={{color: '#fff'}}>{props.user.user.name}，你好</span>
            </span>
        </HeaderDropdown >
    ) : (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        );
}
