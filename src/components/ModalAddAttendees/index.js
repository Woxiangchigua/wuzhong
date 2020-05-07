import React, { useState } from 'react';
import {
	Modal,
	Button,
	Input,
	Transfer,
	Table
}
	from 'antd';
	import { Form, Mention } from '@ant-design/compatible';
import difference from 'lodash/difference';
import DepartmentTreeSelect from '@/components/DepartmentTreeSelect'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';
//
const TableTransfer = ({ Columns, rightDataSource, ...restProps }) => (
	<Transfer {...restProps} showSelectAll={false}>
		{({
			direction,
			filteredItems,
			onItemSelectAll,
			onItemSelect,
			selectedKeys: listSelectedKeys,
			disabled: listDisabled,
		}) => {

			const rowSelection = {
				getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
				onSelectAll(selected, selectedRows) {

					const treeSelectedKeys = selectedRows
						.filter(item => !item.disabled)
						.map(({ key }) => key);
					const diffKeys = selected
						? difference(treeSelectedKeys, listSelectedKeys)
						: difference(listSelectedKeys, treeSelectedKeys);
					onItemSelectAll(diffKeys, selected);
				},
				onSelect({ key }, selected) {
					onItemSelect(key, selected);
				},
				selectedRowKeys: listSelectedKeys,
			};

			return (
				<>
					<Table
						rowSelection={rowSelection}
						columns={Columns}
						dataSource={direction === 'left' ? filteredItems : rightDataSource}
						size="small"
						style={{ pointerEvents: listDisabled ? 'none' : null }}
						onRow={({ key, disabled: itemDisabled }) => ({
							onClick: () => {
								if (itemDisabled || listDisabled) return;
								onItemSelect(key, !listSelectedKeys.includes(key));
							},
						})}
					/>
				</>
			);
		}}
	</Transfer>
);

const tableColumns = [{
	title: '姓名',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '警员编号',
	dataIndex: 'num',
	key: 'num',

}, {
	title: '所属部门',
	dataIndex: 'department',
	key: 'department',
}];

const query = graphql`
	query ModalAddAttendees_OrgQuery(
	    $id: ID
	) {
	    org (
	       id: $id
	    ) {
	        id
		    name
		    employees {
		        id
		        name
		        jobNum
		    }
	    }
}`
function ModalAddAttendees(props) {
	const { Visible, callback } = props;
	const environment = props.environment;
	const [targetKeys, setTargetKeys] = useState([]);

	const [dataSource, setDataSource] = useState([]);
	const [rightDataSource, setRightDataSource] = useState([]);

	const [allDataSource, setAllDataSource] = useState([]);

	let handleOk = () => {
		callback('ok', rightDataSource);
	}

	let handleCancel = () => {
		callback('cancel');
	};

	//部门选择器组件返回接收
	let departmentTreeSelectCallback = (id) => {
		fetchQuery(environment, query, {
			id: id,
		}).then(data => {
			console.log(data)
			if (data.org && data.org.employees) {
				const allkeys = allDataSource.map((d) => {
					return d.id;
				});
				const employees = data.org.employees.map((d) => {
					if (allkeys.indexOf(d.id) == -1) {
						allDataSource.push({
							id: d.id,
							key: d.id,
							name: d.name,
							jobNum: d.jobNum,
							department: data.org.name
						})
					}
					return {
						id: d.id,
						key: d.id,
						name: d.name,
						jobNum: d.jobNum,
						department: data.org.name
					};
				});
				const employeeskeys = employees.map((d) => {
					return d.id;
				})
				rightDataSource.forEach((d) => {
					if (employeeskeys.indexOf(d.key) == -1) {
						employees.push(d);
					}
				});
				setDataSource(employees);
			}
		});
	}

	const onChange = nextTargetKeys => {
		setRightDataSource(allDataSource.filter((d) => {
			return nextTargetKeys.indexOf(d.key) > -1;
		}));
		setTargetKeys(nextTargetKeys);
	};

	return (
		<Modal
			visible={Visible}
			title="添加负责人"
			onOk={handleOk}
			width={720}
			onCancel={handleCancel}
			footer={[
				<Button key="back" onClick={handleCancel}>
					返回
            </Button>,
				<Button key="submit" type="primary" loading={false} onClick={handleOk}>
					确认
            </Button>,
			]}
		>
			<DepartmentTreeSelect environment={environment} callback={departmentTreeSelectCallback} />
			<TableTransfer
				dataSource={dataSource}
				targetKeys={targetKeys}
				onChange={onChange}
				titles={["", '已选择']}
				Columns={tableColumns}
				rightDataSource={rightDataSource}
			/>

		</Modal>

	);
}

export default ModalAddAttendees