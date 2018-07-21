/**
 * @flow
 * @relayHash 5156668f71f300df384ff18eb271c9fb
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UserAddedSubscriptionVariables = {||};
export type UserAddedSubscriptionResponse = {|
  +UserAdded: ?{|
    +node: ?{|
      +id: string,
      +_id: ?string,
      +name: ?string,
    |}
  |}
|};
*/


/*
subscription UserAddedSubscription {
  UserAdded {
    node {
      id
      _id
      name
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "UserAdded",
    "storageKey": null,
    "args": null,
    "concreteType": "UserEdge",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "_id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "operationKind": "subscription",
  "name": "UserAddedSubscription",
  "id": null,
  "text": "subscription UserAddedSubscription {\n  UserAdded {\n    node {\n      id\n      _id\n      name\n    }\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "UserAddedSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": v0
  },
  "operation": {
    "kind": "Operation",
    "name": "UserAddedSubscription",
    "argumentDefinitions": [],
    "selections": v0
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '37b2cc4c07136f42be50561a5bc93e1e';
module.exports = node;
