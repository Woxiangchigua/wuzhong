import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation DistributionMutation(
    $deadline: DateTime!
    $depIds: [ID]!
    $id: ID!
    $priority: Int!) {
    splitBulletin(deadline: $deadline,depIds: $depIds,id: $id,priority: $priority) {
      id
    }
  }
`;

function commit(
  environment,
  deadline,
  depIds,
  id,
  priority,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      deadline: deadline,
      depIds: depIds,
      id: id,
      priority: priority,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };