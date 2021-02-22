import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Parser from "rss-parser";
admin.initializeApp();

const parser = new Parser();

const asteriosBosses = [
  "Boss Death Lord Hallate",
  "Boss Kernon",
  "Boss Longhorn Golkonda",
  "Boss Shilen's Messenger Cabrio",
];

const bossesCollection = admin.firestore().collection("bosses");
const usersRatingCollection = admin.firestore().collection("users");

export const parseMainFeed = functions.https.onRequest(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.status(500).json({ error: "Server id is required" });
    return;
  }

  //get data from asterios
  const URL = `https://asterios.tm/index.php?cmd=rss&serv=${id}&id=keyboss&out=xml`;
  const feed = await parser.parseURL(URL);

  const { items } = feed;
  if (!items) {
    res.status(500).json({ error: "Unable to get last build date from Asterios" });
    return;
  }

  asteriosBosses.map(async (boss) => {
    const bossData = items.find((item) => item.title?.includes(boss));

    if (!bossData) {
      return;
    }

    const prevBossData = await bossesCollection
      .doc(boss)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        }

        return null;
      });

    if (prevBossData && bossData.pubDate) {
      const prevPubDate = new Date(prevBossData.pubDate);
      const currentPubDate = new Date(bossData.pubDate);

      if (prevPubDate < currentPubDate) {
        console.log(`New ${boss} kill detected. Updating...`);
        const peopleToUpdate = prevBossData?.markedAsSpawned ?? [];

        peopleToUpdate.map(async (personId: string) => {
          const currentRating = (await usersRatingCollection
            .doc(personId)
            .get()
            .then((doc) => (doc.exists ? doc.data() : null))) ?? { rating: 0 };

          console.log(`Increasing rating for user. ${personId}`);
          await usersRatingCollection.doc(personId).set({ rating: currentRating.rating + 1 });
        });

        await bossesCollection.doc(boss).set(bossData);
      }
    } else {
      await bossesCollection.doc(boss).set(bossData);
    }
  });

  res.json({ error: "Done" });
});
