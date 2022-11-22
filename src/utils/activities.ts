import { Activity } from '../types/Activity';

const DEFAULT_ICON = 'https://runescape.wiki/images/thumb/D%26D_icon.png/100px-D%26D_icon.png?4b929';
const ActivityMap = new Map<string, Activity>();

export const dailyActivities:Activity[] = [
  {
    name: 'Guthix Cache',
    type: 'daily',
    checksRequired: 2,
    iconsUrl: ['https://runescape.wiki/images/Divination.png?52d94'],
    utilitiesUrl: [
      { description: 'Wiki', url: 'https://runescape.wiki/w/Guthixian_Cache' },
    ],
  },
  {
    name: 'Daily Challenges',
    type: 'daily',
    checksRequired: 3,
    iconsUrl: ['https://runescape.wiki/images/Daily_Challenge_icon.png?e8494'],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Challenge_System' }],
  },
  {
    name: 'Nemi Forest',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/Goebie_chathead.png?9c3f6'],
    utilitiesUrl: [{ description: 'Map', url: 'https://www.reddit.com/r/NemiForest/' }],
  },
  {
    name: 'Reaper Task',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/Reaper_points.png?32b81'],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Soul_Reaper' }],
  },
  {
    name: 'Player Owned Farm',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/Malcolm_%28player-owned_farm%29.png?66af7'],
    utilitiesUrl: [{ description: 'Wiki Guide', url: 'https://runescape.wiki/w/Player-owned_farm/Quick_guide' }],
  },
  {
    name: 'Broad arrowheads',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/Broad_arrow_5.png?d21c7'],
    utilitiesUrl: [{ description: 'Buy from Canifis & Burthorpe', url: '' }],
  },
  {
    name: 'Vis wax',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/Vis_wax.png?8bbab'],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Rune_Goldberg_Machine' }],
  },
  {
    name: 'Travelling merchant',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Travelling_Merchant%27s_Shop' }],
  },
  {
    name: 'Player Owned Ports',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Player-owned_port' }],
  },
  {
    name: 'Sandstone Mining',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Red_sandstone_detail.png/115px-Red_sandstone_detail.png?774e6'],
    utilitiesUrl: [{ description: 'Location', url: 'https://runescape.wiki/w/Red_sandstone#Location' }],
  },
  {
    name: 'Runes Shop',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/Air_rune.png?8953d'],
    utilitiesUrl: [{ description: 'Recommend Lunar Isle, Pest Control, Mage Arena', url: '' }],
  },
  {
    name: 'Big Chinchompa',
    type: 'daily',
    checksRequired: 2,
    iconsUrl: ['https://runescape.wiki/images/thumb/Nyriki%27s_portal.png/300px-Nyriki%27s_portal.png?589d1'],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Big_Chinchompa' }],
  },
  {
    name: 'Wicked hood',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Wicked_hood_detail.png/100px-Wicked_hood_detail.png?a835c'],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Wicked_hood' }],
  },
  {
    name: 'Menaphos Reputation',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Menaphos_lodestone_icon.png/80px-Menaphos_lodestone_icon.png?af618'],
    utilitiesUrl: [{ description: 'Fc: soulobby', url: '' }],
  },
  {
    name: 'Anacronia Management',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/Anachronia_lodestone_icon.png?1e2f1'],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Anachronia_base_camp' }],
  },
  {
    name: 'Evil Tree',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Evil_tree_%28normal%29.png/300px-Evil_tree_%28normal%29.png?711bc'],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Evil_Tree#Locating' }],
  },
  {
    name: 'Shooting Star',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Stardust_detail.png/100px-Stardust_detail.png?45e78'],
    utilitiesUrl: [{ description: 'Fc: starfind', url: '' }],
  },
  {
    name: 'Bork',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Bork' }],
  },
  {
    name: 'Sinkholes',
    type: 'daily',
    checksRequired: 2,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Wiki W134', url: 'https://runescape.wiki/w/Sinkholes' }],
  },
  {
    name: 'Raw bird meat',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Raw_bird_meat_detail.png/100px-Raw_bird_meat_detail.png?86318'],
    utilitiesUrl: [{ description: 'Location', url: 'https://runescape.wiki/w/Fresh_Meat' }],
  },
  {
    name: 'Yak hide',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Yak-hide_detail.png/100px-Yak-hide_detail.png?13f0a'],
    utilitiesUrl: [{ description: 'Location', url: 'https://runescape.wiki/w/Contraband_Yak_Produce' }],
  },
  {
    name: 'Herb Run',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Clean_torstol_detail.png/100px-Clean_torstol_detail.png?dc0b3'],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Herb_patch' }],
  },
  {
    name: 'Potato Cactus',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Potato_cactus_detail.png/100px-Potato_cactus_detail.png?3f507'],
    utilitiesUrl: [{ description: 'Location', url: 'https://runescape.wiki/w/Weird_Old_Man' }],
  },
  {
    name: 'Buckets of slime',
    type: 'daily',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Bucket_of_slime_detail.png/100px-Bucket_of_slime_detail.png?821bb'],
    utilitiesUrl: [{ description: 'Morytania Legs Teleport', url: '' }],
  },
];

