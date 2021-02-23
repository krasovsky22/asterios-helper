import Firebase from 'firebase/app';

import { BossDataType } from './client';

require('firebase/firestore');
require('firebase/auth');

// we need to seed the database;

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebase = Firebase.initializeApp(config);

const cachedResults = new Map<string, BossDataType>();

export function handleDataUpdate(callBack) {
  firebase
    .firestore()
    .collection('bosses')
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const bossData = doc.data() as BossDataType;
        //cache is not initialized -> set it
        if (!cachedResults.has(doc.id)) {
          cachedResults.set(doc.id, bossData);
          return;
        }

        const cachedBossData = cachedResults.get(doc.id);
        const prevMarkedAsSpawned =
          cachedResults.get(doc.id)['markedAsSpawned'] ?? [];

        cachedResults.set(doc.id, bossData);

        const pubDate = new Date(bossData.pubDate);
        const cachedPubDate = new Date(cachedBossData.pubDate);

        //if new death report detected
        if (pubDate > cachedPubDate) {
          callBack(doc.data(), doc.id, 'NEW_DEATH');
        }

        //if someone new marked that boss spawned
        if (
          (bossData?.markedAsSpawned?.length ?? 0) > prevMarkedAsSpawned.length
        ) {
          callBack(doc.data(), doc.id, 'NEW_REPORT');
        }
      });
    });
}
