
const menulist = [{
	name: '分局主页',
	icon: 'compass',
	key: 'callcenter',
	role: ['employee'],
	items: [{
		name: '分局主页',
		icon: '',
		key: 'calllist',
		link: '/Home',
		role: ['employee']
	}, {
		name: '普通用户会议页面',
		icon: '',
		key: 'userlist',
		link: '/Meeting/Userlist',
		role: ['employee']
	}, {
		name: '领导会议页面',
		icon: '',
		key: 'leaderlist',
		link: '/Meeting/Leaderlist',
		role: ['employee']
	}]
}, {
	name: '会议管理',
	icon: 'mail',
	key: 'meeting',
	role: ['employee'],
	items: [{
		name: '会议室管理',
		icon: '',
		key: 'meetinglist',
		link: '/Meeting/List',
		role: ['employee']
	},
	// {
	// 	name: '会议室申请',
	// 	icon: '',
	// 	key: 'creatmetting',
	// 	link: '/Meeting/Creatmeeting',
	// 	role: ['employee']
	// }, 
	{
		name: '会议纪要',
		icon: '',
		key: 'mettingminutes',
		link: '/Meeting/Meetingminutes',
		role: ['employee']
	},
	{
		name: '申请人会议主页',
		icon: '',
		key: 'applicant',
		link: '/Meeting/Applicant',
		role: ['employee']
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