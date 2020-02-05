import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation CreateTokenMutation($password: String!, $username: String!) {
    createToken(password: $password,username: $username) {
      code
      expire
      token
    }
  }
`;

function commit(
  environment,
  username,
  password,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      username: username,
      password: password
    },
    onCompleted: onCompleted,
    onError: onError
  }
  );
}

export default { commit };