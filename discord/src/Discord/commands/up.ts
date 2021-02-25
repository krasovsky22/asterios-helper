import DiscordClient from '../client';
import { findBossNameByFloor } from '../constants';

import { Command } from './command-type';
import { playSoundQueue } from './utils/sound-player';

const BOSS_SPAWN_SOUND =
  'https://discord-audio-files.s3-us-west-1.amazonaws.com/pioneer.mp3';

const UpCommand: Command = {
  command: 'up',
  description:
    'Will create voice notification what boss spawned. Parameters: cabrio, 3, 8, 11',
  execute: async (args, client) => {
    if (!args) {
      return 'Missing parameter.';
    }
    const boss = [...args].shift();

    if (!boss) {
      return 'Missing parameter.';
    }

    const queueToPlay = [BOSS_SPAWN_SOUND];

    await playSoundQueue(DiscordClient, queueToPlay);
    const bossName = findBossNameByFloor(boss === 'cabrio' ? 0 : +boss);

    return `${bossName} just spawned. `;
  },
};

export default UpCommand;
