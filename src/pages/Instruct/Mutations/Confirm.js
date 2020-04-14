import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation ConfirmMutation(
    $id: ID!
) {
    instructionsAffirm(id: $id) {
      id
    }
  }
`;

function commit(
  environment,
  id,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        id: id,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };