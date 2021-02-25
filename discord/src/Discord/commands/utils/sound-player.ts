import { Client } from 'discord.js';

const playSoundPromise = (client: Client, soundUrl: string) => {
  return new Promise<boolean>((resolve) => {
    const broadcast = client.voice.createBroadcast();

    broadcast.play(soundUrl);

    client.voice.connections.map((connection) => {
      connection.play(broadcast).on('finish', () => {
        broadcast.end();
        return resolve(true);
      });
    });
  });
};

export async function playSoundQueue(client: Client, sounds: string[]) {
  for (let i = 0; i < sounds.length; i++) {
    await playSoundPromise(client, sounds[i]);
  }
}
