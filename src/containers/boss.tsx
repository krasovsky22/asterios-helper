import React, { useCallback, useState } from "react";
import { BossCard } from "@/components";
import useContent from "@hooks/use-content";
import { BOSS_TYPE } from "@constants/bosses";
import { toast } from "react-toastify";
import { useInterval } from "beautiful-react-hooks";
import { useAuthContext } from "@context/auth";

type BossContainerType = {
  name: BOSS_TYPE;
  image: string;
  chest: string;
  floor?: number;
};

type StateType = {
  isSpawning: boolean;
  isSpawned: boolean;
};

const DefaultState: StateType = {
  isSpawning: false,
  isSpawned: false,
};

const BossContainer: React.FC<BossContainerType> = ({ chest, name, image, floor = null }) => {
  const [state, setState] = useState<StateType>(DefaultState);
  const { bossData, markBossAsSpawned } = useContent(name)!;
  const { user } = useAuthContext();

  //copy into clipboard
  const handleOnClick = useCallback(() => {
    const tempInput = document.createElement("input");
    tempInput.value = chest;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    toast.success(
      <div>
        <b>{chest}</b>
        <br />
        Copied to clipboard
      </div>,
    );
  }, []);

  const killedAt = new Date(bossData?.pubDate ?? "");
  const respawnStartTime = new Date(bossData?.pubDate ?? "");

  respawnStartTime.setTime(killedAt.getTime() + 18 * 60 * 60 * 1000);

  const respawnEndTime = new Date(bossData?.pubDate ?? "");
  respawnEndTime.setTime(killedAt.getTime() + 30 * 60 * 60 * 1000);

  useInterval(() => {
    const now = new Date();

    if (now > respawnStartTime && now < respawnEndTime) {
      setState({ ...state, isSpawning: true });
      return;
    }

    if (name === "Boss Death Lord Hallate") {
      console.log(name, now, respawnEndTime);
    }

    if (now > respawnEndTime) {
      setState({ ...state, isSpawning: false, isSpawned: true });
      return;
    }

    setState(DefaultState);
  }, 1000);

  const handleMarkAsSpawned = useCallback(async () => {
    if (!state.isSpawning) {
      return toast.error(
        <div>
          <b>Boss hasn't spawned yet!</b> <br />
          Penalties may apply.
        </div>,
      );
    }

    const result = await markBossAsSpawned();

    if (result) {
      return toast.success(
        <div>
          <b>Thank you!</b>
        </div>,
      );
    }
  }, [bossData, state.isSpawning]);

  if (!bossData) {
    return null;
  }

  const { isSpawned, isSpawning } = state;
  const isMarkedSpawnedByMe = bossData.markedAsSpawned?.includes(user?.id ?? "") ?? false;
  let color = "black";

  if (isSpawning) {
    color = "orange";
  }

  if (isSpawned) {
    color = "green";
  }

  return (
    <BossCard title="Copy" onClick={handleOnClick}>
      <BossCard.Image src={image} alt={name}>
        {floor && <BossCard.BossFloor>Floor: {floor}</BossCard.BossFloor>}
      </BossCard.Image>
      <BossCard.Content color={color}>
        <BossCard.Title>{name}</BossCard.Title>
        <BossCard.DeathSection>
          <b>Killed at:</b>{" "}
          <p>
            {killedAt.toLocaleDateString()} {killedAt.toLocaleTimeString()}
          </p>
        </BossCard.DeathSection>
        <BossCard.DeathInfo>{bossData.content}</BossCard.DeathInfo>
        {user && isSpawning && (
          <BossCard.ActionButtonsSection
            isToggled={isMarkedSpawnedByMe}
            onClick={handleMarkAsSpawned}
          >
            {isMarkedSpawnedByMe ? "Notified!" : "Mark as spawned."}
          </BossCard.ActionButtonsSection>
        )}
        <BossCard.RespawnSection>
          <div>
            <b>Start Time:</b> {respawnStartTime.toLocaleString()}
          </div>
          <div>
            <b>Until:</b> {respawnEndTime.toLocaleString()}
          </div>
        </BossCard.RespawnSection>
      </BossCard.Content>
    </BossCard>
  );
};
export default BossContainer;
