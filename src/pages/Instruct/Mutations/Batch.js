import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation BatchMutation(
    $askForReply: String!
    $id: ID!
) {
    depAskForReply(askForReply: $askForReply,id: $id) {
      id
    }
  }
`;

function commit(
  environment,
  askForReply,
  id,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        askForReply: askForReply,
        id: id,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };