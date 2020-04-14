import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation CreateInstructMutation(
    $classify: enumTypeInstructionsClassify!
    $jointlyDepartment: [String]
    $sourceTime: DateTime
    $status: enumTypeInstructionsStatus!
    $deadline: DateTime!
    $annex: [annexInput]
    $isNeedReceipt: enumTypeInstructionsIsNeedReceipt!
    $source: String!
    $hostDepartment: String!
    $initiator: ID!
    $require: String!
    $priority: Int!
    $name: String!
    $startDepartment: String!
    $startTime: DateTime!
    $receiptRequire: String = ""
) {
   createInstructions(classify: $classify,jointlyDepartment: $jointlyDepartment,sourceTime: $sourceTime,status: $status,deadline: $deadline,
    annex: $annex,isNeedReceipt: $isNeedReceipt,source: $source,hostDepartment: $hostDepartment,initiator: $initiator
    require: $require,priority: $priority,name: $name,startDepartment: $startDepartment,startTime: $startTime,receiptRequire: $receiptRequire) {
      id
    }
  }
`;

function commit(
  environment,
  classify,
  jointlyDepartment,
  sourceTime,
  status,
  deadline,
  annex,
  isNeedReceipt,
  source,
  hostDepartment,
  initiator,
  require,
  priority,
  name,
  startDepartment,
  startTime,
  receiptRequire,
  onCompleted,
  error
) {
  return commitMutation(environment, {
    mutation,
    variables: {
        classify: classify,
        jointlyDepartment: jointlyDepartment,
        sourceTime: sourceTime,
        status: status,
        deadline: deadline,
        annex: annex,
        isNeedReceipt: isNeedReceipt,
        source: source,
        hostDepartment: hostDepartment,
        initiator: initiator,
        require: require,
        priority: priority,
        name: name,
        startDepartment: startDepartment,
        startTime: startTime,
        receiptRequire: receiptRequire,
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };