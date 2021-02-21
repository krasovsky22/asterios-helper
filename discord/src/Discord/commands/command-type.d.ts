import { Client } from 'discord.js';
export type Command = {
  command: string;
  execute: (arg?: string[], client?: Client) => string | void;
  description: string;
};
