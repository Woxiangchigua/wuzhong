
const menulist = [
	{
		name: '分局主页',
		icon: 'global',
		key: 'publicportal',
		role: ['admin','管理人员','申请人','普通用户','内勤'],
		items: [{
			name: '警员主页',
			icon: '',
			key: 'home',
			link: '/Publicportal',
			role: ['admin','普通用户']
		},
		{
			name: '部门主页',
			icon: '',
			key: 'departhome',
			link: '/Departhome',
			role: ['admin','管理人员']
		},
		{
			name: '领导主页',
			icon: '',
			key: 'leaderhome',
			link: '/Leaderhome',
			role: ['admin','内勤']
		},
		{
			name: '公文主页',
			icon: '',
			key: 'documenthome',
			link: '/#',
			role: ['admin','管理人员','申请人','普通用户','内勤']
		},
		{
			name: '会议室主页',
			icon: '',
			key: 'meetinghome',
			link: '/Home',
			role: ['admin','管理人员','申请人','普通用户','内勤']
		}
		]
	},
	{
		name: '指令管理',
		icon: 'audit',
		key: 'instruct',
		role: ['admin','管理人员','申请人','内勤','普通用户'],
		items: [{
			name: '分局指令列表',
			icon: '',
			key: 'instructlist',
			link: '/Instruct/List',
			role: ['admin','管理人员']
		},{
			name: '主办部门指令列表',
			icon: '',
			key: 'instructdeplist',
			link: '/Instruct/Deplist',
			role: ['admin','内勤']
		},{
			name: '协办部门指令列表',
			icon: '',
			key: 'assdeplist',
			link: '/Instruct/Assdep',
			role: ['admin','内勤']
		},{
			name: '警员指令列表',
			icon: '',
			key: 'instructpolice',
			link: '/Instruct/Police',
			role: ['admin','普通用户']
		}]
	},
	{
		name: '公文管理',
		icon: 'audit',
		key: 'bulletin',
		role: ['admin','管理人员','内勤'],
		items: [{
			name: '新增公文',
			icon: '',
			key: 'createbulletin',
			link: '/Bulletin/Createbulletin',
			role: ['admin','管理人员','内勤']
		},{
			name: '公文列表',
			icon: '',
			key: 'bulletinlist',
			link: '/Bulletin/List',
			role: ['admin','管理人员','内勤']
		},{
			name: '公文分发列表',
			icon: '',
			key: 'bulldist',
			link: '/Bulletin/Bulldist',
			role: ['admin','管理人员','内勤']
		}]
	},
	{
	name: '综合事务',
	icon: 'compass',
	key: 'callcenter',
	role: ['admin','管理人员','申请人','普通用户','内勤'],
	items: [{
		name: '外出',
		icon: '',
		key: 'goout',
		link: '/#',
		role: ['admin','管理人员','申请人','普通用户','内勤']
	},
	{
		name: '车辆',
		icon: '',
		key: 'car',
		link: '/#',
		role: ['admin','管理人员','申请人','普通用户','内勤']
	},
	{
		name: '值班',
		icon: '',
		key: 'duty',
		link: '/#',
		role: ['admin','管理人员','申请人','普通用户','内勤']
	},
	{
		name: '领导日程',
		icon: '',
		key: 'timetable',
		link: '/#',
		role: ['admin','管理人员','申请人','普通用户','内勤']
	},
	{
		name: '待办事项列表',
		icon: '',
		key: 'todolist',
		link: '/#',
		role: ['admin','管理人员','申请人','普通用户','内勤']
	}
	]
},
{
	name: '科信保障',
	icon: 'safety',
	key: 'guarantee',
	role: ['admin','普通用户','管理人员','内勤'],
	items: [
		{
			name: '科信保障',
			icon: '',
			key: 'guarantee',
			link: '/Guarantee',
			role: ['admin','管理人员','内勤']
		}
	]
},
{
	name: '会议管理',
	icon: 'form',
	key: 'meeting',
	role: ['admin','管理人员','申请人','普通用户','内勤'],
	items: [
		{
		name: '会议室申请',
		icon: '',
		key: 'Creatmeeting',
		link: '/Meeting/Creatmeeting',
		role: ['admin','管理人员','申请人','普通用户','内勤']
	},
	{
		name: '会议管理',
		icon: '',
		key: 'Applicant',
		link: '/Meeting/Applicant',
		role: ['admin','申请人']
	},
	{
		name: '部门领导',
		icon: '',
		key: 'Leaderlist',
		link: '/Meeting/Leaderlist',
		role: ['admin','内勤']
	},
	{
		name: '管理人员',
		icon: '',
		key: 'List',
		link: '/Meeting/List',
		role: ['admin','管理人员']
	},
	{
		name: '内勤人员',
		icon: '',
		key: 'InsideList',
		link: '/Meeting/InsideList',
		role: ['admin','内勤']
	},
	{
		name: '普通用户',
		icon: '',
		key: 'Userlist',
		link: '/Meeting/Userlist',
		role: ['admin','普通用户']
	},
	]
},
// {
// 	name: '内勤',
// 	icon: 'codepen',
// 	key: 'leader',
// 	role: ['admin','内勤'],
// 	items: [{
// 		name: '待审待开会议',
// 		icon: '',
// 		key: 'Leaderlist',
// 		link: '/Meeting/Leaderlist',
// 		role: ['admin','内勤']
// 	},
// 	]
// },
// {
// 	name: '管理员',
// 	icon: 'hdd',
// 	key: 'administrator',
// 	role: ['admin','管理人员'],
// 	items: [{
// 		name: '待审待开会议',
// 		icon: '',
// 		key: 'List',
// 		link: '/Meeting/List',
// 		role: ['admin','管理人员']
// 	},
// 	]
// },
// {
// 	name: '内勤人员',
// 	icon: 'meh',
// 	key: 'inside',
// 	role: ['admin','内勤人员'],
// 	items: [{
// 		name: '待开会议',
// 		icon: '',
// 		key: 'InsideList',
// 		link: '/Meeting/InsideList',
// 		role: ['admin','内勤人员']
// 	},
// 	]
// },
// {
// 	name: '部门职员',
// 	icon: 'user',
// 	key: 'user',
// 	role: ['admin','普通用户'],
// 	items: [{
// 		name: '待开会议',
// 		icon: '',
// 		key: 'Userlist',
// 		link: '/Meeting/Userlist',
// 		role: ['admin','普通用户']
// 	},
// 	]
// },
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
	name: '警务知识库',
	icon: 'read',
	key: 'knowledgebase',
	role: ['admin','普通用户','管理人员','内勤'],
	items: [
		{
			name: '警务知识库',
			icon: '',
			key: 'knowledgebase',
			link: '/Knowledgebase',
			role: ['admin','管理人员','内勤']
		}
	]
},
{
	name: '吐槽池',
	icon: 'project',
	key: 'debunk',
	role: ['admin','普通用户','管理人员','内勤'],
	items: [
		{
			name: '吐槽池',
			icon: '',
			key: 'debunk',
			link: '/Debunk',
			role: ['admin','管理人员','内勤']
		}
	]
},
{
	name: '问卷调查',
	icon: 'file',
	key: 'questionnaire',
	role: ['admin','普通用户','管理人员','内勤'],
	items: [
		{
			name: '问卷调查',
			icon: '',
			key: 'questionnaire',
			link: '/Questionnaire',
			role: ['admin','管理人员','内勤']
		}
	]
},
{
	name: '六化应用',
	icon: 'appstore',
	key: 'six',
	role: ['admin','普通用户','管理人员','内勤'],
	items: [
		{
			name: '指挥调度',
			icon: '',
			key: 'zhihui',
			link: '/#',
			role: ['admin','管理人员','内勤']
		},
		{
			name: '合成作战',
			icon: '',
			key: 'zuozhan',
			link: '/#',
			role: ['admin','管理人员','内勤']
		},
		{
			name: '动态巡防',
			icon: '',
			key: 'xunfang',
			link: '/#',
			role: ['admin','管理人员','内勤']
		},
		{
			name: '社区警务',
			icon: '',
			key: 'shequ',
			link: '/#',
			role: ['admin','管理人员','内勤']
		},
		{
			name: '执法监管',
			icon: '',
			key: 'jianguan',
			link: '/#',
			role: ['admin','管理人员','内勤']
		},
		{
			name: '队伍建设',
			icon: '',
			key: 'duiwu',
			link: '/#',
			role: ['admin','管理人员','内勤']
		}
	]
},
{
	name: '用户',
	icon: 'user',
	key: 'user',
	role: ['admin','普通用户','管理人员','内勤'],
	items: [
		{
			name: '用户列表',
			icon: '',
			key: 'userlist',
			link: '/#',
			role: ['admin','管理人员','内勤']
		},
		{
			name: '部门列表',
			icon: '',
			key: 'departlist',
			link: '/#',
			role: ['admin','管理人员','内勤']
		},
		{
			name: '组织结构图',
			icon: '',
			key: 'zuzhi',
			link: '/#',
			role: ['admin','管理人员','内勤']
		}
	]
},
{
	name: '权限',
	icon: 'database',
	key: 'jurisdiction',
	role: ['admin','普通用户','管理人员','内勤'],
	items: [
	]
},
{
	name: '日志',
	icon: 'setting',
	key: 'rizhi',
	role: ['admin','普通用户','管理人员','内勤'],
	items: [
	]
},
{
	name: '设置',
	icon: 'setting',
	key: 'set',
	role: ['admin','普通用户','管理人员','内勤'],
	items: [
	]
},
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