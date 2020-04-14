import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';

const query = graphql`
	query DepartmentTreeSelect_OrgQuery(
	    $id: ID
	) {
	    org (
	       id: $id
	    ) {
	        id
		    name
		    parentID
		    subOrgs {
		      id
		      name
		      parentID
		    }
	    }
}`

function DepartmentTreeSelect(props) {
	const {callback,style} = props;
    const environment = props.environment;
    return (<QueryRenderer
        environment={environment}
        query={query
        }
        variables={{
            id: null
        }}
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            } else if (props) {
                if (props.org) {
                    return <ShowView style={style} environment={environment} data={props.org} callback={callback}/>
                }
            }
            return <div>Loading</div>;
        }}
    />);
}

function ShowView(props) {
	const { data , callback } = props;
	const [treeData, setTreeData] = useState([{
		id: data.id,
		pId: data.parentID,
		value: data.id,
		title: data.name
	}]);
	const environment = props.environment;
	const onLoadData = treeNode => new Promise(resolve => {
      const { id } = treeNode.props;
      console.log('onLoadData==>',id)
      
	    fetchQuery(environment, query, {
	        id: id,
	    }).then(data => {
	        console.log(data)
	        if(data.org){
	        	setTreeData(treeData.concat(data.org.subOrgs.map((d)=>{
					return {
						id: d.id,
						pId: id,
						value: d.id,
						title: d.name
					};
	        	})));
	        }
	        resolve();
	    });
    });
	const onChange = (id, value, p) => {
		callback(id, value, p);
	};
	let style = { 'width': '40%','margin': '0px 5px 10px 0px' }
	if(props.style) style = props.style;
	return ( 
		<TreeSelect 
			treeDefaultExpandAll
			treeDataSimpleMode 
			style = {
				style
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