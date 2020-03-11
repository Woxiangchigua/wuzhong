import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation CreateBulletinMutation(
    $name: String!
    $source: String!
    $annex: [bulletInFileInput]) {
    createBulletin(name: $name,source: $source,annex: $annex) {
      id
    }
  }
`;

function commit(
  environment,
  name,
  source,
  annex,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      name: name,
      source: source,
      annex: annex,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };