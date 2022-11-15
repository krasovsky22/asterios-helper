import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "@context/firebase";
import { BOSS_TYPE } from "@constants/bosses";
import { useAuthContext } from "@context/auth";

type BossSnapshotDataType = {
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
  markedAsSpawned?: string[];
};

export default function useContent(boss: BOSS_TYPE) {
  const [bossData, setBossData] = useState<BossSnapshotDataType | null>(null);
  const { user } = useAuthContext();

  const { firebase } = useContext(FirebaseContext)!;

  useEffect(() => {
    firebase
      ?.firestore()
      .collection("bosses")
      .doc(boss)
      console.log(boss)
      .onSnapshot((snapshot) => {
        setBossData(snapshot.data() as BossSnapshotDataType);
      });
  }, [firebase]);

  const markBossAsSpawned = async () => {
    if (user && (bossData?.markedAsSpawned?.includes(user.id) ?? false) === false) {
      await firebase
        ?.firestore()
        .collection("bosses")
        .doc(boss)
        .set({ markedAsSpawned: [...(bossData?.markedAsSpawned ?? []), user.id] }, { merge: true });

      return true;
    }
  };

  return { bossData, markBossAsSpawned };
}
