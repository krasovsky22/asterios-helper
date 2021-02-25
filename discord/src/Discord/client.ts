import * as Discord from 'discord.js';

import {
  ChestCommand,
  DeathCommand,
  ListBossesCommand,
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

console.log(VOICE_CHANNEL_TO_JOIN);

const DiscordClient = new Discord.Client();

export type BossDataType = {
  markedAsSpawned?: string[];
  title: string;
  pubDate: string;
};
type ACTION_TYPES = 'NEW_DEATH' | 'NEW_REPORT';

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

  const asteriosBotTextChannels = DiscordClient.channels.cache.filter(
    (channel) => {
      const tChannel = channel as Discord.GuildChannel;
      return COMMANDS_CHANNEL.includes(tChannel.name);
    }
  );

  handleDataUpdate(
    (bossData: BossDataType, bossName: string, action_type: ACTION_TYPES) => {
      const floor = BossData[bossName].floor;
      UpCommand.execute([floor], DiscordClient);

      if (action_type === 'NEW_REPORT') {
        sentMessage(
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
          sentMessage(
            asteriosBotTextChannels,
            `Please, thank following people for reporting... ${usersReported.join(
              ' ,'
            )}`
          );
      } else {
        DeathCommand.execute([floor], DiscordClient);

        sentMessage(
          asteriosBotTextChannels,
          `${bossName} just died. Chest command is:`
        );
        sentMessage(asteriosBotTextChannels, `${BossData[bossName].chest}`);
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

function sentMessage(
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
    case DeathCommand.command: {
      commandResponse = DeathCommand.execute([...args], DiscordClient);
      commandResponse += '\n' + ChestCommand.execute([...args]);
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
