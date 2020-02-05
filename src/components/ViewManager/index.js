import React from 'react';
import { useParams } from "react-router-dom";
import loadable from '@loadable/component';
// import PageLoading from './components/PageLoading/index'
// import MyErrorBoundary from '../../MyErrorBoundary'

function ContentView(props) {
    let { classname, page, id, func } = useParams();

    const AsyncPage = loadable(props => import(`../../pages/${(props.classname ? props.classname + "/" : "") + props.page}/index`), {
        cacheKey: props => (props.classname ? props.classname + "/" : "") + props.page,
    });

    return (
        <>
            {/* <h3>ID: {classname}, {page}</h3> */}
            {/* <AsyncPage page={id} /> */}
            {/* <MyErrorBoundary> */}
            <AsyncPage environment={props.environment} loginuser={props.loginuser} classname={classname} page={page} id={id} func={func} fallback={<div>Loading...</div>} />
            {/* </MyErrorBoundary> */}
        </>
    );
}

export default ContentView;