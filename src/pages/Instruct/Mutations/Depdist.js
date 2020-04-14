import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation DepdistMutation(
    $require: String
    $instructionsId: ID!
    $disposePeople: [String]!
    $kind: enumTypeInstructionsToDoKind
) {
    depResolveInstructions(require: $require,instructionsId: $instructionsId,disposePeople: $disposePeople,kind: $kind) {
      id
    }
  }
`;

function commit(
  environment,
  require,
  instructionsId,
  disposePeople,
  kind,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        require: require,
        instructionsId: instructionsId,
        disposePeople: disposePeople,
        kind: kind,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };