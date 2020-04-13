import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation UploadFileMutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      size
      url
    }
  }
`

function commit(environment, input, uploadables, onCompleted, onError) {
  return commitMutation(environment, {
    mutation,
    variables: { input },
    uploadables,
    onCompleted,
    onError
  })
}

export default { commit }