
const menulist = [{
	name: '分局主页',
	icon: 'compass',
	key: 'callcenter',
	role: ['admin','管理人员','申请人','普通用户','部门领导'],
	items: [{
		name: '分局主页',
		icon: '',
		key: 'calllist',
		link: '/Home',
		role: ['admin','管理人员','申请人','普通用户','部门领导']
	}]
},
{
	name: '会议室申请',
	icon: 'mail',
	key: 'meeting',
	role: ['admin','申请人'],
	items: [{
		name: '填写会议室预订表',
		icon: '',
		key: 'Creatmeeting',
		link: '/Meeting/Creatmeeting',
		role: ['admin','申请人']
	},
	{
		name: '会议过审及过往纪要',
		icon: '',
		key: 'Applicant',
		link: '/Meeting/Applicant',
		role: ['admin','申请人']
	},]
},
{
	name: '部门领导',
	icon: 'mail',
	key: 'leader',
	role: ['admin','部门领导'],
	items: [{
		name: '待审待开会议',
		icon: '',
		key: 'Leaderlist',
		link: '/Meeting/Leaderlist',
		role: ['admin','部门领导']
	},
	]
},
{
	name: '物业',
	icon: 'mail',
	key: 'administrator',
	role: ['admin','管理人员'],
	items: [{
		name: '待审待开会议',
		icon: '',
		key: 'List',
		link: '/Meeting/List',
		role: ['admin','管理人员']
	},
	]
},
{
	name: '部门职员',
	icon: 'mail',
	key: 'user',
	role: ['admin','普通用户'],
	items: [{
		name: '待开会议',
		icon: '',
		key: 'Userlist',
		link: '/Meeting/Userlist',
		role: ['admin','普通用户']
	},
	]
},
// {
// 	name: '会议管理',
// 	icon: 'mail',
// 	key: 'meeting',
// 	role: ['employee'],
// 	items: [{
// 		name: '管理人员会议主页',
// 		icon: '',
// 		key: 'meetinglist',
// 		link: '/Meeting/List',
// 		role: ['employee']
// 	},
// 	{
// 		name: '申请人会议主页',
// 		icon: '',
// 		key: 'applicant',
// 		link: '/Meeting/Applicant',
// 		role: ['employee']
// 	}, {
// 		name: '普通用户会议页面',
// 		icon: '',
// 		key: 'userlist',
// 		link: '/Meeting/Userlist',
// 		role: ['employee']
// 	}, {
// 		name: '领导会议页面',
// 		icon: '',
// 		key: 'leaderlist',
// 		link: '/Meeting/Leaderlist',
// 		role: ['employee']
// 	},
// 	{
// 		name: '会议室申请',
// 		icon: '',
// 		key: 'creatmetting',
// 		link: '/Meeting/Creatmeeting',
// 		role: ['employee']
// 	},
// 	{
// 		name: '会议纪要',
// 		icon: '',
// 		key: 'mettingminutes',
// 		link: '/Meeting/Meetingminutes',
// 		role: ['employee']
// 	}]
// }
{
	name: '公文管理',
	icon: 'compass',
	key: 'bulletin',
	role: ['employee'],
	items: [{
		name: '新增公文',
		icon: '',
		key: 'createbulletin',
		link: '/Bulletin/Createbulletin',
		role: ['employee']
	},{
		name: '公文列表',
		icon: '',
		key: 'bulletinlist',
		link: '/Bulletin/List',
		role: ['employee']
	},{
		name: '公文分发列表',
		icon: '',
		key: 'bulldist',
		link: '/Bulletin/Bulldist',
		role: ['employee']
	}]
}
];

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