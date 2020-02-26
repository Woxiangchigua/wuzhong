import graphql from 'babel-plugin-relay/macro';
import {
    commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation UpdateMeetingMutation(
    $id: ID!
    $userIds: [ID]!
    $endTime: DateTime!
    $meetingRoomId: ID!
    $organizer: String!
    $configuration: String = ""
    $intro: String = ""
    $beginTime: DateTime!
    $meetingName: String!
    $number: Int!) {
    updateMeeting(id: $id,beginTime: $beginTime,meetingRoomId: $meetingRoomId,number: $number,
      endTime: $endTime,userIds:$userIds,meetingName: $meetingName,organizer: $organizer,configuration: $configuration,intro: $intro,) {
      id
    }
  }
`;

function commit(
    environment,
    id,
    beginTime,
    meetingRoomId,
    number,
    endTime,
    meetingName,
    organizer,
    configuration,
    intro,
    userIds,
    onCompleted,
    error
) {
    return commitMutation(environment, {
        mutation,
        variables: {
            id:id,
            beginTime: beginTime,
            meetingRoomId: meetingRoomId,
            number: number,
            endTime: endTime,
            meetingName: meetingName,
            organizer: organizer,
            configuration: configuration,
            intro: intro,
            userIds:userIds
        },
        onCompleted: onCompleted,
        onError: error,
    }
    );
}

export default { commit };