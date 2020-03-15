import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation ArchiveMutation(
		$receiptReply: String!
		$receiptAnnex: [bulletInFileInput]
    $id: ID!) {
    bulletinArchived(id: $id,receiptReply: $receiptReply,receiptAnnex: $receiptAnnex) {
        id
    }
  }
`;

function commit(
  environment,
  id,
	receiptReply,
	receiptAnnex,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        id: id,
				receiptReply: receiptReply,
				receiptAnnex: receiptReply,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };