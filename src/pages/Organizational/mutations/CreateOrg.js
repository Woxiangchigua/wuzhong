import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation CreateOrgMutation(
        $name: String!,
        $parentID: ID!
        $orgCategoryID: ID!
        $remark: String!

        ) {
    createOrg(
        name: $name,
        parentID: $parentID,
        orgCategoryID: $orgCategoryID,
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
  parentID,
  orgCategoryID,
  remark,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        name: name,
        parentID: parentID,
        orgCategoryID: orgCategoryID,
        remark: remark
      },
      onCompleted: onCompleted,
      onError: onError
  });
}

export default { commit };