import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation CreateEmployeeMutation(
        $name: String!,
        $phoneNum: String!,
        $jobID: ID!
        $offerCategoryID: ID!,
        $jobNum: String!,
        $orgID: ID!,
        $titleID: ID!,
        $status: EnumTypeEmployeeStatus!,
        $isPrincipal: Boolean!
        $remark: String!
        ) {
    createEmployee(
        name: $name,
        phoneNum: $phoneNum,
        jobID: $jobID,
        offerCategoryID: $offerCategoryID,
        jobNum: $jobNum,
        orgID: $orgID,
        titleID: $titleID,
        status: $status,
        isPrincipal: $isPrincipal,
        remark: $remark
    ) {
        id
        name
    }
  }
`;

function commit(
  environment,
  name,
  phoneNum,
  jobID,
  offerCategoryID,
  jobNum,
  orgID,
  titleID,
  status,
  isPrincipal,
  remark,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        name: name,
        phoneNum: phoneNum,
        jobID: jobID,
        offerCategoryID: offerCategoryID,
        jobNum: jobNum,
        orgID: orgID,
        titleID: titleID,
        status: status,
        isPrincipal: isPrincipal,
        remark: remark
      },
      onCompleted: onCompleted,
      onError: onError
  });
}

export default { commit };