export const weeklyActivities:Activity[] = [
  {
    name: 'Water Filtration System',
    type: 'weekly',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Water_filtration_system.png/300px-Water_filtration_system.png?cf0d6'],
    utilitiesUrl: [{ description: 'Location', url: 'https://runescape.wiki/w/Water_filtration_system' }],
  },
  {
    name: 'Herby Werby',
    type: 'weekly',
    checksRequired: 1,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Location', url: 'https://runescape.wiki/w/Herby_Werby#Gameplay' }],
  },
  {
    name: 'Penguin Hide and Seek',
    type: 'weekly',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Bush_%28Penguin_Hide_and_Seek%29.png/300px-Bush_%28Penguin_Hide_and_Seek%29.png?003f8'],
    utilitiesUrl: [{ description: 'Locations', url: 'http://jq.world60pengs.com/' }],
  },
  {
    name: 'Tears of Guthix',
    type: 'weekly',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/D%26D_token_%28tears_of_guthix%29_detail.png/100px-D%26D_token_%28tears_of_guthix%29_detail.png?62fd0'],
    utilitiesUrl: [{ description: 'Games Necklace Teleport', url: '' }],
  },
  {
    name: 'Circus',
    type: 'weekly',
    checksRequired: 1,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Location', url: 'https://runescape.wiki/w/Balthazar_Beauregard%27s_Big_Top_Bonanza#Location' }],
  },
  {
    name: 'Managing Miscellania',
    type: 'weekly',
    checksRequired: 1,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Wiki', url: 'https://runescape.wiki/w/Managing_Miscellania' }],
  },
  {
    name: 'Agoroth',
    type: 'weekly',
    checksRequired: 2,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Games Necklace Teleport', url: '' }],
  },
  {
    name: 'Familiarisation',
    type: 'weekly',
    checksRequired: 1,
    iconsUrl: ['https://runescape.wiki/images/thumb/Familiarisation_obelisk.png/300px-Familiarisation_obelisk.png?f2e11'],
    utilitiesUrl: [{ description: 'Locations', url: 'https://runescape.wiki/w/Familiarisation#Obelisk_locations' }],
  },
  {
    name: 'Meg',
    type: 'weekly',
    checksRequired: 1,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Questions', url: 'https://runescape.wiki/w/Meg' }],
  },
];

export const monthlyActivities:Activity[] = [
  {
    name: 'Troll Invasion',
    type: 'monthly',
    checksRequired: 1,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Location', url: 'https://runescape.wiki/w/Troll_Invasion#Tips' }],
  },
  {

    name: 'Giant Oyster',
    type: 'monthly',
    checksRequired: 1,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Location', url: 'https://runescape.wiki/w/Wizard_Myrtle' }],
  },
  {
    name: 'God Statues',
    type: 'monthly',
    checksRequired: 5,
    iconsUrl: [DEFAULT_ICON],
    utilitiesUrl: [{ description: 'Locations', url: 'https://runescape.wiki/w/God_Statues#Locations' }],
  },
];

// Fill map
dailyActivities.forEach((act) => ActivityMap.set(act.name, act));
weeklyActivities.forEach((act) => ActivityMap.set(act.name, act));
monthlyActivities.forEach((act) => ActivityMap.set(act.name, act));

export function getActivityById(id:string) {
  return ActivityMap.get(id);
}
