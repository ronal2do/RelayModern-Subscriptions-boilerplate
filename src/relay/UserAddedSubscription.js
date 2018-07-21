import { graphql, requestSubscription } from 'react-relay'
import environment from './Environment'
import { ConnectionHandler } from 'relay-runtime'

const UserAddedSubscription = graphql`
  subscription UserAddedSubscription {
    UserAdded {
      node {
        id
        _id
        name
      }
    }
  }
`

export default () => {
  const subscriptionConfig = {
    subscription: UserAddedSubscription,
    variables: {},
    updater: store => {
      const rootField = store.getRootField('UserAdded')
      const node = rootField.getLinkedRecord('node')
      const userId = node.getValue('id')
      const userProxy = store.get(userId)
      const clientProxy = store.get('client:root')

      const connection = ConnectionHandler.getConnection(
        clientProxy,
        'App_users',
        {}
      )

      const edge = ConnectionHandler.createEdge(
        store,
        userProxy,
        node,
        'App_users'
      )
      ConnectionHandler.insertEdgeBefore(connection, edge)
    },

    onError: error => console.log(`An error occured:`, error),
  }

  requestSubscription(environment, subscriptionConfig)
}