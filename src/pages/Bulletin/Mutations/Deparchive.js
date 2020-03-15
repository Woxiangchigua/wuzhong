import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation DeparchiveMutation(
    $receiptAnnex: [bulletInFileInput]
    $id: ID!
    $receiptReply: String!) {
    bulletinDistributionDepArchived(receiptAnnex: $receiptAnnex,id: $id,receiptReply: $receiptReply) {
      id
    }
  }
`;

function commit(
  environment,
  receiptAnnex,
  id,
  receiptReply,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      receiptAnnex: receiptAnnex,
      id: id,
      receiptReply: receiptReply,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };