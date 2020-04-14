import React from 'react';
import { Select } from 'antd';
import { QueryRenderer, graphql } from 'react-relay';

const { Option } = Select;
const query = graphql`
	query OfferCategorySelect_Query(
	    $first: Int,
	    $skip: Int
	) {
	    offerCategoryList(
	    	first: $first,
	     	skip: $skip
	    ){
	        edges {
		      id
		      name
		    }
		    totalCount
	    }
}`

function OfferCategorySelect(props) {
	const {callback,style} = props;
    const environment = props.environment;
    return (<QueryRenderer
        environment={environment}
        query={query
        }
        variables={{
            first: 1000,
	     	skip: 0
        }}
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            } else if (props) {
                if (props.offerCategoryList) {
                    return <ShowView style={style} environment={environment} data={props.offerCategoryList} callback={callback}/>
                }
            }
            return <div>Loading</div>;
        }}
    />);
}

function ShowView(props) {
	const { data , callback } = props;
	const selectData = data.edges.map((d)=>{
		return (<Option key={d.id}>{d.name}</Option>);
	});
	const onChange = (id, value, p) => {
		callback(id, value, p);
	};
	let style = {}
	if(props.style) style = props.style;
	return (
		<Select 
			showSearch
			style={style} 
			placeholder="选择人员类型" 
			onChange={onChange}>
    		{selectData}
  		</Select>
	);
   
}


export default OfferCategorySelect;