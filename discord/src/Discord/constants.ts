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

export function findBossNameByFloor(floor: number) {
  const data = Object.entries(BossData).find(
    ([, value]) => value.floor === floor
  );

  return data[0] ?? '';
}

export default BossData;
