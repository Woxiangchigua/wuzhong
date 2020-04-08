import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation PolicerejectMutation(
    $id: ID!
    $reject: String
) {
    policeReject(id: $id,reject: $reject) {
      id
    }
  }
`;

function commit(
  environment,
  id,
  reject,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        id: id,
        reject: reject,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };