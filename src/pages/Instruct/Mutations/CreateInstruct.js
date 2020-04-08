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
    $initiator: Int!
    $require: String!
    $priority: Int!
    $name: String!
    $startDepartment: String!
    $startTime: DateTime!
) {
   createInstructions(classify: $classify,jointlyDepartment: $jointlyDepartment,sourceTime: $sourceTime,status: $status,deadline: $deadline,
    annex: $annex,isNeedReceipt: $isNeedReceipt,source: $source,hostDepartment: $hostDepartment,initiator: $initiator
    require: $require,priority: $priority,name: $name,startDepartment: $startDepartment,startTime: $startTime) {
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
    },
    onCompleted: onCompleted,
    onError: error,
  }
  );
}

export default { commit };