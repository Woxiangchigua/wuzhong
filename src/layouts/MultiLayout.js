import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Layout, Avatar } from 'antd';
import ViewManager from '../components/ViewManager/index'
import GlobalHeader from '../components/GlobalHeader/index'
import MyMenu from '../components/MyMenu'
import Logo from '../img/logo.png'

function MultiLayout(props) {
    const { Header, Sider, Content, Footer } = Layout;
    console.log(props)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header" >
                <Avatar className="logo-icon" src={Logo} shape="square" />
                <span style={{ color: "#fff", fontSize: "16px" }}>吴中公安民警工作台</span>

                <div className="right">
                    <GlobalHeader className="right" user={props.user} />
                </div>

            </Header>
            <Layout >
                <Sider collapsible width={200} style={{
                    background: '#fff',
                }}>
                    <MyMenu user={props.user} />
                </Sider>

                <Layout style={{ padding: '12px 12px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 10,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            {/* <Route path="/" exact="true" children={<h2>Home</h2>} /> */}
                            <Route path="/error" exact={true} children={<ErrorView />} />
                            <Route path="/:classname/:page/:id/:func" children={<ViewManager environment={props.environment} loginuser={props.user} />} />
                            <Route path="/:classname/:page/:id" children={<ViewManager environment={props.environment} loginuser={props.user} />} />
                            <Route path="/:classname/:page" children={<ViewManager environment={props.environment} loginuser={props.user} />} />
                            <Route path="/:page" children={<ViewManager environment={props.environment} loginuser={props.user} />} />
                        </Switch>

                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>copyright©2020 同蒙信息技术(苏州)有限公司</Footer> */}
                </Layout>
            </Layout>
        </Layout>
    );
}

function ErrorView(props) {
    return (
        <>
            error info: {props.errorInfo};
    </>
    );
}

export default MultiLayout;
