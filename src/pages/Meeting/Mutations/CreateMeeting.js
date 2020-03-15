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
    $endTime: DateTime!
    $meetingName: String!
    $orgIds: [ID]!
    $organizer: String!
    $requirement: String = "false,false,false,false,false"
    $reportUnit: String!
    $attendLeader: String!
    $meetingType: enumMeetingType!) {
    createMeeting(beginTime: $beginTime,meetingRoomId: $meetingRoomId,
      endTime: $endTime,meetingName: $meetingName,orgIds:$orgIds,organizer: $organizer,configuration: $configuration,intro: $intro,requirement:$requirement,reportUnit:$reportUnit,attendLeader:$attendLeader,meetingType:$meetingType) {
      id
    }
  }
`;

function commit(
  environment,
  beginTime,
  meetingRoomId,
  endTime,
  meetingName,
  organizer,
  configuration,
  intro,
  orgIds,
  requirement,
  reportUnit,
  attendLeader,
  meetingType,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      beginTime: beginTime,
      meetingRoomId: meetingRoomId,
      endTime: endTime,
      meetingName: meetingName,
      organizer: organizer,
      configuration: configuration,
      intro: intro,
      orgIds:orgIds,
      requirement:requirement,
      reportUnit:reportUnit,
      attendLeader:attendLeader,
      meetingType:meetingType
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };