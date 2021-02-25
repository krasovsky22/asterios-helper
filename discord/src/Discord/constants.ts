const BossData = {
  "Boss Shilen's Messenger Cabrio": {
    floor: 0,
    chest: '/target Coffer of the Dead',
  },
  'Boss Death Lord Hallate': {
    floor: 3,
    chest: "/target Hallate's chest",
  },
  'Boss Kernon': {
    floor: 8,
    chest: '/target Chest of Kernon',
  },
  'Boss Longhorn Golkonda': {
    floor: 11,
    chest: '/target Chest of Golkonda',
  },
};

export type POSSIBLE_BOSS =
  | "Boss Shilen's Messenger Cabrio"
  | 'Boss Death Lord Hallate'
  | 'Boss Kernon'
  | 'Boss Longhorn Golkonda';

export function findBossNameByFloor(floor: number): POSSIBLE_BOSS {
  const data = Object.entries(BossData).find(
    ([, value]) => value.floor === floor
  );

  return data[0] as POSSIBLE_BOSS;
}

export default BossData;
