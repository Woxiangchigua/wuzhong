
const menulist = [{
	name: '分局主页',
	icon: '',
	key: 'callcenter',
	role: ['costomeruser'],
	items: [{
		name: '分局主页',
		icon: '',
		key: 'calllist',
		link: '/Home',
		role: ['costomeruser']
	}]
},{
	name: '会议管理',
	icon: '',
	key: 'meeting',
	role: ['costomeruser'],
	items: [{
		name: '会议室管理',
		icon: '',
		key: 'meetinglist',
		link: '/Meeting/List',
		role: ['costomeruser']
	}, {
		name: '会议室申请',
		icon: '',
		key: 'creatmeeting',
		link: '/Meeting/Creatmeeting',
		role: ['costomeruser']
	}, {
		name: '会议纪要',
		icon: '',
		key: 'mettingminutes',
		link: '/Meeting/Meetingminutes',
		role: ['costomeruser']
	}, {
		name: '普通用户会议页面',
		icon: '',
		key: 'userlist',
		link: '/Meeting/Userlist',
		role: ['costomeruser']
	}, {
		name: '领导会议页面',
		icon: '',
		key: 'leaderlist',
		link: '/Meeting/Leaderlist',
		role: ['costomeruser']
	}]
}];

const getMyMenuList = (lype) => {
	let defaultOpenKeys = [];
	let list = [];
	menulist.forEach((m) => {
		if (m.role && m.role.indexOf(lype) > -1) {
			const pm = {
				name: m.name,
				icon: m.icon,
				key: m.key,
				role: m.rol,
				items: []
			};
			m.items.forEach((ml) => {
				if (ml.role && ml.role.indexOf(lype) > -1) {
					pm.items.push(ml);
				}
			});
			list.push(pm);
		}
	});
	return {
		list: list,
		defaultOpenKeys: defaultOpenKeys
	};
}


export default { getMyMenuList };