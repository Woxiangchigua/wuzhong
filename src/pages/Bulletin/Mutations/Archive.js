import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation ArchiveMutation(
    $receiptReply: String!
    $id: ID!
    $receiptAnnex: [bulletInFileInput]) {
    bulletinArchived(receiptReply: $receiptReply,id: $id,receiptAnnex: $receiptAnnex) {
      id
    }
  }
`;

function commit(
  environment,
  receiptReply,
  id,
  receiptAnnex,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      receiptReply: receiptReply,
      id: id,
      receiptAnnex: receiptAnnex,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };