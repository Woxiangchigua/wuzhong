import graphql from 'babel-plugin-relay/macro';
import {
    commitMutation
} from 'react-relay';

const mutation = graphql`
  mutation UpdateinstructMutation(
    $startDepartment: String!
    $hostDepartment: String!
    $priority: Int!
    $annex: [annexInput]
    $name: String!
    $jointlyDepartment: [String]
    $require: String!
    $classify: enumTypeInstructionsClassify!
    $deadline: DateTime!
    $initiator: ID!
    $id: ID!
    $source: String!
    $sourceTime: DateTime
    $startTime: DateTime!
    $status: enumTypeInstructionsStatus!
    $isNeedReceipt: enumTypeInstructionsIsNeedReceipt!
    $receiptRequire: String = ""
    ) {
    updateInstructions(id: $id,classify: $classify,jointlyDepartment: $jointlyDepartment,sourceTime: $sourceTime,status: $status,deadline: $deadline,
        annex: $annex,isNeedReceipt: $isNeedReceipt,source: $source,hostDepartment: $hostDepartment,initiator: $initiator
        require: $require,priority: $priority,name: $name,startDepartment: $startDepartment,startTime: $startTime,receiptRequire: $receiptRequire) {
      id
    }
  }
`;

function commit(
    environment,
    id,
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
            id:id,
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