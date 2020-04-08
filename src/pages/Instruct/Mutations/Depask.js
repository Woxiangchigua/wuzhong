import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation DepaskMutation(
    $askFor: String
    $id: ID!
) {
    depAskFor(askFor: $askFor,id: $id) {
      id
    }
  }
`;

function commit(
  environment,
  askFor,
  id,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        askFor: askFor,
        id: id,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };