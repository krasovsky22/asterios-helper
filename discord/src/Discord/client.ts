import Discord = require('discord.js');
import * as dotenv from 'dotenv';

import { ChestCommand, ListBossesCommand } from './commands';
import { prefix } from './config.json';

dotenv.config();

const DiscordClient = new Discord.Client();

DiscordClient.once('ready', () => {
  console.log('Ready!');
});

function getAvailableCommands() {
  return [ListBossesCommand, ChestCommand];
}

DiscordClient.on('message', async (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length).split(' ');
  const args = [...commandBody].slice(1);
  const command = [...commandBody].shift().toLowerCase();

  let commandResponse;
  switch (command) {
    case 'commands': {
      const commands = getAvailableCommands();
      commandResponse =
        'Available Commands: \n' +
        commands
          .map((command) => `${command.command}: ${command.description}`)
          .join('\n');
      break;
    }
    case ListBossesCommand.command: {
      commandResponse = ListBossesCommand.execute();
      break;
    }
    case ChestCommand.command: {
      commandResponse = ChestCommand.execute(args);
      break;
    }

    default:
      commandResponse = 'Unknown command';
      break;
  }

  message.channel.send(commandResponse);
});

export default DiscordClient;
