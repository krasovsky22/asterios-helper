import * as Discord from 'discord.js';

import {
  ChestCommand,
  DeathCommand,
  ListBossesCommand,
  SpawnCommand,
  UpCommand,
} from './commands';
import { prefix } from './config.json';
import BossData from './constants';
import { handleDataUpdate } from './firebase';

const COMMANDS_CHANNEL = (process.env.DISCORD_COMMANDS_CHANNEL ?? '').split(
  '|'
);
const VOICE_CHANNEL_TO_JOIN = (process.env.DISCORD_VOICE_CHANNEL ?? '').split(
  '|'
);

const DiscordClient = new Discord.Client();

export type BossDataType = {
  markedAsSpawned?: string[];
  title: string;
  pubDate: string;
};
type ACTION_TYPES = 'NEW_DEATH' | 'NEW_REPORT';

let asteriosBotTextChannels;

DiscordClient.once('ready', async () => {
  console.log('Ready');

  const voiceChannels = DiscordClient.channels.cache.filter((channel) => {
    const tChannel = channel as Discord.GuildChannel;
    return (
      tChannel.type === 'voice' && VOICE_CHANNEL_TO_JOIN.includes(tChannel.name)
    );
  });

  voiceChannels.map((channel) => {
    const tChannel = channel as Discord.VoiceChannel;
    tChannel.join();
  });

  asteriosBotTextChannels = DiscordClient.channels.cache.filter((channel) => {
    const tChannel = channel as Discord.GuildChannel;
    return COMMANDS_CHANNEL.includes(tChannel.name);
  });

  handleDataUpdate(
    (bossData: BossDataType, bossName: string, action_type: ACTION_TYPES) => {
      const floor = BossData[bossName].floor;

      if (action_type === 'NEW_REPORT') {
        //trigger spawn message
        SpawnCommand.execute([floor], DiscordClient);
        sendMessage(
          asteriosBotTextChannels,
          `Someone reported that ${bossName} just spawned.`
        );

        //gather everyone that reported this boss
        const usersReported = [];
        bossData.markedAsSpawned.map((userReported) => {
          const guildMember = findUserReportedFromAllChannels(
            asteriosBotTextChannels,
            userReported
          );

          const nick =
            guildMember?.nickname ?? guildMember?.user.username ?? null;
          if (nick) {
            usersReported.push(nick);
          }
        });

        usersReported.length > 0 &&
          sendMessage(
            asteriosBotTextChannels,
            `Please, thank following people for reporting... ${usersReported.join(
              ' ,'
            )}`
          );
      } else {
        DeathCommand.execute([floor], DiscordClient);

        sendMessage(
          asteriosBotTextChannels,
          `${bossName} just died. Chest command is: \n ${BossData[bossName].chest}`
        );
      }
    }
  );
});

function findUserReportedFromAllChannels(
  channels: Discord.Collection<string, Discord.Channel>,
  username: string
) {
  let searchUser;
  channels.map((channel) => {
    const tChannel = channel as Discord.TextChannel;
    if (tChannel.guild.members.cache.has(username)) {
      searchUser = tChannel.guild.members.cache.get(username);
    }
  });

  return searchUser;
}

function sendMessage(
  channels: Discord.Collection<string, Discord.Channel>,
  message: string
) {
  return channels.map((channel) =>
    (channel as Discord.TextChannel).send(message)
  );
}

function getAvailableCommands() {
  return [ListBossesCommand, ChestCommand, UpCommand, DeathCommand];
}

DiscordClient.on('message', async (message) => {
  if (message.author.bot) return;

  const messageChannel = message.channel as Discord.TextChannel;
  if (COMMANDS_CHANNEL.includes(messageChannel.name) === false) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length).split(' ');
  const args = [...commandBody].slice(1);
  const command = [...commandBody].shift().toLowerCase();

  switch (command) {
    case 'commands': {
      const commands = getAvailableCommands();
      const messageText =
        'Available Commands: \n' +
        commands
          .map((command) => `${command.command}: ${command.description}`)
          .join('\n');

      message.channel.send(messageText);
      break;
    }
    case UpCommand.command: {
      UpCommand.execute(args, DiscordClient, { userId: message.author.id });
      const commandResponse = SpawnCommand.execute(args, DiscordClient);
      commandResponse && sendMessage(asteriosBotTextChannels, commandResponse);
      break;
    }
    case DeathCommand.command: {
      let commandResponse = DeathCommand.execute([...args], DiscordClient);
      commandResponse += '\n' + ChestCommand.execute([...args]);
      commandResponse && sendMessage(asteriosBotTextChannels, commandResponse);
      break;
    }
    case ListBossesCommand.command: {
      const commandResponse = ListBossesCommand.execute();
      commandResponse && message.channel.send(commandResponse);
      break;
    }
    case ChestCommand.command: {
      const commandResponse = ChestCommand.execute(args);
      commandResponse && message.channel.send(commandResponse);
      break;
    }

    default:
      message.channel.send('Unknown command');
      break;
  }
});

export default DiscordClient;
