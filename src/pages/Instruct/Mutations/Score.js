import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation ScoreMutation(
    $grade: Int!
    $id: ID!
) {
    policeGrade(grade: $grade,id: $id) {
      id
    }
  }
`;

function commit(
  environment,
  grade,
  id,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        grade: grade,
        id: id,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };