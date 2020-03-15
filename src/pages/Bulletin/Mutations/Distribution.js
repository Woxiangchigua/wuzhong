import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation DistributionMutation(
    $deadline: DateTime!
    $distributions: [BulletinDistributionInput]!
    $id: ID!
    $priority: Int!) {
    splitBulletin(deadline: $deadline,distributions: $distributions,id: $id,priority: $priority) {
      id
    }
  }
`;

function commit(
  environment,
  deadline,
  distributions,
  id,
  priority,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      deadline: deadline,
      distributions: distributions,
      id: id,
      priority: priority,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };