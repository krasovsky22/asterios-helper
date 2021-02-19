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
    res
      .status(500)
      .json({ error: "Unable to get last build date from Asterios" });
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

        return;
      });

    if (prevBossData && bossData["pubDate"]) {
      const prevPubDate = new Date(prevBossData.pubDate);
      const currentPubDate = new Date(bossData["pubDate"]);

      if (prevPubDate < currentPubDate) {
        console.log(`New ${boss} kill detected. Updating...`);
        await bossesCollection.doc(boss).set(bossData);
      }
    } else {
      await bossesCollection.doc(boss).set(bossData);
    }
  });

  res.json({ error: "Done" });
  return;
});
