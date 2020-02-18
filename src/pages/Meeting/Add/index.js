import React, { Component } from 'react'
import Calendar from '../../../components/Calendar/index'
import { fetchQuery, QueryRenderer, graphql } from 'react-relay';

const query = graphql`
query Add_MeetingRoomListQuery{
    meetingRoomList{
      edges{
        id,
        name
      }
    }
  }`

// const resourceMap = [
//     { resourceId: 1, resourceTitle: '会议室 4' },
//     { resourceId: 2, resourceTitle: '会议室 3' },
//     { resourceId: 3, resourceTitle: '会议室 1' },
// ]
class AddMeeting extends Component {
    state = {
        environment: this.props.environment,
        resourceMap: this.props.meetingRoomList.edges.map(function (edge,index) {
            return { 'resourceId': edge.id, 'resourceTitle': edge.name }
        }),
        loading: false,
    };
    render() {
        return (
            <div style={{ height: 500 }}>
                <Calendar resourceMap={this.state.resourceMap}/>
            </div>
        )
    }
}

function List(props) {
    const environment = props.environment;
    return (<QueryRenderer
        environment={environment}
        query={query
        }
        render={({ error, props, retry }) => {
            if (error) {
                return (
                    <div>
                        <h1>Error!</h1><br />{error.message}
                    </div>)
            } else if (props) {
                if (props.meetingRoomList) {
                    return <AddMeeting environment={environment} meetingRoomList={props.meetingRoomList} />
                }
            }
            return <div>Loading</div>;
        }}
    />);
}

export default List;
