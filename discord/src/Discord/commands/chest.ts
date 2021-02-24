import BossData, { findBossNameByFloor } from '../constants';

import { Command } from './command-type';

const ChestCommand: Command = {
  command: 'chest',
  description:
    'Will show target message for a chest. Parameters: cabrio, 3, 8, 11',
  execute: (args) => {
    if (!args) {
      return 'Missing parameter.';
    }
    const boss = args.shift();

    if (!boss) {
      return 'Missing parameter.';
    }

    const bossName = findBossNameByFloor(boss === 'cabrio' ? 0 : +boss);
    return (
      BossData[bossName].chest ??
      'Incorrect parameter detected. Available: cabrio, 3, 8, 11'
    );
  },
};

export default ChestCommand;
