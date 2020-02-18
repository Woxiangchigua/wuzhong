import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation CreateMeetingMutation(
    $configuration: String!
    $intro: String!
    $beginTime: DateTime!
    $meetingRoomId: Int!
    $number: Int!
    $endTime: DateTime!
    $meetingName: String!
    $organizer: String!) {
    createMeeting(beginTime: $beginTime,meetingRoomId: $meetingRoomId,number: $number,
      endTime: $endTime,meetingName: $meetingName,organizer: $organizer,configuration: $configuration,intro: $intro,) {
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
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };