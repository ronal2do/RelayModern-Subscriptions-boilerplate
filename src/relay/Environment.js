/**
 * @flow
 */
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const fetchQuery = async (operation, variables, cacheConfig, uploadables) => {
  return fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

function setupSubscription(config, variables, cacheConfig, observer) {
  const query = config.text
  const subscriptionClient = new SubscriptionClient(
    'ws://localhost:5000/graphql',
    {
      reconnect: true,
    }
  )

  const onNext = result =>
    observer.onNext(result)
  
  const onError = error =>
    observer.onError(error)

  const onComplete = () =>
    observer.onCompleted()

  const client = subscriptionClient
    .request({ query, variables })
    .subscribe(onNext, onError, onComplete)

  return {
    dispose: client.unsubscribe,
  }
}

const network = Network.create(fetchQuery, setupSubscription)

const source = new RecordSource()
const store = new Store(source)

const environment = new Environment({
  network,
  store,
})

export default environment