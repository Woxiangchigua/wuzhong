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
    variables,
  ) {
    const headers = {
      'Accept': "application/json",
      'Content-Type': 'application/json',
    }

    if (token)
      headers['Authorization'] = 'Bearer ' + token;

    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(response => {
      return response.json();
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