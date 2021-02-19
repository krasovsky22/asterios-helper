import React, { useCallback } from "react";
import { BossCard } from "@/components";
import useContent from "@hooks/use-content";
import { BOSS_TYPE } from "@constants/bosses";
import { toast } from "react-toastify";

type BossContainerType = {
  name: BOSS_TYPE;
  image: string;
  chest: string;
  floor?: number;
};
const BossContainer: React.FC<BossContainerType> = ({ chest, name, image, floor = null }) => {
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

  if (!bossData) {
    return null;
  }

  const killedAt = new Date(bossData.pubDate);
  const respawnStartTime = new Date(bossData.pubDate);
  respawnStartTime.setHours(respawnStartTime.getHours() + 18);

  const respawnEndTime = new Date(bossData.pubDate);
  respawnEndTime.setHours(respawnStartTime.getHours() + 30);

  return (
    <BossCard title="Copy" onClick={handleOnClick}>
      <BossCard.Image src={image} alt={name}>
        {floor && <BossCard.BossFloor>Floor: {floor}</BossCard.BossFloor>}
      </BossCard.Image>
      <BossCard.Content>
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
            <b>Start Time:</b> {respawnStartTime.toLocaleDateString()}{" "}
            {respawnStartTime.toLocaleTimeString()}
          </div>
          <div>
            <b>Until:</b> {respawnEndTime.toLocaleDateString()}{" "}
            {respawnEndTime.toLocaleTimeString()}
          </div>
        </BossCard.RespawnSection>
      </BossCard.Content>
    </BossCard>
  );
};
export default BossContainer;
