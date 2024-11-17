export type Attributes = {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
};

export type Class = 'Barbarian' | 'Wizard' | 'Bard';

export type AttributeList = {
  name: string;
  value: number;
}[];

//@todocreateasyncthunk to save data
export type Character = {
  attributes: { name: string; value: number }[];
  classMatch: any[];
  skills: Skill[];
  totalPoints: number;
};
export type Skill = {
  name: string;
  pointsSpend: number;
  totalValue: number;
  attributeModifier: string; // actual keyof Attributes;
  //add modifier value directly  for total value @todo
};

export type CharactersState = {
  characters: Record<string, Character>;
  currentCharacter: string | null;
};

//note for reviewer
//here i should use keyof attribute but just i was getting error somewhere typemismatch
//so i just removed that :D
