import React from 'react';
import {
    Link
} from "react-router-dom";
import { Menu } from 'antd';
import {Icon}  from '@ant-design/compatible';
import MenuConfig from './config';

const MyMenu = (props) => {
	// const loginType = props.user.id.split('-')[0];
	const loginType = props.user.username;
	const myMenu = MenuConfig.getMyMenuList(loginType);
	
	return (
	<Menu
	    mode="inline"
	    defaultSelectedKeys={['1']}
	    defaultOpenKeys={[]}
	    style={{ height: '100%', borderRight: 0 }}
	    theme="dark"
	>
	{
		myMenu.list.map((m)=>{
			return (
				<Menu.SubMenu
			        key={m.key}
			        title={
			            <span>
			                <Icon type={m.icon} style={{ fontSize: '15px'}}/>
			                <span style={{ fontSize: '15px'}}>{m.name}</span>
			            </span>
			        }
			    >
			    	{
			    		m.items.map((d)=>{
			    			return (
			    				<Menu.Item key={d.key}><Link to={d.link}>{d.name}</Link></Menu.Item>
			    			);
			    		})
			    	}
			    </Menu.SubMenu>

			);
		})
	}
	</Menu>
)};

export default MyMenu;
