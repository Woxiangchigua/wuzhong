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
    $number: Int!
    $requirement: String
    $meetingType: enumMeetingType!
    $attendLeader: String!
    $reportUnit: String!) {
    updateMeeting(id: $id,beginTime: $beginTime,meetingRoomId: $meetingRoomId,number: $number,
      endTime: $endTime,userIds:$userIds,meetingName: $meetingName,organizer: $organizer,configuration: $configuration,intro: $intro,
      requirement: $requirement,meetingType: $meetingType,attendLeader: $attendLeader,reportUnit: $reportUnit,) {
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
    requirement,
    meetingType,
    attendLeader,
    reportUnit,
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
            userIds:userIds,
            requirement:requirement,
            meetingType:meetingType,
            attendLeader:attendLeader,
            reportUnit:reportUnit,
        },
        onCompleted: onCompleted,
        onError: error,
    }
    );
}

export default { commit };