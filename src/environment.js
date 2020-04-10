import { SubscriptionClient } from 'subscriptions-transport-ws'
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';


// const host = "192.168.2.34:8080";
const host = window.location.host;
const grahhqlurl = `http://${host}/api/v1/graphql`;
const loginurl = `http://${host}/api/login`;
const wsurl = `ws://${host}/api/v1/subscriptions`;

function fetchQuery(url, token) {
  return function (
    operation,
    variables1,
    cacheConfig,
    uploadables,
  ) {
    const variables = Object.assign({}, variables1);
    const request = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (uploadables) {
      console.log(uploadables);
      if (!window.FormData) {
        throw new Error('Uploading files without `FormData` not supported.');
      }

      const fileMap = [];
      const writeMapFromFileAndMarkVariable = (searchable, parents) => {
        Object.keys(searchable).forEach((key) => {
          const currentValue = searchable[key];

          if (typeof currentValue === 'object' && (currentValue.constructor === Object || currentValue.constructor === Array)) {
            writeMapFromFileAndMarkVariable(currentValue, [...parents, key]);
          } else {
            fileMap.push({
              operationPath: ['variables', ...parents, key].join('.'),
              file: currentValue,
            });

            let currentDepthVariable = variables;
            parents.forEach((parent) => {
              if (!currentDepthVariable[parent]) {
                currentDepthVariable[parent] = {};
              }
              currentDepthVariable = currentDepthVariable[parent];
            });

            currentDepthVariable[key] = null;
          }
        });
      };

      writeMapFromFileAndMarkVariable(uploadables, []);

      const formData = new FormData();
      formData.append('operations', JSON.stringify({ query: operation.text, variables: variables }));
      formData.append('map', JSON.stringify(fileMap.reduce((reducedMap, value, index) => ({ ...reducedMap, [index]: [value.operationPath] }), {})));

      fileMap.forEach((mapValue, index) => {
        formData.append(index, mapValue.file);
      });

      request.body = formData;
    } else {
      request.headers['Content-Type'] = 'application/json';
      request.body = JSON.stringify({
        query: operation.text,
        variables,
      });
    }

    return fetch(url, request)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function setupSubscription(url, token) {
  return function (config, variables, cacheConfig, observer) {
    const query = config.text;
    const subscriptionClient = new SubscriptionClient(url + "?token=" + token, {
      reconnect: true
    });

    const client = subscriptionClient.request({ query, variables }).subscribe({
      next: result => {
        observer.onNext({ data: result.data });
      },
      complete: () => {
        observer.onCompleted();
      },
      error: error => {
        observer.onError(error);
      }
    });
    return {
      dispose: client.unsubscribe
    };
  }
}

const store = new Store(new RecordSource())
function environment(token) {
  let url = token ? grahhqlurl : loginurl;

  const network = Network.create(fetchQuery(url, token), setupSubscription(wsurl, token))
  const environment = new Environment({
    network,
    store
  });

  return environment;
}

export default environment;