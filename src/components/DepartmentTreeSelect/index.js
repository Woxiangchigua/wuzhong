import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';

// const query = graphql`
// query DepartmentTreeSelect_OrgQuery(
//     $id: ID
// ) {
//     org (
//        id: $id
//     ) {
//         id
// 	    name
// 	    subOrgs {
// 	      id
// 	      name
// 	    }
//     }
// }`

//模拟数据
const mockdata = {
  "id": "org-1",
  "name": "组织A",
  "subOrgs": [
    {
      "id": "org-2",
      "name": "组织B"
    },
    {
      "id": "org-3",
      "name": "组织C"
    }
  ]
};
function DepartmentTreeSelect(props) {
	const {callback} = props;
    const environment = props.environment;
    return <ShowView environment={environment} data={mockdata} callback={callback} />
    // return (<QueryRenderer
    //     environment={environment}
    //     query={query
    //     }
    //     variables={{
    //         id: null
    //     }}
    //     render={({ error, props, retry }) => {
    //         if (error) {
    //             return (
    //                 <div>
    //                     <h1>Error!</h1><br />{error.message}
    //                 </div>)
    //         } else if (props) {
    //             if (props.org) {
    //                 return <ShowView environment={environment} data={props.org} />
    //             }
    //         }
    //         return <div>Loading</div>;
    //     }}
    // />);
}

function ShowView(props) {
	const { data , callback } = props;
	const [treeData, setTreeData] = useState(data.subOrgs.map((d)=>{
		return {
			id: d.id,
			pId: 0,
			value: d.id,
			title: d.name,
			isLeaf: false
		};
	}));
	const environment = props.environment;
	const onLoadData = treeNode => new Promise(resolve => {
      const { id } = treeNode.props;
      console.log('onLoadData==>',id)
      	//#todo 获取数据
	    // fetchQuery(environment, query, {
	    //     id: id,
	    // }).then(data => {
	        
	    // });
	    //假数据
	    setTimeout(() => {
		    setTreeData(treeData.concat([{
		    	id: id+1,
				pId: id,
				value: id+1,
				title: '部门'+(id+1),
		    }]))
	        resolve();
      	}, 300);
	    
    });
	const onChange = (id, value, p) => {
		console.log('onChange==>', id);
		// this.setState({ value });
		callback(id, value, p);
	};
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
			onChange = { onChange }
			loadData = { onLoadData }
			treeData = { treeData }
		/>
	);
   
}



export default DepartmentTreeSelect;