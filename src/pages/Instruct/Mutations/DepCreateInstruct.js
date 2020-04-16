import graphql from 'babel-plugin-relay/macro';
import {
  commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation DepCreateInstructMutation(
    $classify: enumTypeInstructionsClassify!
    $disposePeople: [String]!
    $sourceTime: DateTime
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
    $startTime: DateTime!,
		$receiptRequire: String = ""
) {
    depCreateInstructions(classify: $classify,disposePeople: $disposePeople,sourceTime: $sourceTime,deadline: $deadline,
    annex: $annex,isNeedReceipt: $isNeedReceipt,source: $source,hostDepartment: $hostDepartment,initiator: $initiator
    require: $require,priority: $priority,name: $name,startDepartment: $startDepartment,startTime: $startTime,receiptRequire: $receiptRequire) {
      id
    }
  }
`;

function commit(
  environment,
  classify,
  disposePeople,
  sourceTime,
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
        disposePeople: disposePeople,
        sourceTime: sourceTime,
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