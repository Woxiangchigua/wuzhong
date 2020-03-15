import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

// const mutation = graphql`
//   mutation AuditMeetingMutation(
//     $id: ID!
//     $review: EnumTypeAuditMeetingType!) {
//     auditMeeting(id: $id,review: $review) {
//         applyUserId,
//         beginTime,
//         configuration,
//         createdAt,
//         deletedAt,
//         endTime,
//         id,
//         intro,
//         meetingName,
//         meetingRoom{
//           id,
//           name
//         },
//         meetingRoomId,
//         organizer,
//         review,
//         reviewUserId,
//         status,
//         updatedAt
//     }
//   }
// `;

function commit(
  environment,
  id,
  review,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      id: id,
      review: review,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };