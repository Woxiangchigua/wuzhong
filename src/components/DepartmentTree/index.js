import React, { useState ,useImperativeHandle} from 'react';
import { Tree } from 'antd';
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';

const { TreeNode } = Tree;
const query = graphql`
	query DepartmentTree_OrgQuery(
	    $id: ID
	) {
	    org (
	       id: $id
	    ) {
	        id
		    name
		    parentID
		    orgCategoryID
		    subOrgs {
		      id
		      name
		      parentID
		      orgCategoryID
		    }
	    }
}`

function DepartmentTree(props) {
	const {callback,cRef} = props;
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
                    return <ShowView cRef={cRef} environment={environment} data={props.org} callback={callback}/>
                }
            }
            return <div>Loading</div>;
        }}
    />);
}

function convert2Tree(bobj){
	var obj = {};
	for(const id in bobj){
		obj[id] = {...bobj[id]};
	}
	var re = {};
	for(var id in obj){
		var objD = obj[id];
		var parentId = objD.parentID;
		if(parentId){
			if(obj[parentId]){
				if(!obj[parentId].children) obj[parentId].children = [];
				obj[parentId].children.push(objD);
			}
		}else {
		  re = objD;
		}
	}
	return [re];
}

function ShowView(props) {
	const { data , callback , cRef} = props;
	const BaseData = {};
	BaseData[data.id] = {
		id: data.id,
		key: data.id,
		title: data.name,
		breadcrumbs: [data.name],
		parentID: null,
		orgCategoryID: data.orgCategoryID
	};
	
	const [treeBaseData, setTreeBaseData] = useState(BaseData);
	const [treeData, setTreeData] = useState(convert2Tree(BaseData));
	const environment = props.environment;
	const onLoadData = treeNode => new Promise(resolve => {
	    const { id } = treeNode.props;
	    if (treeNode.props.children) {
	        resolve();
	        return;
	    }
	    loadData(id,()=>{
	    	resolve();
	    })
    });
	const loadData = (id,re) => {
		fetchQuery(environment, query, {
	        id: id,
	    }).then(fdata => {
	        if(fdata.org){
				fdata.org.subOrgs.forEach((d)=>{
					const dataBreadcrumbs = treeBaseData[d.parentID].breadcrumbs.concat([d.name]);
					treeBaseData[d.id] = {
						id: d.id,
						key: d.id,
						title: d.name,
						breadcrumbs: dataBreadcrumbs,
						parentID: d.parentID,
						orgCategoryID: d.orgCategoryID
					};

				});
				setTreeBaseData(treeBaseData);
	  	     	setTreeData(convert2Tree(treeBaseData))
	        }
	        if(re) re();
	    });
	}
	//暴露给父组件
	useImperativeHandle(cRef, () => ({
		// changeVal 就是暴露给父组件的方法
	    reload: (id) => {
	      loadData(id,()=>{})
	      console.log('加载tree组件',id)
	    }
  	}));
	const renderTreeNodes = data =>
	    data.map(item => {
	      if (item.children) {
	        return (
	          <TreeNode title={item.title} key={item.key} dataRef={item}>
	            {renderTreeNodes(item.children)}
	          </TreeNode>
	        );
	      }
	      return <TreeNode key={item.key} {...item} dataRef={item} />;
	    });
	const onSelect = (id,obj)=>{
		callback(obj.node.props.dataRef.id, obj.node.props.dataRef);
	}
	return ( 
		<Tree 
			defaultExpandAll
			showLine={true}
			onSelect={onSelect}
			loadData={onLoadData}
		>
			{renderTreeNodes(treeData)}
		</Tree>
	);
   
}



export default DepartmentTree;