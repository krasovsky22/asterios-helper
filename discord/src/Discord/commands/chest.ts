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

    const envValue = process.env[`CHEST_${boss.toUpperCase()}`];

    if (!envValue) {
      return 'Incorrect parameter detected. Available: cabrio, 3, 8, 11';
    }

    return envValue;
  },
};

export default ChestCommand;
