import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation UpdateOfferCategoryMutation(
        $id: ID
        $name: String!
        $remark: String!
        $orderNumber: Int!
        ) {
    updateOfferCategory(
        id: $id
        name: $name
        remark: $remark
        orderNumber: $orderNumber
    ) {
        id
        name
    }
  }
`;

function commit(
  environment,
  id,
  name,
  remark,
  orderNumber,
  onCompleted,
  onError
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        id: id,
        name: name,
        remark: remark,
        orderNumber: orderNumber
      },
      onCompleted: onCompleted,
      onError: onError
  });
}

export default { commit };