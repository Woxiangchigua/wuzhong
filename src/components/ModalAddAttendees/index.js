import React from 'react';
import {
	Modal, 
	Form, 
	Button, 
	Input,
	Transfer,
	Table,
	TreeSelect
}
from 'antd';

const DepartmentTreeSelect = (props) => {
	const treeData = [{
		id: 1,
		pId: 0,
		value: '1',
		title: '治安大队'
	}, {
		id: 2,
		pId: 0,
		value: '2',
		title: '交警大队'
	}, {
		id: 3,
		pId: 0,
		value: '3',
		title: '刑侦大队'
	}];
	const onLoadData = treeNode => {
		// new Promise(resolve => {
		//   const { id } = treeNode.props;
		//   setTimeout(() => {
		//     this.setState({
		//       treeData: this.state.treeData.concat([
		//         this.genTreeNode(id, false),
		//         this.genTreeNode(id, true),
		//       ]),
		//     });
		//     resolve();
		//   }, 300);
		// })
		setTimeout(() => {
			//     this.setState({
			//       treeData: this.state.treeData.concat([
			//         this.genTreeNode(id, false),
			//         this.genTreeNode(id, true),
			//       ]),
			//     });
			//     resolve();
		}, 300);
	};
	const onChange = value => {
		console.log(value);
		// this.setState({ value });
	};
	console.log()
	return ( 
		<TreeSelect 
			treeDataSimpleMode 
			style = {
				{
					width: '40%',
					margin: '0px 5px 10px 0px'
				}
			}
		// value={this.state.value}
			// dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
			placeholder = '选择部门'
			onChange = {
				onChange
			}
			loadData = {
				onLoadData
			}
			treeData = {
				treeData
			}
		/>
	)

};

//穿梭框
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          // const treeSelectedKeys = selectedRows
          //   .filter(item => !item.disabled)
          //   .map(({ key }) => key);
          // const diffKeys = selected
          //   ? difference(treeSelectedKeys, listSelectedKeys)
          //   : difference(listSelectedKeys, treeSelectedKeys);
          // onItemSelectAll(diffKeys, selected);
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
	          columns={columns}
	          dataSource={filteredItems}
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

const leftTableColumns = [{
	title: '姓名',
	dataIndex: 'name',
	key: 'name',
}, {
	title: '工号',
	dataIndex: 'num',
	key: 'num',
}, {
	title: '所属部门',
	dataIndex: 'department',
	key: 'department',
}];
const rightTableColumns = [{
	title: '参会人姓名',
	dataIndex: 'name',
	key: 'name'
}, {
	title: '工号',
	dataIndex: 'num',
	key: 'num'
}, {
	title: '所属部门',
	dataIndex: 'department',
	key: 'department'
}];


//
//
const mockData = []

for (let i = 0; i < 20; i++) {
	mockData.push({
		key: i + 1,
		name: '张三' + (i + 1),
		num: i + 1,
		department: '治安大队'
	});
}

const targetKeys = [];
function ModalAddAttendees(props) {
	const { getFieldDecorator } = props.form;
	const {Visible, CallBack} = props;
	const environment = props.environment;

	let handleOk = () => {
		CallBack('ok');
	};

	let handleCancel = () => {
		CallBack('cancel');
	};
	// state = {
	//     targetKeys: originTargetKeys,
	//     disabled: false,
	// };

	const onChange = nextTargetKeys => {
		// this.setState({
		// 	targetKeys: nextTargetKeys
		// });
	};

	const triggerDisable = disabled => {
		// this.setState({
		// 	disabled
		// });
	};

	const triggerShowSearch = showSearch => {
		// this.setState({
		// 	showSearch
		// });
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
            <Button key="submit" type="primary"  loading={false} onClick={handleOk}>
              确认
            </Button>,
          ]}
        >
        <DepartmentTreeSelect />
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          disabled={false}
          onChange={onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          titles = {["",'已选择']}
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
          
        </Modal>
			
    );
}

export default Form.create({ name: 'ModalAddAttendees' })(ModalAddAttendees);