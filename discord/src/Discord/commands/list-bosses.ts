import { Command } from './command-type';

const Bosses = process.env?.BOSSES?.split('|') ?? [];

const ListBosses: Command = {
  command: 'list',
  description: 'Will show bosses we are currently tacking.',
  execute: () => {
    return 'Bosses I know about: ' + Bosses.join(', ');
  },
};

export default ListBosses;
