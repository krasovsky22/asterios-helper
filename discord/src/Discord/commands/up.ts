import { findBossNameByFloor } from '../constants';
import { updateBossDocument } from '../firebase';

import { Command } from './command-type';

const UpCommand: Command = {
  command: 'up',
  description:
    'Will create and update to database about boss spawned. Parameters: cabrio, 3, 8, 11',
  execute: (args, _client, { userId }: { userId?: string }) => {
    if (!args) {
      return 'Missing parameter.';
    }
    const boss = [...args].shift();

    if (!boss) {
      return 'Missing parameter.';
    }

    if (!userId) {
      return '';
    }

    const bossName = findBossNameByFloor(boss === 'cabrio' ? 0 : +boss);
    updateBossDocument(bossName, userId);

    return '';
  },
};

export default UpCommand;
