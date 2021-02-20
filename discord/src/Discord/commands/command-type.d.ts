export type Command = {
  command: string;
  execute: (arg?: string[]) => string;
  description: string;
};
