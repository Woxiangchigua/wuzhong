import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import Icon  from '@ant-design/icons';
import logo from '../logo.svg';
import ViewManager from '../components/ViewManager/index'

function SingleLayout() {
    const { Header, Content, Footer } = Layout;
    return (
        <Layout style={{
            minHeight: '100vh'
        }}>

            <Content
                style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    textAlign: "center"
                }}
            >
                <Switch>
                    <Route path="/:classname/:page/:id/:func" children={<ViewManager />} />
                    <Route path="/:classname/:page/:id" children={<ViewManager />} />
                    <Route path="/:classname/:page" children={<ViewManager />} />
                    <Route path="/:page" children={<ViewManager />} />
                </Switch>
            </Content>

            {/* <Footer style={{ textAlign: 'center' }}>copyright©2020 同蒙信息技术(苏州)有限公司</Footer> */}
        </Layout>
    );
}
export default SingleLayout;