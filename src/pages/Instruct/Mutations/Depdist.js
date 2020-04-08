import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation DepdistMutation(
    $require: String
    $instructionsId: ID!
    $disposePeople: [String]!
) {
    depResolveInstructions(require: $require,instructionsId: $instructionsId,disposePeople: $disposePeople) {
      id
    }
  }
`;

function commit(
  environment,
  require,
  instructionsId,
  disposePeople,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        require: require,
        instructionsId: instructionsId,
        disposePeople: disposePeople,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };