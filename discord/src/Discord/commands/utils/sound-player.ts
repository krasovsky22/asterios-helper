import { VoiceConnection } from 'discord.js';

const playSoundPromise = (connection: VoiceConnection, soundUrl: string) => {
  return new Promise<boolean>((resolve) => {
    connection.play(soundUrl).on('finish', () => {
      resolve(true);
    });
  });
};

export async function playSoundQueue(
  connection: VoiceConnection,
  sounds: string[]
) {
  for (let i = 0; i < sounds.length; i++) {
    await playSoundPromise(connection, sounds[i]);
  }
}
