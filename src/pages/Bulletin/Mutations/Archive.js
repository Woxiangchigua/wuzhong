import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation ArchiveMutation(
    $bulletinIds: [ID]!) {
    bulletinArchived(bulletinIds: $bulletinIds) {
      edges{
        id
      }
    }
  }
`;

function commit(
  environment,
  bulletinIds,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        bulletinIds: bulletinIds,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };