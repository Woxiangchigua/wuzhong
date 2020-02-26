import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation CreateMeetingMutation(
    $configuration: String!
    $intro: String!
    $beginTime: DateTime!
    $meetingRoomId: ID!
    $number: Int!
    $endTime: DateTime!
    $meetingName: String!
    $userIds: [ID]!
    $organizer: String!) {
    createMeeting(beginTime: $beginTime,meetingRoomId: $meetingRoomId,number: $number,
      endTime: $endTime,meetingName: $meetingName,userIds:$userIds,organizer: $organizer,configuration: $configuration,intro: $intro,) {
      id
    }
  }
`;

function commit(
  environment,
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