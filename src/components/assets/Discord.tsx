import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";

const DiscordIcon: React.FC = () => {
  return <FontAwesomeIcon icon={faDiscord} />;
};

export default memo(DiscordIcon);
