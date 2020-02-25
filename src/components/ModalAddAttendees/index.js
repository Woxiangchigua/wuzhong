import React , { useState }from 'react';
import {
	Modal, 
	Form, 
	Button, 
	Input,
	Transfer,
	Table
}
from 'antd';
import difference from 'lodash/difference';
import DepartmentTreeSelect from '@/components/DepartmentTreeSelect'
//
const TableTransfer = ({ Columns, ...restProps }) => (
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
            .map(({ id }) => id);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
           console.log('diffKeys==>',diffKeys)
           console.log('selected==>',selected)
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
        console.log('onSelect==>',key,selected)
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

		
      return (
      	<>	
	        <Table
	          rowSelection={rowSelection}
	          columns={Columns}
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

const tableColumns = [{
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


function ModalAddAttendees(props) {
	const {Visible, callback} = props;
	const environment = props.environment;
	const [targetKeys, setTargetKeys] = useState([]);

	//假数据
	
	const mockData = []
	for (let i = 0; i < 20; i++) {
		mockData.push({
			key : i,
			id: 'id'+(i + 1),
			name: '张三' + (i + 1),
			num: i + 1,
			department: '治安大队'
		});
	}
	const [DataSource, setDataSource] = useState(mockData);

	let handleOk = () => {
		console.log("handleOk=>",targetKeys)
		callback('ok',DataSource.filter((d)=>{
			return targetKeys.indexOf(d.key)>-1; 
		}));
	};

	let handleCancel = () => {
		callback('cancel');
	};

	//部门选择器组件返回接收
	let departmentTreeSelectCallback = (id) => { 
		console.log('departmentTreeSelectCallback==>',id);
	}

	const onChange = nextTargetKeys => {
		console.log('nextTargetKeys',nextTargetKeys)
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
            <Button key="submit" type="primary"  loading={false} onClick={handleOk}>
              确认
            </Button>,
          ]}
        >
        <DepartmentTreeSelect  environment={environment} callback={departmentTreeSelectCallback}/>
        <TableTransfer
          dataSource={DataSource}
          targetKeys={targetKeys}
          onChange={onChange}
          titles = {["",'已选择']}
          Columns={tableColumns}
        />
          
        </Modal>
			
    );
}

export default ModalAddAttendees