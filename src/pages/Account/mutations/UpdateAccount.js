import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation UpdateAccountMutation(
        $id: ID!, 
        $name: String,
        $roles: [String!],        
        $status: Status
        ) {
    updateAccount(
        id: $id,
        name: $name,
        roles: $roles,
        status: $status
    ) {
        id
        username
        roles
        status
        createdAt
    }
  }
`;

function commit(
  environment,
  id,
  name,
  roles,
  status,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      id: id,
      name: name,
      roles: roles,
      status: status
    },
    onCompleted: onCompleted,
    onError: onError
  }
  );
}

export default { commit };