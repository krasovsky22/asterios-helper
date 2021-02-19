import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "@context/firebase";
import { BOSS_TYPE } from "@constants/bosses";

type BossSnapshotDataType = {
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
};

export default function useContent(boss: BOSS_TYPE) {
  const [bossData, setBossData] = useState<BossSnapshotDataType | null>(null);

  const { firebase } = useContext(FirebaseContext)!;

  useEffect(() => {
    firebase
      ?.firestore()
      .collection("bosses")
      .doc(boss)
      .onSnapshot((snapshot) => {
        setBossData(snapshot.data() as BossSnapshotDataType);
      });
  }, [firebase]);

  return bossData;
}
