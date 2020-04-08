import graphql from 'babel-plugin-relay/macro';
import {
    commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation BranchdistMutation(
    $instructionsId: ID!) {
    resolveInstructions(instructionsId: $instructionsId) {
      id
    }
  }
`;

function commit(
    environment,
    instructionsId,
    onCompleted,
    error
) {
    return commitMutation(environment, {
        mutation,
        variables: {
            instructionsId:instructionsId,
        },
        onCompleted: onCompleted,
        onError: error,
    }
    );
}

export default { commit };