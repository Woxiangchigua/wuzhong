import graphql from 'babel-plugin-relay/macro';
import {
    commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation UpdateMeetingMutation(
    $id: ID!
    $orgIds: [ID]!
    $endTime: DateTime!
    $meetingRoomId: ID!
    $organizer: String!
    $configuration: String = ""
    $intro: String = ""
    $beginTime: DateTime!
    $meetingName: String!
    $requirement: String = "false,false,false,false,false",
    $reportUnit: String!
    $attendLeader: String!
    $meetingType: enumMeetingType!
    $meetingFile: [meetingFileInput]) {
    updateMeeting(id: $id,beginTime: $beginTime,meetingRoomId: $meetingRoomId,
      endTime: $endTime,orgIds:$orgIds,meetingName: $meetingName,organizer: $organizer,configuration: $configuration,intro: $intro,requirement:$requirement,reportUnit:$reportUnit,attendLeader:$attendLeader,meetingType:$meetingType,meetingFile:$meetingFile) {
      id
    }
  }
`;

function commit(
    environment,
    id,
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
    meetingFile,
    onCompleted,
    error
) {
    return commitMutation(environment, {
        mutation,
        variables: {
            id:id,
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
            meetingType:meetingType,
            meetingFile:meetingFile
        },
        onCompleted: onCompleted,
        onError: error,
    }
    );
}

export default { commit };