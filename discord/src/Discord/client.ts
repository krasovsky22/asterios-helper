import * as Discord from 'discord.js';

import { ChestCommand, ListBossesCommand, UpCommand } from './commands';
import { prefix } from './config.json';

const COMMANDS_CHANNEL = process.env.DISCORD_COMMANDS_CHANNEL;
const VOICE_CHANNEL_TO_JOIN = process.env.DISCORD_VOICE_CHANNEL;

const DiscordClient = new Discord.Client();

DiscordClient.once('ready', async () => {
  console.log('Ready!');

  const voiceChannel = DiscordClient.channels.cache.find((channel) => {
    const tChannel = channel as Discord.GuildChannel;
    return tChannel.type === 'voice' && tChannel.name === VOICE_CHANNEL_TO_JOIN;
  }) as Discord.VoiceChannel;

  voiceChannel && voiceChannel.join();
});

function getAvailableCommands() {
  return [ListBossesCommand, ChestCommand, UpCommand];
}

DiscordClient.on('message', async (message) => {
  if (message.author.bot) return;

  const messageChannel = message.channel as Discord.TextChannel;
  if (messageChannel.name !== COMMANDS_CHANNEL) return;
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
    case UpCommand.command: {
      commandResponse = UpCommand.execute(args, DiscordClient);
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

  commandResponse && message.channel.send(commandResponse);
});

export default DiscordClient;
