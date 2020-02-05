import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation UpdateAuthorityMutation(
        $role: String!, 
        $data: [[String!]!]!
        ) {
    updateAuthority(
        role: $role,
        data: $data
    ) {
        role
        data
    }
  }
`;

function commit(
  environment,
  role,
  data,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      role: role,
      data: data
    },
    onCompleted: onCompleted,
    onError: onError
  }
  );
}

export default { commit };