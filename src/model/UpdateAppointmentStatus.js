import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation UpdateAppointmentStatusMutation($id: ID!, $status: Int!,$remark: String) {
    updateAppointmentStatus(id: $id, status: $status, remark: $remark){
      id,
      status
    }
  }
`;

function commit(
  environment,
  id,
  status,
  remark,
  onCompleted
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      id: id,
      status: status,
      remark: remark
    },
    onCompleted: onCompleted,
    onError: err => console.error(err),
  }
  );
}

export default { commit };