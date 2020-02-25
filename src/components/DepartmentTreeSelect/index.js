import React from 'react';
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
    const environment = props.environment;
    return <ShowView environment={environment} data={mockdata} />
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
	const { data } = props;
	const environment = props.environment;
	const treeData = data.subOrgs.map((d)=>{
		return {
			id: d.id,
			pId: 0,
			value: d.id,
			title: d.name
		};
	});
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
		console.log('onChange==',value);
		// this.setState({ value });
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
	);
   
}



export default DepartmentTreeSelect;