import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation AuditMutation(
    $bulletinDistributionIds: [ID]!) {
    bulletinDistributionIsReview(bulletinDistributionIds: $bulletinDistributionIds) {
      edges{
        id
      }
    }
  }
`;

function commit(
  environment,
  bulletinDistributionIds,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        bulletinDistributionIds: bulletinDistributionIds,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };