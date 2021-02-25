import { findBossNameByFloor } from '../constants';

import { Command } from './command-type';
import { playSoundQueue } from './utils/sound-player';

const BOSS_DEATH_SOUND =
  'https://www.myinstants.com/media/sounds/pornhub-community-intro.mp3';

const UpCommand: Command = {
  command: 'kill',
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

    const queueToPlay = [BOSS_DEATH_SOUND];

    const bossName = findBossNameByFloor(boss === 'cabrio' ? 0 : +boss);

    await playSoundQueue(client, queueToPlay);

    return `${bossName} just died.`;
  },
};

export default UpCommand;
