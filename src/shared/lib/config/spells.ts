export const summonerSpells = new Map<number, { label: string; labelEn: string; slug: string }>([
  [1, { label: '정화', labelEn: 'Cleanse', slug: '_boost' }],
  [3, { label: '탈진', labelEn: 'Exhaust', slug: '_exhaust' }],
  [4, { label: '점멸', labelEn: 'Flash', slug: '_flash' }],
  [6, { label: '유체화', labelEn: 'Ghost', slug: '_haste' }],
  [7, { label: '회복', labelEn: 'Heal', slug: '_heal' }],
  [11, { label: '강타', labelEn: 'Smite', slug: '_smite' }],
  [12, { label: '순간이동', labelEn: 'Teleport', slug: '_teleport_new' }],
  [13, { label: '총명', labelEn: 'Clarity', slug: 'mana' }],
  [14, { label: '점화', labelEn: 'Ignite', slug: 'ignite' }],
  [21, { label: '방어막', labelEn: 'Barrier', slug: 'barrier' }],
  [32, { label: '표식', labelEn: 'Mark', slug: '_mark' }],
])