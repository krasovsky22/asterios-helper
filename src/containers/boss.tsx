import React, { useCallback, useState } from "react";
import { BossCard } from "@/components";
import useContent from "@hooks/use-content";
import { BOSS_TYPE } from "@constants/bosses";
import { toast } from "react-toastify";
import { useInterval } from "beautiful-react-hooks";

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
  const bossData = useContent(name)!;

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

  const killedAt = new Date(bossData && bossData.pubDate);
  const respawnStartTime = new Date(bossData && bossData.pubDate);
  respawnStartTime.setHours(respawnStartTime.getHours() + 18);

  const respawnEndTime = new Date(bossData && bossData.pubDate);
  respawnEndTime.setHours(respawnStartTime.getHours() + 30);

  useInterval(() => {
    const now = new Date();
    if (name === "Boss Death Lord Hallate") {
      console.log(now, respawnStartTime);
    }
    if (now > respawnStartTime && now < respawnEndTime) {
      setState({ ...state, isSpawning: true });
      return;
    }

    if (now > respawnEndTime) {
      setState({ isSpawning: false, isSpawned: true });
      return;
    }

    setState(DefaultState);
  }, 1000);

  if (!bossData) {
    return null;
  }

  const { isSpawned, isSpawning } = state;
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
