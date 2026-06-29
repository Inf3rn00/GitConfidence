import { InventoryItem } from '../types';

export const SHOP_ITEMS: InventoryItem[] = [
  { id: 'speed_potion', name: 'Speed Potion', cost: 25, effect: '+15 DEX', bonus: { dex: 15 } },
  { id: 'theory_book', name: 'Theory Book', cost: 30, effect: '+20 INT', bonus: { int: 20 } },
  { id: 'react_mastery', name: 'React Mastery', cost: 100, effect: '+30 INT, React Badge', bonus: { int: 30 } },
  { id: 'algo_bootcamp', name: 'Algo Bootcamp', cost: 150, effect: '+40 STR, Algo Badge', bonus: { str: 40 } },
];
