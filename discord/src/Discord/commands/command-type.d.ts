import { Client } from 'discord.js';
export type Command = {
  command: string;
  execute: (
    arg?: string[],
    client?: Client,
    options?: Record<string, unknown>
  ) => string | void;
  description: string;
};
