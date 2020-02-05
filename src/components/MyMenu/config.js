
const menulist = [{
	name: '首页',
	icon: 'audio',
	key: 'callcenter',
	role: ['costomeruser'],
	items: [{
		name: '系统首页',
		icon: '',
		key: 'calllist',
		link: '/Home',
		role: ['costomeruser']
	}, {
		name: '文件首页',
		icon: '',
		key: 'calldone',
		link: '/Home',
		role: ['costomeruser']
	}]
}, {
	name: '个人设置',
	icon: 'edit',
	key: 'userset',
	role: ['costomeruser', 'hospitaluser'],
	items: [{
		name: '修改密码',
		icon: '',
		key: 'usereditpwd',
		link: '/User/EditPwd',
		role: ['costomeruser', 'hospitaluser']
	}, {
		name: '个人信息',
		icon: '',
		key: 'userinfo',
		link: '/User/Info',
		role: ['costomeruser', 'hospitaluser']
	}]
}, {
	name: '订单管理',
	icon: 'tool',
	key: 'costomer',
	role: ['costomeruser'],
	items: [{
		name: '出票管理',
		icon: '',
		key: 'costomerlist',
		link: '/Building',
		role: ['costomeruser']
	}, {
		name: '出票统计',
		icon: '',
		key: 'state',
		link: '/Building',
		role: ['costomeruser']
	}]
}, {
	name: '系统设置',
	icon: 'setting',
	key: 'system',
	role: ['hospitaluser', 'costomeruser'],
	items: [{
		name: '平台信息',
		icon: '',
		key: 'Hospital',
		link: '/Hospital'
	}, {
		name: '角色管理',
		icon: '',
		key: 'role',
		link: '/Role/List',
		role: ['hospitaluser', 'costomeruser']
	}, {
		name: '账号管理',
		icon: '',
		key: 'power',
		link: '/Account/List',
		role: ['hospitaluser', 'costomeruser']
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