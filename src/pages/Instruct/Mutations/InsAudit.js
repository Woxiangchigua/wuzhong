import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation InsAuditMutation(
    $rejectReply: String
    $id: ID!
    $status: enumTypeInstructionsStatus!
) {
    depRejectReply(rejectReply: $rejectReply,id: $id,status: $status) {
      id
    }
  }
`;

function commit(
  environment,
  rejectReply,
  id,
  status,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        rejectReply: rejectReply,
        id: id,
        status: status,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };