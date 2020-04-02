import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation AddpersonMutation($id: ID!,$orgId: ID!,$accountIds: [ID]!) {
    AddOrgMeetingAccount(id: $id,orgId: $orgId,accountIds: $accountIds) {
        id
    }
  }
`;

function commit(
  environment,
  id,
  orgId,
  accountIds,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      id: id,
	  orgId: orgId,
	  accountIds: accountIds,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };