import React, { Component } from 'react'
import { Breadcrumb, Row, Col, Card, Avatar, Calendar } from 'antd';
import './index.css';

const { Meta } = Card;
const list = [
    { title: '会议1', message: '这是会议1' },
    { title: '会议2', message: '这是会议2' },
    { title: '会议3', message: '这是会议3' },
    { title: '会议4', message: '这是会议4' },
    { title: '会议4', message: '这是会议4' },
    { title: '会议4', message: '这是会议4' },
]


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: list
        }
    }
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '15px 0px' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={16}>
                    <Col className="gutter-row" span={18}>
                        <Card
                            style={{ width: '100%' }}
                            title="未开会议"
                            extra={<a href="#">全部会议</a>}
                        >
                            {this.state.list.map((item, index) => {
                                return (<Card.Grid key={index + item}>
                                    <Card
                                        style={{ width: '100%' }}
                                        bordered={false}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={item.title}
                                            description={item.message}
                                            style={{ color: 'red', height: '65px' }}
                                        />
                                        <div className="project-item">
                                            <a href="/#/">办公室</a>
                                            <span className="datetime">9小时前</span>
                                        </div>
                                    </Card>
                                </Card.Grid>)
                            })}

                        </Card>
                    </Col>
                    <Col className="gutter-row300" span={6}>
                        <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4 }}>
                            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                        </div>
                    </Col>
                </Row>
                <Col className="gutter-row" span={24}>
                    <Card
                        style={{ width: '100%', marginTop: '30px' }}
                        title="待审核会议"
                        extra={<a href="#">全部会议</a>}
                    >
                        {this.state.list.map((item, index) => {
                            return (<Card.Grid style={{ width: '25%' }} key={index + item}>
                                <Card
                                    style={{ width: '100%' }}
                                    bordered={false}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={item.title}
                                        description={item.message}
                                        style={{ color: 'red', height: '65px' }}
                                    />
                                    <div className="project-item">
                                        <a href="/#/">办公室</a>
                                        <span className="datetime">9小时前</span>
                                    </div>
                                </Card>
                            </Card.Grid>)
                        })}

                    </Card>
                </Col>
            </div>
        )
    }

}
function onPanelChange(value, mode) {
    console.log(value, mode);
}
// function Home() {


//     return (
//         <div>

//         </div>
//     );
// }

// export default Home;