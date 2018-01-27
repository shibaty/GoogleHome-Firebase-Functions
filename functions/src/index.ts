'use strict';

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

export const ElectronicsController = functions.https.onRequest((request, response) => {

  const target: string = request.body.result.parameters.target;
  const action: string = request.body.result.parameters.action;

  console.log("target: " + target + " action: " + action);

  (async () => {

    const db = admin.database();
    const ref = db.ref("electronics");
    await ref.set({
      target: target,
      action: action,
      update_time: (new Date()).getTime()
    });
  })();

  response.setHeader("Content-Type", "application/json");
  response.send(
    JSON.stringify({
      "speech": "できました",
      "displayText": "できました"
    })
  );
});
