import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation CreateBulletinMutation(
    $name: String!
    $source: String!
    $annex: [bulletInFileInput]
    $isNeedReceipt: enumTypeBulletinIsNeedReceipt
    $receiptReq: String = "") {
    createBulletin(name: $name,source: $source,annex: $annex,isNeedReceipt: $isNeedReceipt,receiptReq: $receiptReq) {
      id
    }
  }
`;

function commit(
  environment,
  name,
  source,
  annex,
  isNeedReceipt,
  receiptReq,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
      name: name,
      source: source,
      annex: annex,
      isNeedReceipt: isNeedReceipt,
      receiptReq: receiptReq,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };